package com.green.when.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "member_tb")
@NoArgsConstructor
@ToString
public class MemberEntity {
    @Id
    @Column(name = "userid", nullable = false)
    private String userid;

    @Column(name = "usernickname", nullable = false)
    private String usernickname;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;





    public MemberEntity(String userid) {

        this.userid = userid;
    }



}
