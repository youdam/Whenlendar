package com.green.when.service;


import com.green.when.domain.CommentEntity;
import com.green.when.repositories.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;


    @Transactional
    public void create(CommentEntity comment) {
        commentRepository.save(comment);
    }

    @Transactional
    public void update(Long no, String content) {
        CommentEntity findComment = commentRepository.findById(no).orElseThrow(NullPointerException::new);
        findComment.setContent(content);
    }

    public CommentEntity findOne(Long no) {
        return commentRepository.findById(no).orElseThrow(NullPointerException::new);

    }

    @Transactional
    public void delete(CommentEntity comment) {
        commentRepository.delete(comment);
    }

    public List<CommentEntity> findByBoardId(Long no) {
        return commentRepository.findByContentNo(no);
    }

    public List<CommentEntity> findByUserid(String userid) {
        return  commentRepository.findByUseridOrderByTimeDesc(userid);
    }

    public List<CommentEntity> findByContentno(Long no) {
        return commentRepository.findByContentNo(no);
    }
}
