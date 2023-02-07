package com.green.when.domain;


import com.green.when.dto.dtos.GroupDto;
import com.green.when.dto.dtos.GroupManageDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table (name = "groupmanage_tb")
@NoArgsConstructor
@ToString(exclude = {"groupEntity"})
public class GroupManageEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "no", nullable = false )
    private Long no;

    @Column(name = "userid", nullable = false)
    private String userid;

    @Column(name = "groupname", nullable = false)
    private String groupname;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Column(name = "grade", nullable = false)
    private Long grade;

    @Column(name = "accessiblelevel", nullable = false)
    private Long accessiblelevel;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "groupname", referencedColumnName = "groupname", insertable = false, updatable = false)
    private GroupEntity groupEntity;

    //결국 id로 연결했을떄 나오는 값은 1:1매칭이므로 onetoone임.
    //groupname으로 물론 검색하고 검색결과가 여러가지 나오는건 맞지만 (그래서 onetomany인줄)
    //join key값을 기준으로 생각해야댐
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    private MemberEntity memberEntities;

    public GroupManageEntity(Long no, String userid, String groupname,
                             LocalDateTime time, Long grade, Long accessiblelevel) {
        this.no = no;
        this.userid = userid;
        this.groupname = groupname;
        this.time = time;
        this.grade = grade;
        this.accessiblelevel = accessiblelevel;
    }

    public GroupManageEntity(GroupDto groupDto){
        this.no = null;
        this.userid = groupDto.getGroupleader();
        this.groupname = groupDto.getGroupname();
        this.time = LocalDateTime.now();
        this.grade = Long.valueOf(1);
    }

    public GroupManageEntity(GroupManageDto groupManageDto) {
        this.no = null;
        this.userid = groupManageDto.getUserid();
        this.groupname = groupManageDto.getGroupname();
        this.time = LocalDateTime.now();
        this.grade = groupManageDto.getGrade();
        this.accessiblelevel = groupManageDto.getAccessiblelevel();

    }
}
