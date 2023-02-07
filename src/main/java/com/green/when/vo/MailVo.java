package com.green.when.vo;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class MailVo {
    private String address;
    private String title;
    private String message;
}