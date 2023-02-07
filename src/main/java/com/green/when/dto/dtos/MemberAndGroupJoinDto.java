package com.green.when.dto.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MemberAndGroupJoinDto {

    private String userid;
    private String usernickname;
    private Long grade;
    private String groupname;
    private LocalDateTime time;


}
