package com.example.BaoEng.service;

import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.repository.TeacherRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Tạo hồ sơ Teacher trong một transaction RIÊNG (REQUIRES_NEW).
 * Xem {@link StudentProfileCreator} — cùng lý do chống race khi nhiều request song song.
 */
@Component
public class TeacherProfileCreator {

    private final TeacherRepository teacherRepository;

    public TeacherProfileCreator(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Teacher create(Long userId) {
        return teacherRepository.save(Teacher.builder()
                .userId(userId)
                .teacherCode("GV-" + userId)
                .teachingExperienceYears(0)
                .build());
    }
}
