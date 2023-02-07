package com.green.when.repositories;


import com.green.when.domain.BoardEntity;
import com.green.when.domain.FileEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity,Long> {

    @Query("SELECT f FROM FileEntity f WHERE f.boardEntity = :boardEntity")
    List<FileEntity> findByBoardEntity(@Param("boardEntity") BoardEntity boardEntity);

}
