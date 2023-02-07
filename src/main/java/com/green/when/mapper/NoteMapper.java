package com.green.when.mapper;

import com.green.when.vo.NoteVo;
import com.green.when.vo.PageVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper

public interface NoteMapper {
    //리스트 조회
    List<NoteVo> getNoteList(String userId);
    //페이징 리스트 조회
    List<NoteVo> noteListPage(PageVo page);
    //쓰기
    void noteWrite(NoteVo noteVo);
    //읽기
    NoteVo noteRead(int no);
    //수신확인
    void noteReadCheck(int no);
    //삭제
    void noteDelete(int no);
    //보낸쪽지함
    List<NoteVo> noteSentList(PageVo page);
    //페이징을 위한 카운트
    int noteCount(PageVo page);
    int noteSentCount(PageVo page);

}
