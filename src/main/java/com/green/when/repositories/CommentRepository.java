package com.green.when.repositories;


import com.green.when.domain.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findByContentNo(Long contentNo);

    List<CommentEntity> findByUseridOrderByTimeDesc(String userid);
}
