package com.green.when.repositories;


import com.green.when.domain.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {


    List<BoardEntity> findByTitleContainingOrContentContainingAndGroupname(String title, String content, String Groupname);


    List<BoardEntity> findBoardsBygroupnameOrderByTimeDesc(String groupname);

    List<BoardEntity> findByUseridOrderByTimeDesc(String userid);

    List<BoardEntity> findByRole(Long role);

    // void deleteAllByNo(List<BoardDeleteDto> boardDeleteDtoList);


}


/*
Containg = &LIKE&
OR =  OR

 */