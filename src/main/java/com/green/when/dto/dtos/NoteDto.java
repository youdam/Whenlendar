package com.green.when.dto.dtos;


import com.green.when.domain.NoteEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NoteDto {

    private Long no;

    private String send;

    private String recept;

    private String title;

    private String content;

    private LocalDateTime time;

    private Long readcheck;

    private Long deleted;

    private boolean invitation;

    public NoteDto(NoteEntity noteEntity){
        this.no = noteEntity.getNo();
        this.send = noteEntity.getSend();
        this.recept = noteEntity.getRecept();
        this.title = noteEntity.getTitle();
        this.content = noteEntity.getContent();
        this.time = noteEntity.getTime();
        this.readcheck = noteEntity.getReadcheck();
        this.deleted = noteEntity.getDeleted();
        this.invitation = noteEntity.isInvitation();
    }

}
