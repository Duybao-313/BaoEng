package com.example.BaoEng.service;

import com.example.BaoEng.entity.Student;
import com.example.BaoEng.repository.StudentRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Tạo hồ sơ Student trong một transaction RIÊNG (REQUIRES_NEW).
 *
 * Tách khỏi {@link StudentService} để khi hai request song song cùng tạo hồ sơ,
 * transaction thua cuộc (duplicate key) chỉ rollback nội bộ, không làm hỏng
 * session của request gọi nó — nhờ vậy bên gọi có thể đọc lại bản ghi đã có.
 */
@Component
public class StudentProfileCreator {

    private final StudentRepository studentRepository;

    public StudentProfileCreator(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Student create(Long userId) {
        return studentRepository.save(Student.builder()
                .userId(userId)
                .studentCode("SV-" + userId)
                .build());
    }
}
