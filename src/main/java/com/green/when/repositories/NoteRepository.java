package com.green.when.repositories;


import com.green.when.domain.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<NoteEntity, Long> {
    List<NoteEntity> findByReceptAndInvitation(String recept, boolean b);

    NoteEntity findByReceptAndContentAndInvitation(String recept, String content, boolean b);
}
