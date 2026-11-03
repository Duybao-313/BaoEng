package com.example.BaoEng.service;

import com.example.BaoEng.entity.Student;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.StudentRepository;
import com.example.BaoEng.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

/**
 * Quản lý hồ sơ học sinh — ánh xạ user_id -> student_id (tự tạo hàng students nếu thiếu).
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final StudentProfileCreator studentProfileCreator;

    public StudentService(
            StudentRepository studentRepository,
            UserRepository userRepository,
            StudentProfileCreator studentProfileCreator) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.studentProfileCreator = studentProfileCreator;
    }

    /**
     * Lấy (hoặc tự tạo) hồ sơ học sinh theo userId.
     *
     * Việc tạo chạy trong transaction riêng; nếu request khác vừa tạo cùng userId
     * (Trang chủ gọi nhiều API song song) thì đọc lại bản ghi đã commit thay vì lỗi 500.
     * Token của tài khoản đã bị xoá => báo USER_NOT_FOUND thay vì lỗi FK.
     */
    public Student getOrCreateStudent(Long userId) {
        return studentRepository.findByUserId(userId).orElseGet(() -> {
            try {
                return studentProfileCreator.create(userId);
            } catch (DataIntegrityViolationException e) {
                return studentRepository.findByUserId(userId).orElseThrow(() -> userRepository.existsById(userId)
                        ? e
                        : new BusinessException(ErrorCode.USER_NOT_FOUND));
            }
        });
    }
}
