package com.example.BaoEng.security;

import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.enums.Role;
import java.util.List;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Chuyển Jwt -> Authentication có principal là UserPrincipal
 * và authority ROLE_<role> để @PreAuthorize("hasRole('...')") hoạt động.
 */
public class UserJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Long userId = Long.valueOf(jwt.getSubject());
        String email = jwt.getClaimAsString(AppConstants.CLAIM_EMAIL);
        String username = jwt.getClaimAsString(AppConstants.CLAIM_USERNAME);
        String roleStr = jwt.getClaimAsString(AppConstants.CLAIM_ROLE);
        Role role = roleStr != null ? Role.valueOf(roleStr) : Role.STUDENT;

        UserPrincipal principal = new UserPrincipal(userId, email, username, role);
        List<SimpleGrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));

        return new UsernamePasswordAuthenticationToken(principal, jwt.getTokenValue(), authorities);
    }
}
