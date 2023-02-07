package com.green.when.vo;

import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MemberRequestVo {
    private String userid;
    private String userpw;
    private String usernickname;
    private String useremail;

    public MemberVo toMember(PasswordEncoder passwordEncoder) {
        return MemberVo.builder()
                .userid(userid)
                .userpw(passwordEncoder.encode(userpw))
                .usernickname(usernickname)
                .useremail(useremail)
                .role(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(userid, userpw);
    }
}