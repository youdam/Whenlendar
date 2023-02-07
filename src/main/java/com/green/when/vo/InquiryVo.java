package com.green.when.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class InquiryVo {
    private int no;
    private int grpNo;
    private int depth;
    private String userId;
    private String title;
    private String content;
    private String time;
    private String status;
    private String userRole;
}
