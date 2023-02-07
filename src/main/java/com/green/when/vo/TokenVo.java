package com.green.when.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenVo {
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn;
}