package com.example.BaoEng.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Quản lý thư mục lưu file vật lý (học liệu, ảnh đại diện).
 *
 * <p>{@code app.upload-dir} thường là đường dẫn tương đối ({@code uploads}) nên vị trí thật phụ
 * thuộc thư mục làm việc của tiến trình. Để backend chạy được cả khi khởi động từ thư mục gốc
 * repo (IntelliJ mặc định) lẫn từ thư mục module {@code Backend/}, thư mục lưu file được chọn:
 * <ol>
 *   <li>đường dẫn tuyệt đối trong cấu hình;</li>
 *   <li>{@code <working dir>/<upload-dir>} nếu đã tồn tại;</li>
 *   <li>{@code <working dir>/<thư mục con>/<upload-dir>} nếu đã tồn tại (bố cục monorepo);</li>
 *   <li>fallback {@code <working dir>/<upload-dir>} — tự tạo khi ghi file.</li>
 * </ol>
 * Đường dẫn tuyệt đối được chọn sẽ ghi ra log lúc khởi động để dễ kiểm tra.
 */
@Component
public class UploadStorage {

    private static final Logger log = LoggerFactory.getLogger(UploadStorage.class);

    private final Path root;

    public UploadStorage(@Value("${app.upload-dir:uploads}") String configuredDir) {
        this.root = resolveRoot(configuredDir);
        log.info("Thư mục lưu file: {}", root);
    }

    /** Thư mục gốc (đường dẫn tuyệt đối). */
    public Path root() {
        return root;
    }

    /** Đường dẫn file trong thư mục con, đã chuẩn hoá và chặn thoát khỏi thư mục gốc. */
    public Path path(String folder, String filename) {
        Path folderPath = root.resolve(folder).normalize();
        Path file = folderPath.resolve(filename).normalize();
        if (!file.startsWith(folderPath)) {
            throw new IllegalArgumentException("Invalid file name: " + filename);
        }
        return file;
    }

    /** Ghi file vào thư mục con, tự tạo thư mục nếu chưa có. */
    public Path save(String folder, String filename, java.io.InputStream content) throws IOException {
        Path target = path(folder, filename);
        Files.createDirectories(target.getParent());
        Files.copy(content, target, StandardCopyOption.REPLACE_EXISTING);
        return target;
    }

    /** Xoá file nếu tồn tại; bỏ qua lỗi I/O. */
    public void deleteQuietly(String folder, String filename) {
        try {
            Files.deleteIfExists(path(folder, filename));
        } catch (IOException ignored) {
            // Không chặn nghiệp vụ khi xoá file vật lý thất bại.
        }
    }

    private static Path resolveRoot(String configuredDir) {
        Path configured = Path.of(configuredDir);
        if (configured.isAbsolute()) {
            return configured.normalize();
        }

        Path workingDir = Path.of(System.getProperty("user.dir")).toAbsolutePath().normalize();
        Path direct = workingDir.resolve(configured).normalize();
        if (Files.isDirectory(direct)) {
            return direct;
        }

        Path nested = findNested(workingDir, configured);
        return nested != null ? nested : direct;
    }

    /** Tìm {@code <working dir>/<con>/<configured>} đã tồn tại (ví dụ {@code Backend/uploads}). */
    private static Path findNested(Path workingDir, Path configured) {
        List<Path> children = new ArrayList<>();
        try (Stream<Path> entries = Files.list(workingDir)) {
            entries.filter(Files::isDirectory).sorted(Comparator.comparing(Path::toString)).forEach(children::add);
        } catch (IOException e) {
            return null;
        }
        for (Path child : children) {
            Path candidate = child.resolve(configured).normalize();
            if (Files.isDirectory(candidate)) {
                return candidate;
            }
        }
        return null;
    }
}
