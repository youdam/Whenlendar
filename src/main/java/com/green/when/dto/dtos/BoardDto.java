package com.green.when.dto.dtos;



import com.green.when.domain.BoardEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class BoardDto {

    private Long no;

    private String title;

    private String userid;

    private String content;

    private Long readcount;

    private String groupname;

    private LocalDateTime time;

    private List<FileDto> files;

    private String tag;

    private boolean allowcomment;

    private Long role;

    private Long commentCount;

    public BoardDto(BoardEntity boardEntity, Long commmentCount) {
        this.no = boardEntity.getNo();
        this.title = boardEntity.getTitle();
        this.userid = boardEntity.getUserid();
        this.content = boardEntity.getContent();
        this.groupname = boardEntity.getGroupname();
        this.readcount = boardEntity.getReadcount();
        this.time = boardEntity.getTime();
        this.files = boardEntity.getFiles().stream().map(FileDto::new).collect(Collectors.toList());
        this.allowcomment = boardEntity.isAllowcomment();
        this.tag = boardEntity.getTag();
        this.role = boardEntity.getRole();
        this.commentCount = commmentCount;
    }
    public BoardDto(BoardEntity boardEntity) {
        this.no = boardEntity.getNo();
        this.title = boardEntity.getTitle();
        this.userid = boardEntity.getUserid();
        this.content = boardEntity.getContent();
        this.groupname = boardEntity.getGroupname();
        this.readcount = boardEntity.getReadcount();
        this.time = boardEntity.getTime();
        this.files = boardEntity.getFiles().stream().map(FileDto::new).collect(Collectors.toList());
        this.allowcomment = boardEntity.isAllowcomment();
        this.tag = boardEntity.getTag();
        this.role = boardEntity.getRole();
    }




}

