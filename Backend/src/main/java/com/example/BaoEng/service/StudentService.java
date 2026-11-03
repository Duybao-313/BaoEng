package com.example.BaoEng.service;

import com.example.BaoEng.entity.Student;
import com.example.BaoEng.repository.StudentRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý hồ sơ học sinh — ánh xạ user_id -> student_id (tự tạo hàng students nếu thiếu).
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Lấy (hoặc tự tạo) hồ sơ học sinh theo userId.
     * Dùng REQUIRES_NEW để việc tạo hồ sơ không bị ảnh hưởng bởi transaction gọi nó,
     * đồng thời chống race khi hai request enroll đầu tiên chạy song song.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Student getOrCreateStudent(Long userId) {
        return studentRepository.findByUserId(userId).orElseGet(() -> {
            try {
                Student student = Student.builder()
                        .userId(userId)
                        .studentCode("SV-" + userId)
                        .build();
                return studentRepository.save(student);
            } catch (DataIntegrityViolationException e) {
                // Race: luồng khác vừa tạo student — đọc lại bản ghi đã commit.
                return studentRepository.findByUserId(userId).orElseThrow(() -> e);
            }
        });
    }
}
