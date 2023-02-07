package com.green.when.controller;

import com.green.when.domain.BoardEntity;
import com.green.when.domain.GroupEntity;
import com.green.when.domain.GroupManageEntity;
import com.green.when.domain.NoteEntity;
import com.green.when.dto.dtos.BoardDto;
import com.green.when.dto.dtos.GroupDto;
import com.green.when.dto.dtos.NoteDto;
import com.green.when.service.BoardService;
import com.green.when.service.GroupManageService;
import com.green.when.service.GroupService;
import com.green.when.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class DirectorController {

    private final GroupService groupService;

    private final GroupManageService groupManageService;

    private final BoardService boardService;

    private final NoteService noteService;

    // 소모임 목록 보기
    @GetMapping("/direct/get-grouplist")
    public WrapperClass direct_get_groupList(){
        System.out.println("관리자의 목록");
        List<GroupEntity> groups = groupService.findAll();
        List<GroupDto> groupDtos = groups.stream().map( g -> new GroupDto(g)).collect(Collectors.toList());


        return new WrapperClass(groupDtos);
    }

    //공지사항 OR FAQ 목록 보기
    @GetMapping("/direct/get-service-center/{role}")
    public WrapperClass direct_get_service_center_by_role(@PathVariable("role") Long role) {
        if (role == 1L) {
            System.out.println("공지사항 가져갑니다");
           } else if (role == 2L) {
            System.out.println("FAQ가져갑니다");
        }
        List<BoardEntity> boards = boardService.findAnnouncements(role);
        List<BoardDto> boardDtos = boards.stream().map(b -> new BoardDto(b)).collect(Collectors.toList());

        return new WrapperClass(boardDtos);
    }

    // 0 : 정상화 1 : 소모임장, 관리자만 접근 가능. 2 : 관리자만 접근가능
    @PutMapping("/direct/change-accessiblelevel/{groupname}/{accessiblelevel}")
    public ResponseEntity change_accessiblelevel(@PathVariable("groupname") String groupname,
                                                 @PathVariable("accessiblelevel") Long accessiblelevel){
        System.out.println("change-accessiblelevel-" + groupname);
        //찾고 (groupmanage의 accessiblelevel로 처리.)
        List<GroupManageEntity> lists = groupManageService.findonlyByGroupName(groupname);
        for (GroupManageEntity grovi : lists) {
            groupManageService.update(grovi, accessiblelevel);
            System.out.println("하나하나 잘 바뀌었나 보는중 : " +grovi);
        }
        return ResponseEntity.ok().build();
    }



    // 소모임장들에게 단체 쪽지
    @PostMapping("/direct/note-all-groupLeader")
    public ResponseEntity note_all_groupleader(@RequestBody NoteDto noteDto){

        List<GroupEntity> group = groupService.findAll();
        List<GroupDto> groupDtos = group.stream().map( g -> new GroupDto(g)).collect(Collectors.toList());

        for (GroupDto groupDto : groupDtos){
            String recept = groupDto.getGroupleader();
            NoteEntity note = new NoteEntity(noteDto);
            note.setRecept(recept);

            System.out.println("direct/저장될 내용 보기 " + note);

            noteService.save(note);
        }

        return ResponseEntity.ok().build();

    }


    // 소모임장에게 혹은 유저에게 개인 쪽지
    @PostMapping("/direct/note-each-of-groupLeader-or-just-user")
    public ResponseEntity note_each_ot_groupLeader(@RequestBody NoteDto noteDto){
        NoteEntity note = new NoteEntity(noteDto);
        noteService.save(note);

        return ResponseEntity.ok().build();
    }



    // 해당 소모임 정지or폐쇄
    // 각각 어떤 상태지?? 정지: 접근이 불가 데이터는 유지 . 폐쇄 : delete




    // 소모임에 공지쓰기. 사진은 못가져옴
    @PostMapping("/direct/alert-them")
    public ResponseEntity alert_them(@RequestBody BoardDto boardDto){
        BoardEntity board = new BoardEntity(boardDto);
        boardService.create(board);

        return ResponseEntity.ok().build();
    }

    // 해당 소모임으로 이동하여, (클릭으로 이동) 게시판 글 삭제
    @DeleteMapping("/direct/delete-multiple")
    public void deleteMultiple(@RequestBody List<Long> selectedItems) {
        System.out.println("1.왔나용??: " + selectedItems);
        for ( Long no : selectedItems){
            BoardEntity board = boardService.findOne(no);
            System.out.println("보여저" + board);
            boardService.delete(board);
        }

    }


    // 해당 소모임으로 이동하여, 인원관리 ( 특정인 퇴출)
    @DeleteMapping("/direct/manage/kick-out/{userid}/{groupname}")
    public ResponseEntity delete_user_from_group(@PathVariable String userid,
                                                 @PathVariable String groupname){
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 잘 됐따 보낼게 없다. 204
        try{
            GroupManageEntity groupManage = groupManageService.findit(userid, groupname); // 이거 찾아서
            groupManageService.delete(groupManage);   // 지워
        } catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("delete_board/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }






}
