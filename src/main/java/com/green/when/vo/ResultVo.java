package com.green.when.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

//컨트롤러에서 데이터 전송 후 결과처리를 위한 vo
@AllArgsConstructor
@Data
public class ResultVo {
    private int code;
    private String message;
}
