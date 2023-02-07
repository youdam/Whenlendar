package com.green.when.service;


import com.green.when.domain.BoardEntity;
import com.green.when.domain.FileEntity;
import com.green.when.repositories.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    @Transactional
    public void create(FileEntity file) {
        fileRepository.save(file);
    }

    @Transactional
    public void createFile(FileEntity file) {
        fileRepository.save(file);
    }


    public List<FileEntity> findByBoardEntity(BoardEntity boardEntity) {
        return fileRepository.findByBoardEntity(boardEntity);
    }
}
