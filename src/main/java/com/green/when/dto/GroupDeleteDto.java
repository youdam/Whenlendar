package com.green.when.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupDeleteDto {

    private String groupname;

    public GroupDeleteDto(String groupname) {
        this.groupname = groupname;
    }

}
