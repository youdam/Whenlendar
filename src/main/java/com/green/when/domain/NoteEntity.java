package com.green.when.domain;


import com.green.when.dto.dtos.NoteDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@ToString
@NoArgsConstructor
@Table (name = "note_tb")
public class NoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "no", nullable = false )
    private Long no;

    @Column( name = "send", nullable = false )
    private String send;

    @Column( name = "recept", nullable = false )
    private String recept;

    @Column( name = "title", nullable = false )
    private String title;

    @Column( name = "content", nullable = false )
    private String content;

    @Column( name = "time" )
    private LocalDateTime time;

    @Column( name = "readcheck", nullable = false )
    private Long readcheck;

    @Column( name = "deleted", nullable = false )
    private Long deleted;

    @Column( name = "invitation")
    private boolean invitation;



    public NoteEntity(NoteDto noteDto){
        this.no = noteDto.getNo();
        this.send = noteDto.getSend();
        this.recept = noteDto.getRecept();
        this.title = noteDto.getTitle();
        this.content = noteDto.getContent();
        this.time = LocalDateTime.now();
        this.readcheck = noteDto.getReadcheck();
        this.deleted = noteDto.getDeleted();
        this.invitation = noteDto.isInvitation();
    }





}
