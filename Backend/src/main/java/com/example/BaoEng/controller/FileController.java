package com.example.BaoEng.controller;

import com.example.BaoEng.common.AppConstants;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Phục vụ file học liệu đã upload.
 *
 * <p>Endpoint này nằm trong danh sách public của {@code SecurityConfig} vì trình duyệt
 * ({@code <video>}) và app mobile không gửi được header {@code Authorization} khi phát
 * trực tiếp file. Tên file là UUID nên không thể đoán được.
 */
@RestController
@RequestMapping(AppConstants.API_BASE + "/files")
public class FileController {

    private final String uploadDir;

    public FileController(@Value("${app.upload-dir:uploads}") String uploadDir) {
        this.uploadDir = uploadDir;
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> serve(@PathVariable String filename) {
        if (!filename.matches("[a-zA-Z0-9._-]+")) {
            return ResponseEntity.badRequest().build();
        }
        Path path = Path.of(uploadDir, "materials", filename).normalize();
        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = new FileSystemResource(path);
        MediaType mediaType = MediaTypeFactory.getMediaType(resource)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=86400")
                .body(resource);
    }
}
