package com.example.BaoEng.config;

import com.example.BaoEng.common.ApiError;
import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.security.UserJwtAuthenticationConverter;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import tools.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.util.StringUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Bean
    public SecretKey jwtSecretKey() {
        return new SecretKeySpec(jwtSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    @Bean
    public JwtDecoder jwtDecoder(SecretKey key) {
        return NimbusJwtDecoder.withSecretKey(key).macAlgorithm(MacAlgorithm.HS256).build();
    }

    @Bean
    public JwtEncoder jwtEncoder(SecretKey key) {
        return new NimbusJwtEncoder(new ImmutableSecret<>(key));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public UserJwtAuthenticationConverter userJwtAuthenticationConverter() {
        return new UserJwtAuthenticationConverter();
    }

    /**
     * Cấu hình CORS cho các client chạy trên trình duyệt (Vite/React, Expo Web).
     *
     * <p>Origin đọc từ {@code app.cors.*} trong {@code application.yaml} — ghi đè khi deploy
     * bằng biến môi trường {@code CORS_ALLOWED_ORIGINS} / {@code CORS_ALLOWED_ORIGIN_PATTERNS}
     * (nhiều giá trị cách nhau bằng dấu phẩy).
     *
     * <p>{@code allowCredentials(true)} là BẮT BUỘC vì Refresh Token nằm trong HttpOnly cookie
     * {@code refresh_token} — trình duyệt chỉ gửi cookie khi server trả về header
     * {@code Access-Control-Allow-Credentials: true}.
     *
     * <p>Lưu ý: app mobile (Expo Go / native) KHÔNG dùng CORS — chỉ client web mới cần.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            @Value("${app.cors.allowed-origins:}") List<String> allowedOrigins,
            @Value("${app.cors.allowed-origin-patterns:}") List<String> allowedOriginPatterns,
            @Value("${app.cors.max-age-seconds:3600}") long maxAgeSeconds) {

        CorsConfiguration config = new CorsConfiguration();

        // Origin cụ thể — nên dùng ở production.
        List<String> origins = cleanCorsValues(allowedOrigins);
        if (!origins.isEmpty()) {
            config.setAllowedOrigins(origins);
        }

        // Pattern hỗ trợ wildcard CỔNG dạng "[*]", ví dụ "http://localhost:[*]" — dùng cho dev.
        List<String> patterns = cleanCorsValues(allowedOriginPatterns);
        if (!patterns.isEmpty()) {
            config.setAllowedOriginPatterns(patterns);
        }

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of(
                "Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With", "Range"));
        // Cho phép client web đọc metadata của file học liệu (video/PDF phát trực tiếp).
        config.setExposedHeaders(List.of(
                "Content-Disposition", "Content-Length", "Content-Range", "Accept-Ranges"));
        config.setAllowCredentials(true);
        config.setMaxAge(maxAgeSeconds); // cache kết quả preflight (giây)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /** Loại bỏ phần tử rỗng/khoảng trắng khi danh sách được bind từ biến môi trường. */
    private static List<String> cleanCorsValues(List<String> values) {
        return values.stream()
                .filter(StringUtils::hasText)
                .map(String::trim)
                .toList();
    }

    /**
     * Chuỗi lọc cho các endpoint công khai — KHÔNG cấu hình Resource Server,
     * vì vậy header Authorization cũ/hết hạn sẽ KHÔNG gây 401 ở các endpoint này.
     *
     * <p>{@code /api/v1/files/**} cũng nằm ở đây vì trình duyệt/app không gửi được
     * header Authorization khi phát video ({@code <video src>}) hoặc mở PDF/Word.
     */
    @Bean
    @Order(1)
    public SecurityFilterChain publicAuthFilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher(
                AppConstants.AUTH_BASE + "/register",
                AppConstants.AUTH_BASE + "/login",
                AppConstants.AUTH_BASE + "/refresh",
                AppConstants.AUTH_BASE + "/forgot-password",
                AppConstants.AUTH_BASE + "/reset-password",
                AppConstants.AUTH_BASE + "/verify-email",
                AppConstants.API_BASE + "/files/**"
            )
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            UserJwtAuthenticationConverter converter,
            ObjectMapper objectMapper) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2
                .authenticationEntryPoint((request, response, authException) ->
                    writeJsonError(response, objectMapper, ErrorCode.UNAUTHORIZED))
                .jwt(jwt -> jwt.jwtAuthenticationConverter(converter)))
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) ->
                    writeJsonError(response, objectMapper, ErrorCode.UNAUTHORIZED))
                .accessDeniedHandler((request, response, accessDeniedException) ->
                    writeJsonError(response, objectMapper, ErrorCode.FORBIDDEN)));
        return http.build();
    }

    private void writeJsonError(HttpServletResponse response, ObjectMapper mapper, ErrorCode code)
            throws IOException {
        response.setStatus(code.getStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiError error = ApiError.of(code.name(), code.getDefaultMessage());
        mapper.writeValue(response.getOutputStream(), ApiResponse.error(error));
    }
}
