package com.green.when.controller;
import com.green.when.config.SecurityUtil;
import com.green.when.service.NoteService;
import com.green.when.vo.NoteVo;
import com.green.when.vo.PageVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class NoteController {
    @Autowired
    NoteService noteService;
//  쪽지 리스트 출력
    @GetMapping("/note")
    public ResponseEntity<Map> noteList(@RequestParam(value="num", required=false) Integer num,
                                        @RequestParam(value="option", required=false) String option,
                                        @RequestParam(value= "search", required=false) String search){
//        if(num==null) {num=1;}
        //페이징 계산
        PageVo page = new PageVo();
        page.setNum(num);
        page.setOption(option);
        page.setSearch(search);
        page.setUserId(SecurityUtil.getCurrentMemberId());
        page.setCount(noteService.noteCount(page));

        //쪽지 목록 가져오기
        List<NoteVo>noteList = noteService.noteListPage(page);
        //map에 전달
        Map result = new HashMap<>();
        result.put("pagingData", page);
        result.put("noteList", noteList);

        System.out.println(result);

        return ResponseEntity.ok(result);

    }
//보낸 쪽지함
    @GetMapping("/noteSentList")
    public ResponseEntity<Map> noteSentList(@RequestParam(value="num", required=false) Integer num,
                                            @RequestParam(value="option", required=false) String option,
                                            @RequestParam(value="search", required=false) String search){

        //페이징 계산
        PageVo page = new PageVo();
        page.setNum(num);
        page.setOption(option);
        page.setSearch(search);
        page.setUserId(SecurityUtil.getCurrentMemberId());
        page.setCount(noteService.noteSentCount(page));

        //쪽지 목록 가져오기
        List<NoteVo>noteList = noteService.noteSentList(page);

        //map에 전달
        Map result = new HashMap<>();

        result.put("pagingData", page);
        result.put("noteList", noteList);

        System.out.println(result);

        return ResponseEntity.ok(result);
    }
// 쪽지 쓰기
    @PostMapping("/noteWrite")
    public ResponseEntity noteWrite(@RequestBody NoteVo noteVo) {
        System.out.println("writingVo"+ noteVo);
        noteService.noteWrite(noteVo);
        return new ResponseEntity(HttpStatus.OK);
    }

//쪽지 읽기
    @GetMapping("/noteRead/{no}")
    public ResponseEntity<Map> noteRead(@PathVariable int no){
        String userId = SecurityUtil.getCurrentMemberId();
        NoteVo noteVo = noteService.noteRead(no);
        String recept = noteVo.getRecept();
        System.out.println(recept);
        if (userId.equals(recept)){
        noteService.noteReadCheck(no);
        }
        System.out.println("read"+noteVo);

        Map result = new HashMap<>();
        result.put("noteVo", noteVo);
        return ResponseEntity.ok(result);
    }
//쪽지 삭제
    @PostMapping("/noteDelete")
    public ResponseEntity noteDelete(@RequestBody NoteVo noteVo) {

        int[] nos = noteVo.getNos();
        int size = nos.length;
        System.out.println("nos"+ noteVo.getNos());
        for (int i=0; i<size; i++){
            noteService.noteDelete(nos[i]);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

}
