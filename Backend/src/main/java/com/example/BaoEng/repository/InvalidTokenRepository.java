package com.example.BaoEng.repository;

import com.example.BaoEng.entity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidTokenRepository extends JpaRepository<InvalidToken, Long> {

    boolean existsByJti(String jti);
}
