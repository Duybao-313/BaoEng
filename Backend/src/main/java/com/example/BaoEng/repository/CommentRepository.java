package com.example.BaoEng.repository;

import com.example.BaoEng.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByParentCommentIdIsNullOrderByCreatedAtDesc();

    List<Comment> findByParentCommentIdOrderByCreatedAtAsc(Long parentId);
}
