package com.green.when.dto.dtos;


import com.green.when.domain.FileEntity;

/*
해당 오류 발생으로 인해 filedto 는 @data, @빈생성자를 사용하지 않음.
lombok에서 annotaion을 사용하는 것 보다 더 확실한 방법이라고 함.
WARN 18680 --- [nio-8080-exec-1] .w.s.m.s.DefaultHandlerExceptionResolver :
 Resolved [org.springframework.http.converter.HttpMessageNotReadableException:
JSON parse error: Cannot construct instance of `com.example.gallery.dtos.FileDto`
 (although at least one Creator exists): no String-argument constructor/factory method to deserialize from String value
 */
public class FileDto {

    private Long no;
    private String filedata;
    private Long contentNo;

    public FileDto() {}

    public FileDto(String filedata) {

        this.filedata = filedata;
    }

    public FileDto(FileEntity fileEntity) {
        this.no = fileEntity.getNo();
        this.filedata = fileEntity.getFiledata();
        this.contentNo = fileEntity.getContentNo();
    }

    public Long getNo() {
        return no;
    }

    public void setNo(Long no) {
        this.no = no;
    }

    public String getFiledata() {
        return filedata;
    }

    public void setFiledata(String filedata) {
        this.filedata = filedata;
    }

    public Long getContentNo() {
        return contentNo;
    }

    public void setContentNo(Long contentNo) {
        this.contentNo = contentNo;
    }
}
