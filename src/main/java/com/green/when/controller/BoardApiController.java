package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.domain.BoardEntity;
import com.green.when.domain.CommentEntity;
import com.green.when.domain.FileEntity;
import com.green.when.dto.BoardDeleteDto;
import com.green.when.dto.dtos.BoardDto;
import com.green.when.dto.dtos.FileDto;
import com.green.when.service.BoardService;
import com.green.when.service.CommentService;
import com.green.when.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class BoardApiController {

    private final BoardService boardService; // Autowired로 스프링 빈에 등록

    private final FileService fileService;

    private final CommentService commentService;
    // git test. this is master

    @GetMapping("/api/board-list/{groupname}")
    public WrapperClass board_list(@PathVariable("groupname") String groupname) {

        List<BoardEntity> boardList = boardService.findBoardsBygroupname(groupname);
        System.out.println("1. 요청와서 일단 만듦 boardList:" + boardList);

        // 해당 boardList의 no를 사용해서 COMMENT_NO 의 각 LIST의 개수를 COUNT함.
        //
        List<BoardDto> boardDtoListForComment = new ArrayList<>();

        for (BoardEntity board : boardList){

       //     System.out.println("cycy : 1. 댓글개수 넣기 start");
            List<CommentEntity> comments = commentService.findByContentno(board.getNo());
      //      System.out.println("cycy : 2. board.getNo() : " + board.getNo() );

            Long commentCount = Long.valueOf(comments.size());
        //    System.out.println("cycy : 3. commentCount :  " + commentCount );

            BoardDto boardD = new BoardDto(board);
        //    System.out.println("cycy : 4 댓글갯수 없는 boardDto : " + boardD);
            boardD.setCommentCount(commentCount);
        //    System.out.println("cycy : 5 3번+4번 . 즉 boardDto 에 댓글개수 더함 :" + boardD);

            boardDtoListForComment.add(boardD);
           // System.out.println("cycy : 6 지금까지 총 list  :" + boardDtoListForComment  );

        }

     //   List<BoardDto> boardDtoList = boardList.stream().map(b ->
      //          new BoardDto(b)).collect(Collectors.toList());
        return new WrapperClass(boardDtoListForComment);
    }



/*
get 요청으로 온 게시글 전체(제목만)보기
controller 니까, api만 받는 거고 내부 로직은 service가 담당함.
 아무튼 서비스에서 하는게 리스트 뽑는거니까 그거 보드서비스에서 만들어야댐

 List<BoardDto> boardDtoList = boardList.stream().map(b -> new BoardDto(b)).collect(Collectors.toList()); 이게 뭐냐면
 dto가 layer간에 데이터 편하게 주고받는 형식이잖아
 dto 형식으로 각각 맵핑해서 바꿔주는거임
 boardlist들에 하나씩 접근해서 (b로서 접근하면서) boardDto 타입으로 바꾸고 list형태로 해서
 결과적으로 return 할떄 dto 형태로 리턴하는데? 이떄 확장성을 가져가기 위해서
 wrapperclass를 사용한다 ..........

 wrapperClass가 뭐냐면 : 함수 내부에서 리턴을 할 떄도 dto로 한다고 했긴 했찌만 사실 dto만 주고
 받을 수 는 없음. (다른 웹상에다가 주는 경우 같은..)
 그래서 그런 경우 확장성 있게 살짝 포장해서 넘기는거임 ㅎㅎ 그래서 api폴더 내에 하나 클래스 만들어 놓겟음.

 */

    @GetMapping("/api/board-detail/{no}")
    public WrapperClass board_detail(@PathVariable("no") Long no){
        BoardEntity boardEntity = boardService.findOne(no);    //entity애 boardId없지만, findOne자체가 primary key 만 뒤짐
        System.out.println("글상세보기 entity 열어봄 " + boardEntity);
       // List<FileEntity> fileEntities = fileService.findByBoardEntity(boardEntity);  //boardDto 에는 List<fileEntitiy> 가 없으니 해줘야함
        //그냥 List<FileEntity> 를 추가하고싶다
        /*
         List<BoardDto> boardDtoList = boardList.stream().map(b ->
                new BoardDto(b)).collect(Collectors.toList());
         */
      //  List<FileDto> files = fileEntities.stream().map(b-> new FileDto(b)).collect(Collectors.toList());


        BoardDto boardDto = new BoardDto(boardEntity);
        System.out.println("글 상세보기: dto열어봄  " + boardDto);
        return new WrapperClass(boardDto);
    }


    @GetMapping("/api/board-list-mypage")
    public WrapperClass board_lists_mypage(){
        String userid = SecurityUtil.getCurrentMemberId();
        List<BoardEntity> boardList = boardService.findBoardsByUserid(userid);
        System.out.println("1. 요청와서 일단 만듦 boardList:" + boardList);
        List<BoardDto> boardDtoList = boardList.stream().map(b ->
                new BoardDto(b)).collect(Collectors.toList());
        System.out.println("2. 그걸 boardDtoList 로 맵핑함. 처음엔 열어봤는데 그림너무 길어");
        System.out.println("+ 근데 이건 뭐냐 Collectors.tolist? : " + Collectors.toList());
        return new WrapperClass(boardDtoList);

    }
    /*
    @GetMapping("/api/board-detail/{no}")
public WrapperClass board_detail(@PathVariable("no") Long no){
    BoardEntity boardEntity = boardService.findOne(no);
    List<FileEntity> fileEntities = fileService.findByBoardEntity(boardEntity);
    BoardDto boardDto = new BoardDto(boardEntity, fileEntities);
    return new WrapperClass(boardDto);
}

     */

/*
상세보기 페이지임.
똑같은 getMapping인데 , pathVariable이 있음. 뭔뜻이냐면
getMapping 되어온 ("boardId") 를, Long boardId 변수로 가져오겠다는 뜻임.

그리고 위에랑 똑같이 boardDto 로 바꾸고 wrapperclass로 감싸서 보낸다.
 */


    //검색기능을 만들어 보자. 일단 a라고 함
    @GetMapping("/api/searching-in-board/{searchQuery}/{groupname}")
    public WrapperClass searching_in_board(@PathVariable String searchQuery,
                                           @PathVariable("groupname") String groupname)throws Exception{
        //일단 받아온 값 체크
        System.out.println("검색하고자 하는 것은? : " + searchQuery);
        //이제 db를 가야하니까 entity로 만들어 보자 ㅅㅂ 이게되나???
        List<BoardEntity> board = boardService.search(searchQuery, searchQuery, groupname);
        //이제 돌려보내야 하니까 dto 로 list 를 감싸주자
        List<BoardDto> boardDtoList = board.stream().map(b ->
                new BoardDto(b)).collect(Collectors.toList());


        return new WrapperClass(boardDtoList);
    }

    //여기보세요 userid 20230118
    @PostMapping("/api/create-board")
    public ResponseEntity create_board(@RequestBody BoardDto boardDto)throws Exception{
      //  String userid = SecurityUtil.getCurrentMemberId(); <- 로그인한 유저의 id
        //     System.out.println("create_board/boardDto = " + boardDto);
        System.out.println("0. here");

        Long no = boardDto.getNo();
        String title = boardDto.getTitle();
        //String userid = boardDto.getUserid();
        String userid = SecurityUtil.getCurrentMemberId();   // userid는 지금부터 토큰으로 받아온다.
        String content = boardDto.getContent();
        Long readcount = Long.valueOf(0);
        String groupname = boardDto.getGroupname();
        List<FileDto> files = boardDto.getFiles();    ////List<FIleEntity> 로 바꿔야함
        String tag = boardDto.getTag();
        boolean allowcomment = boardDto.isAllowcomment();
        Long role = boardDto.getRole();

        if(files == null){
            BoardEntity boardForNoFile = new BoardEntity(no, title, userid, content, readcount,
                        groupname, LocalDateTime.now(), allowcomment, tag, role);
            boardService.create(boardForNoFile);

        }else {
            System.out.println("1. here");

            BoardEntity board = new BoardEntity(no, title, userid, content, readcount,
                    groupname, LocalDateTime.now(), allowcomment, tag, role);

                    boardService.create(board);

            for (FileDto fileDto : files) {

                FileEntity fileEntity = new FileEntity(no, fileDto.getFiledata(), board.getNo());
                fileService.createFile(fileEntity);

                System.out.println("4. here");

                System.out.println("2. here. service가기 직전임 board:-> " + board);

                System.out.println("3. here");
            }

        }

                return ResponseEntity.ok().build();
    }
/*
            if(files == null){
                System.out.println("사진없엉");
            }else {
                for (FileDto fileDto : files) {
                    System.out.println("왜굳이?");
                    FileEntity fileEntity = new FileEntity(no, fileDto.getFiledata(), board.getNo());
                    fileService.createFile(fileEntity);
                    System.out.println("4. here");

                }

            }
*/
        //} catch (Exception exception){
          // status = HttpStatus.BAD_REQUEST; // 400 에러
        //    System.out.println("실행안됨. 지금 BoardDTO에는? :" + boardDto);
        //  System.out.println("create_board/exception = " + exception);
//        }

/*
    @PostMapping("/api/upload-image")
    public ResponseEntity upload_image(@RequestBody FileDto fileDto){
        System.out.println("이미지 controller도착");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED; // 201 잘 생성되었음을 의미
        try {
                    FileEntity file = new FileEntity(
                            fileDto.getNo(),
                            fileDto.getFiledata(),
                            fileDto.getContentNo()
                    );

                fileService.create(file);
        } catch (Exception exception){
            status = HttpStatus.BAD_REQUEST; // 400 에러
            System.out.println("create_board/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }
*/

    /*
    게시글 생성하기임.
    상태코드 (200, 300, 400, 500) 이런거 봐야할때 responseEntity 를 사용하면 좋음
    여기서도 wrapper 사용해도 되는데, header도 봐야하고 하는경우 responseEntity를 추천함.
    골라서 써라

    create했을떄 생성이 잘 되면 201이라는 상태코드로 확인할 수 있는거임.
    잘 되면 201인데 안된경우 catch구문에서 status = HttpStatus.BAD_REQUEST; << 여기서 status가 BAD로
    바뀜.  그래서 frontend에서 401이 보이면 아 create가 제대로 안됐구나 하는 에러를 띄울 수 있음.



     */

    @PutMapping("/api/update-board")
    public ResponseEntity update_board(@RequestBody BoardDto boardDto){
        System.out.println("update_board/boardDto = " + boardDto);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 보낼 내용이 없다 수정 잘 댓다  204 -> 수정이 정상적으로 완료됬음을 의미
        try{
            boardService.update(boardDto.getNo(), boardDto.getTitle(), boardDto.getContent());
        } catch (Exception exception){
            status = HttpStatus.BAD_REQUEST; // 400 에러
            System.out.println("update_board/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }

    /*
    이게 수정임. 이게 중요한 부분임.
    try{
    boardDto.getId(), boardDto.getTitle(), boardDto.getContent() <- 수정 '할' 아이디, 제목, 내용임.
    서비스단에 넘겨줘서 내부 로직으로 반영을 하는거임.
    이 과정 실패시 catch 구문으로 가는거임.

     */

    @DeleteMapping("/api/delete-board")
    public ResponseEntity delete_board(@RequestBody BoardDeleteDto boardDeleteDto){
        System.out.println("delete_board/boardDeleteDto = " + boardDeleteDto);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 잘 됐따 보낼게 없다. 204
        try{
            System.out.println("잘찾았냐? getNO: " + boardDeleteDto.getNo());
            BoardEntity board = boardService.findOne(boardDeleteDto.getNo()); // 이거 찾아서
            System.out.println("잘 골랐나 보자 :board" + board );
            boardService.delete(board);   // 지워
            System.out.println("삭제 되었나 보자 : board " + board);
        } catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("delete_board/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }
    /*
    이제 게시글 삭제 부분임 이것도 좀 조심스럽게 해야함.
    이건 삭제니까 사실 id만 있으면 됨. title, content이런게 필요가 없음 그래서 BoardDeleteDto 를 새로 만듦

     */

    //게시글 대량 삭제
/*
    @DeleteMapping("/api/delete-multiple")
    public void delete_multiple(@RequestBody List<BoardDeleteDto> boardDeleteDto) {
        for (BoardDeleteDto board : boardDeleteDto ) {
            BoardEntity boardE = boardService.findOne(board.getNo());
            System.out.println("삭제예정 : " + boardE);
            boardService.delete(boardE);
        }
    }
*/
    @DeleteMapping("/api/delete-multiple")
    public void deleteMultiple(@RequestBody List<Long> selectedItems) {
        System.out.println("1.왔나용??: " + selectedItems);
        for ( Long no : selectedItems){
            BoardEntity board = boardService.findOne(no);
            System.out.println("보여저" + board);
            boardService.delete(board);
        }

    }


}