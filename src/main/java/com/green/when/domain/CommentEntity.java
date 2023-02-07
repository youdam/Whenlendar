package com.green.when.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "comment_tb")
@Data
@NoArgsConstructor
@ToString(exclude = {"boardEntity"})
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "no", nullable = false)
    private Long no;

    @Column(name = "userid", nullable = false)
    private String userid;

    @Column(name = "content_no", nullable = false)
    private Long contentNo;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_no", referencedColumnName = "no", insertable = false, updatable = false)
    private BoardEntity boardEntity;

    public CommentEntity(Long no, String userid, Long contentNo,
                         String content, LocalDateTime time){
        this.no = no;
        this.userid = userid;
        this.contentNo = contentNo;
        this.content = content;
        this.time = time;
    }

}
