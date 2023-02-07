package com.green.when.service;

import com.green.when.config.SecurityUtil;
import com.green.when.mapper.UserMapper;
import com.green.when.vo.MailVo;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {
    private final UserMapper userMapper;

    public List<MemberResponseVo> userList() {
        List<MemberResponseVo> userList = userMapper.userList();
        return  userList;
    }

    @Transactional
    public void userDelete(MemberVo memberVo) {
        userMapper.deleteUserInsert(memberVo);
        userMapper.foreignKeyChecks();
        userMapper.userDelete(memberVo);
        userMapper.foreignKeyCheck();
    }

    @Transactional
    public void roleChange(MemberVo memberVo) {
        userMapper.roleChange(memberVo);
    }

}