package com.green.when.dto.dtos;



import com.green.when.domain.MemberEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
//create랑 update기능 안쓸거니까 걍 안쓸거는 뺌
@Data
@NoArgsConstructor
public class MemberDto {

    private String userid;

    private String usernickname;

    public MemberDto(MemberEntity memberEntity){
        this.userid = memberEntity.getUserid();
        this.usernickname = memberEntity.getUsernickname();
    }
}
