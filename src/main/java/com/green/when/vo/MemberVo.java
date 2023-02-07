package com.green.when.vo;

import lombok.*;

@Builder
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor @ToString
public class MemberVo {
    private String userid;
    private String usernickname;
    private String userpw;
    private String useremail;
    private byte[] profileData;
    private Authority role;
    private String time;
    private String filename;
    private String filepath;

    public void setNickname(String usernickname) {
        this.usernickname = usernickname;
    }

    public void setPassword(String userpw) { this.userpw = userpw; }

}
