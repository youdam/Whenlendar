package com.green.when.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

// 데이터 없을 때 JSON 만들지 않는설정
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NoteVo {

    private int no;                  //index
    private String send;             //발신자
    private String recept;           //수신자
    private String time;             //시간
    private String title;            //제목
    private String content;          //내용
    private int readCheck;           //수신확인
    private String readCheckString;  //수신확인(문자변환)
    private int[] nos; // 다중선택에 쓰는 리스트
}
