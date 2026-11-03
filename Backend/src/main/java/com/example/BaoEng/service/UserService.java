package com.example.BaoEng.service;

import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.ChangePasswordRequest;
import com.example.BaoEng.dto.UpdateProfileRequest;
import com.example.BaoEng.dto.UserResponse;
import com.example.BaoEng.entity.User;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.UserRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {

    private static final long MAX_AVATAR_BYTES = 5L * 1024 * 1024;
    private static final String AVATAR_FOLDER = "avatars";
    private static final Map<String, String> AVATAR_EXTENSIONS = Map.of(
            "image/png", ".png",
            "image/jpeg", ".jpg",
            "image/webp", ".webp",
            "image/gif", ".gif");

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UploadStorage uploadStorage;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UploadStorage uploadStorage) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.uploadStorage = uploadStorage;
    }

    public UserResponse getMe(UserPrincipal principal) {
        return UserResponse.from(findUser(principal.getUserId()));
    }

    @Transactional
    public UserResponse updateProfile(UserPrincipal principal, UpdateProfileRequest request) {
        User user = findUser(principal.getUserId());
        if (request.fullName() != null && !request.fullName().isBlank()) {
            user.setFullName(request.fullName());
        }
        if (request.avatarUrl() != null) {
            user.setAvatarUrl(request.avatarUrl());
        }
        userRepository.save(user);
        return UserResponse.from(user);
    }

    @Transactional
    public void changePassword(UserPrincipal principal, ChangePasswordRequest request) {
        User user = findUser(principal.getUserId());
        if (!passwordEncoder.matches(request.oldPassword(), user.getPasswordHash())) {
            throw new BusinessException(ErrorCode.OLD_PASSWORD_INCORRECT);
        }
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    /**
     * Cập nhật ảnh đại diện: lưu file vào {@code uploads/avatars} và gán URL công khai
     * {@code /api/v1/files/avatars/<tên file>} cho người dùng.
     */
    @Transactional
    public UserResponse updateAvatar(UserPrincipal principal, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Vui lòng chọn ảnh đại diện.");
        }
        if (file.getSize() > MAX_AVATAR_BYTES) {
            throw new BusinessException(ErrorCode.FILE_TOO_LARGE, "Ảnh đại diện tối đa 5MB.");
        }
        String extension = AVATAR_EXTENSIONS.get(file.getContentType());
        if (extension == null) {
            throw new BusinessException(ErrorCode.INVALID_FILE_TYPE,
                    "Ảnh đại diện phải là PNG, JPG, WEBP hoặc GIF.");
        }

        String storedName = UUID.randomUUID() + extension;
        try (var content = file.getInputStream()) {
            uploadStorage.save(AVATAR_FOLDER, storedName, content);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_ERROR, "Không thể lưu ảnh đại diện.");
        }

        User user = findUser(principal.getUserId());
        deleteStoredAvatar(user.getAvatarUrl());
        user.setAvatarUrl(AppConstants.API_BASE + "/files/" + AVATAR_FOLDER + "/" + storedName);
        userRepository.save(user);
        return UserResponse.from(user);
    }

    private void deleteStoredAvatar(String avatarUrl) {
        String prefix = AppConstants.API_BASE + "/files/" + AVATAR_FOLDER + "/";
        if (avatarUrl == null || !avatarUrl.startsWith(prefix)) {
            return;
        }
        uploadStorage.deleteQuietly(AVATAR_FOLDER, avatarUrl.substring(avatarUrl.lastIndexOf('/') + 1));
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }
}
