package com.green.when.service;

import com.green.when.mapper.InquiryMapper;
import com.green.when.vo.InquiryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {
    @Autowired
    public InquiryMapper mapper;

    // 사이트 관리자 권한 체크
    public String getUserRole(String userId) {
        String userRole = mapper.getUserRole(userId);
        return userRole;
    }

    // 리스트 조회
    public List<InquiryVo> inquiryList(InquiryVo inquiryVo) {
        List<InquiryVo> inquiryList;
        try {
            inquiryList = mapper.inquiryList(inquiryVo);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return inquiryList;
    }
    // 상세보기

    public List<InquiryVo> inquiryRead(InquiryVo inquiryVo) {
        List<InquiryVo> inquiryRead;
        try {
            inquiryRead = mapper.inquiryRead(inquiryVo);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return inquiryRead;
    }

    // 쓰기

    public void inquiryWrite(InquiryVo inquiryVo) {
        try {
            mapper.inquiryWrite(inquiryVo);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    //답글달기
    public void inquiryReply(InquiryVo inquiryVo) {
        try {
            mapper.inquiryReply(inquiryVo);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void inquiryDelete(int no) {
        try {
            mapper.inquiryDelete(no);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void inquiryUpdate(InquiryVo inquiryVo) {
        try{
            mapper.inquiryUpdate(inquiryVo);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
