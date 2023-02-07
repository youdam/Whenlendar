
package com.green.when.dto.dtos;


import com.green.when.domain.TagEntity;

public class TagDto {

    private Long no;

    private String groupnametag;

    private String tag;


    public TagDto() {}

    public TagDto(String tag){
        this.tag = tag;
    }

    public TagDto(TagEntity tagEntity){
        this.no = tagEntity.getNo();
        this.tag = tagEntity.getTag();
        this.groupnametag = tagEntity.getGroupnametag();

    }

    public Long getNo() {
        return no;
    }

    public void setNo(Long no) {
        this.no = no;
    }
    public String getGroupnametag() {
        return groupnametag;
    }

    public void setGroupname(String groupnametag) {
        this.groupnametag = groupnametag;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }



}

