package com.green.when.dto.dtos;


import com.green.when.domain.GroupManageEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GroupManageDto {

    private Long no;

    private String userid;

    private String groupname;

    private LocalDateTime time;

    private Long grade;

    private String deny;

    private Long accessiblelevel;

    public GroupManageDto (GroupManageEntity groupManageEntity){
        this.no = groupManageEntity.getNo();
        this.userid = groupManageEntity.getUserid();
        this.groupname = groupManageEntity.getGroupname();
        this.time = groupManageEntity.getTime();
        this.grade = groupManageEntity.getGrade();
        this.accessiblelevel = groupManageEntity.getAccessiblelevel();
    }


}
