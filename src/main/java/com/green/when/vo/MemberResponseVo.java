package com.green.when.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseVo {
    private String userid;
    private String usernickname;
    private String useremail;
    private Authority role;
    private String time;

    public static MemberResponseVo of(MemberVo memberVo) {
        return MemberResponseVo.builder()
                .userid(memberVo.getUserid())
                .usernickname(memberVo.getUsernickname())
                .useremail(memberVo.getUseremail())
                .role(memberVo.getRole())
                .time(memberVo.getTime())
                .build();
    }
}