package com.green.when.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardDeleteDto {
    private Long no;

    public BoardDeleteDto(Number no){
        this.no = no.longValue();
    }
}
