package com.green.when.vo;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class ScheduleVo {
    private int    no;
    private String userid;
    private String targetdate;
    private String memo;
    private String color;
    private String groupname;
    private int    region;

}