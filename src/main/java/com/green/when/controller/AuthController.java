package com.green.when.controller;

import com.green.when.vo.MemberRequestVo;
import com.green.when.vo.TokenVo;
import com.green.when.service.AuthService;
import com.green.when.vo.MailVo;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    //회원가입
    @PostMapping("/signup")
    public void signup(@RequestBody MemberRequestVo requestVo) {
        authService.signup(requestVo);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<TokenVo> login(@RequestBody MemberRequestVo requestVo) {
        return ResponseEntity.ok(authService.login(requestVo));
    }

    // ID 중복체크
    @PostMapping("/userCheck")
    public int userCheck(@RequestBody MemberRequestVo requestVo) {
        int useridCheck = authService.useridCheck(requestVo.getUserid());
        return useridCheck;

    }

    // 이메일 중복체크
    @PostMapping("/emailCheck")
    public int emailCheck(@RequestBody MemberRequestVo requestVo) {
        int useremailCheck = authService.useremailCheck(requestVo.getUseremail());
        return useremailCheck;
    }

    // 닉네임 중복체크
    @PostMapping("/nicknameCheck")
    public int nicknameCheck(@RequestBody MemberRequestVo requestVo) {
        int usernicknameCheck = authService.usernicknameCheck(requestVo.getUsernickname());
        return usernicknameCheck;
    }
    @PostMapping("/findid")
    public String findId(@RequestBody MemberRequestVo requestVo){
        String userid = authService.findId(requestVo.getUseremail());
        return userid;
    }

    // 이메일로 임시비밀번호 보내기
    @PostMapping("/sendEmail")
    public void sendEmail(@RequestBody MemberVo memberVo){
        String userid = memberVo.getUserid();
        MailVo mailVo = authService.createMailAndChangePassword(userid);
        authService.mailSend(mailVo);
    }


}