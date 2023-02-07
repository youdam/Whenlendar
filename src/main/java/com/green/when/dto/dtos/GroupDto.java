package com.green.when.dto.dtos;


import com.green.when.domain.GroupEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class GroupDto {

    private String groupname;

    private String groupleader;

    private String descript;

    private List<TagDto> tags;

    private String time;

    public GroupDto(GroupEntity groupEntity){
        this.groupname = groupEntity.getGroupname();
        this.groupleader = groupEntity.getGroupleader();
        this.descript = groupEntity.getDescript();
        this.tags = groupEntity.getTags().stream().map(TagDto::new).collect(Collectors.toList());
        this.time = groupEntity.getTime();
    }
}
