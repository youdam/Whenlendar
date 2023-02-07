package com.green.when.domain;


import com.green.when.dto.dtos.GroupDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table( name = "group_tb")
@ToString(exclude = {"board", "groupmanage", "tags" })
@NoArgsConstructor
public class GroupEntity {


    @Id
    @Column (name = "groupname", nullable = false)
    private String groupname;

    @Column(name = "groupleader", nullable = false)
    private String groupleader;

    @Column(name = "descript", nullable = false)
    private String descript;

    @Column(name = "time", nullable = false)
    private String time;

    @OneToMany(mappedBy = "groupEntity", cascade = CascadeType.ALL)
    private List<BoardEntity> board;

    @OneToMany(mappedBy = "groupEntity", cascade = CascadeType.ALL)
    private List<GroupManageEntity> groupmanage;


    @OneToMany(mappedBy = "groupEntity", cascade = CascadeType.ALL)
    private List<TagEntity> tags;

    @OneToMany(mappedBy = "groupEntity", cascade = CascadeType.ALL)
    private List<MemoEntity> memos;



    public GroupEntity(String groupleader, String groupname, String descript,  String time){
        this.groupname = groupname;
        this.groupleader = groupleader;
        this.descript = descript;
        this.time = time;
    }

    public GroupEntity(GroupDto groupDto){
        this.groupname = groupDto.getGroupname();
        this.groupleader = groupDto.getGroupleader();
        this.descript = groupDto.getDescript();
        this.time = groupDto.getTime();
    }



}
