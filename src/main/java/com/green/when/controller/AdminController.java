package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.AdminService;
import com.green.when.service.MemberService;
import com.green.when.vo.ChangePasswordRequestVo;
import com.green.when.vo.MemberRequestVo;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Console;
import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/userList")
    public List<MemberResponseVo> getMyMemberInfo() {
        List<MemberResponseVo> userList = adminService.userList();
        //System.out.println(userList);
        return userList;
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/userDelete")
    public void userDelete(@RequestBody MemberVo memberVo) {
        //System.out.println(memberVo.toString());
        adminService.userDelete(memberVo);
    }

    @PostMapping("/roleChange")
    public void roleChange(@RequestBody MemberVo memberVo) {
        System.out.println(memberVo);
        String userid = SecurityUtil.getCurrentMemberId();
        String inputId = memberVo.getUserid();
        if (userid.equals(inputId)){
            System.out.println("오류: 같은아이디 입니다.");
        } else {
            adminService.roleChange(memberVo);
        }

    }

}