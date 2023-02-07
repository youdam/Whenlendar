package com.green.when.controller;



import com.green.when.config.SecurityUtil;
import com.green.when.domain.CommentEntity;
import com.green.when.dto.CommentDeleteDto;
import com.green.when.dto.dtos.CommentDto;
import com.green.when.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class CommentApiController {

    private final CommentService commentService;



    //READ-COMMENT : 해당 게시글에 달린 댓글이 전부 가야하니 list로 보내겠음
    @GetMapping("/api/comment-list/{no}")
    public WrapperClass comment_list(@PathVariable("no") Long no) {
        List<CommentEntity> commentList = commentService.findByBoardId(no);
        List<CommentDto> commentDtoList = commentList.stream().map(b-> new CommentDto(b)).collect(Collectors.toList());

        return new WrapperClass(commentDtoList);
    }

    @GetMapping("/api/comment-list-mypage")
    public WrapperClass comment_list_mypage(){
        String userid = SecurityUtil.getCurrentMemberId();
        List<CommentEntity> commentList = commentService.findByUserid(userid);
        List<CommentDto> commentDtoList = commentList.stream().map(b-> new CommentDto(b)).collect(Collectors.toList());

        return new WrapperClass(commentDtoList);
    }

    //CREATE-COMMENT
    @PostMapping("/api/create-comment")
    public ResponseEntity create_comment(@RequestBody CommentDto commentDto){
        System.out.println("1. 댓글달기기능 dto 는 도착했을까 : " + commentDto);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;

        try {
            LocalDateTime date = LocalDateTime.now();
            String userid = SecurityUtil.getCurrentMemberId();

            CommentEntity comment = new CommentEntity(
                    commentDto.getNo(),
                    userid,
                    commentDto.getContentNo(),
                    commentDto.getContent(),
                    date

            );
            commentService.create(comment);
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity(body, headers, status);
    }


    //UPDATE-COMMENT
    @PostMapping("/api/update-comment")
    public ResponseEntity update_comment(@RequestBody CommentDto commentDto){
        System.out.println(" 백엔드 도착 댓글을 업데이트를 해보자 ! ");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT;
        try {
            System.out.println("업데이트 try");
            commentService.update(commentDto.getNo(), commentDto.getContent());
            System.out.println("업데이트 try 종료 ");
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;

        }
        System.out.println("댓글 업데이트 완료! 이제 프론트엔드로 보냅니다");
        return new ResponseEntity(body, headers, status);
    }


    //DELETE-COMMENT
    @DeleteMapping("/api/delete-comment")
    public ResponseEntity delete_comment(@RequestBody CommentDeleteDto commentDeleteDto){
        System.out.println("여기는 백엔드 댓글을 삭제해보자! ");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT;
        try {
            CommentEntity comment = commentService.findOne(commentDeleteDto.getNo());
            commentService.delete(comment);
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;

        }
        System.out.println("여기는백엔드 댓글삭제 완료!");
        return new ResponseEntity(body, headers, status);

    }

}
