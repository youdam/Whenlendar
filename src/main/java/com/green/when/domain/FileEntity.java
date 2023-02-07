package com.green.when.domain;


import com.green.when.dto.dtos.FileDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "file_tb")
@Data
@NoArgsConstructor
@ToString(exclude = {"boardEntity"})
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "no", nullable = false)
    private Long no;

    @Column(name = "filedata", nullable = false)
    private String filedata;

    @Column(name = "content_no", nullable = false)
    private Long contentNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "content_no", referencedColumnName = "no", insertable = false, updatable = false)
    private BoardEntity boardEntity;


    public FileEntity(Long no,
                      String filedata, Long contentNo){
        this.no =no;
        this.filedata = filedata;
        this.contentNo =contentNo;
    }

    public FileEntity(FileDto fileDto) {
        this.no = fileDto.getNo();
        this.filedata = fileDto.getFiledata();
        this.contentNo = fileDto.getContentNo();
    }
}