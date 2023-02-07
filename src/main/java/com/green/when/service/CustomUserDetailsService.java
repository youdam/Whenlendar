package com.green.when.service;

import com.green.when.mapper.UserMapper;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userMapper.findByUserid(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다"));
    }

    private UserDetails createUserDetails(MemberVo memberVo) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(memberVo.getRole().toString());

        return new User(
                String.valueOf(memberVo.getUserid()),  //(memberVo.getId())
                memberVo.getUserpw(),
                Collections.singleton(grantedAuthority)
        );
    }
}
