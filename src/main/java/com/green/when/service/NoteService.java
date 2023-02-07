package com.green.when.service;


import com.green.when.domain.NoteEntity;
import com.green.when.mapper.NoteMapper;
import com.green.when.repositories.NoteRepository;
import com.green.when.vo.NoteVo;
import com.green.when.vo.PageVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoteService {

    @Autowired
    public NoteMapper mapper;

    private final NoteRepository noteRepository;

    public NoteEntity findOne(String recept,String content, boolean b) {
        return noteRepository.findByReceptAndContentAndInvitation(recept, content, true);

    }


    public  List<NoteEntity> findThem(String recept, boolean b){

        return noteRepository.findByReceptAndInvitation(recept, true);
    }

    @Transactional
    public void save(NoteEntity note) {
        noteRepository.save(note);
    }

    @Transactional
    public void delete(NoteEntity note) {
        noteRepository.delete(note);
    }

    //리스트 조회
    @Transactional
    public List<NoteVo> getNoteList(String userId) {
        List<NoteVo> noteList;
        try{
            noteList = mapper.getNoteList(userId);
        } catch(Exception e){
            e.printStackTrace();
            throw e;
        }
        return noteList;
    }
    //페이징을 위한 카운트
    @Transactional
    public int noteCount(PageVo page){
        try{
            return mapper.noteCount(page) ;
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    @Transactional
    public int noteSentCount(PageVo page){
        try{
            return mapper.noteSentCount(page) ;
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    //리스트 조회 페이징
    @Transactional
    public List<NoteVo> noteListPage(PageVo page) {

        List<NoteVo> noteList;
        try{
            noteList = mapper.noteListPage(page);
        } catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
        return noteList;
    }
    //보낸 쪽지함
    @Transactional
    public List<NoteVo> noteSentList(PageVo page) {

        List<NoteVo> noteList;
        try{
            noteList = mapper.noteSentList(page);
        } catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
        return noteList;
    }
    //쓰기
    @Transactional
    public void noteWrite(NoteVo noteVo) {
        try {
            mapper.noteWrite(noteVo);
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    //읽기
    @Transactional
    public NoteVo noteRead(int no) {
        NoteVo noteVo;
        try {
            noteVo = mapper.noteRead(no);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return noteVo;
    }

    //수신확인
    @Transactional
    public void noteReadCheck(int no){
        try {
            mapper.noteReadCheck(no);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    //삭제
    @Transactional
    public void noteDelete(int no){
        try {
            mapper.noteDelete(no);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }



    public NoteEntity ForUpdate(NoteEntity note) {
        return noteRepository.findByReceptAndContentAndInvitation(note.getRecept(), note.getContent(), true);
    }
}