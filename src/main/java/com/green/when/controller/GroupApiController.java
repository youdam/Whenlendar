package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.domain.GroupEntity;
import com.green.when.domain.GroupManageEntity;
import com.green.when.domain.TagEntity;
import com.green.when.dto.GroupDeleteDto;
import com.green.when.dto.dtos.GroupDto;
import com.green.when.dto.dtos.GroupManageDto;
import com.green.when.dto.dtos.TagDto;
import com.green.when.service.GroupManageService;
import com.green.when.service.GroupService;
import com.green.when.service.TagService;
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
public class GroupApiController {


    private final GroupService groupService;

    private final GroupManageService groupManageService;

    private final TagService tagService;

    //CREATE NOW GROUP
    @PostMapping("/api/creat-group")
    public ResponseEntity create_group(@RequestBody GroupDto groupDto){
        System.out.println("time to making for new group");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED; // 201 = WELL DONE
        try{

            String groupname = groupDto.getGroupname();
            String groupleader =  SecurityUtil.getCurrentMemberId();
            String descript = groupDto.getDescript();
            List<TagDto> tags = groupDto.getTags();
            LocalDateTime timepre = LocalDateTime.now();
            String time = String.valueOf(timepre);


            GroupEntity group = new GroupEntity(groupleader, groupname, descript, time);
            groupService.create(group);
            //순서주의 외래키 문제로 groupentity- > save -> groupmanageEntity -> SAVE해야함
            //이 순서 하나라도 틀리면 외래키 아웃됨

            String userid = SecurityUtil.getCurrentMemberId();
            groupDto.setGroupleader(userid);

            GroupManageEntity groupfortwo = new GroupManageEntity(groupDto);
            groupfortwo.setAccessiblelevel(0L);
            groupManageService.create(groupfortwo);

            for (TagDto tagDto : tags){
                TagEntity tagEntity = new TagEntity(groupname, tagDto.getTag());
                tagService.create(tagEntity);}

        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("안만들어지는 이유 : " + exception);


            }

            System.out.println("지랄마라진짜 ");


    return new ResponseEntity(body, headers, status);

    }

    //LIST OF GROUP YOU ARE JOINED


//       *******에러***** 해당 서비스->리파지토리보면 그룹메니지엔티티 쓴다고 말해놨기에 여기서 사용 불가
    @GetMapping("/api/group-list")
    public WrapperClass group_list(){
        //group_tb 말고 groupmanage_tb에서 userid로 검색
        // 결과값 groupname 을 가져온다 group_tb로하면
        // member tb 거쳐서 외래키 사용해야 하니까 한번에 그냥 찾겠음
        String userid = SecurityUtil.getCurrentMemberId();
        System.out.println("1. 그룹 리스트 찾으러 옴.");
        System.out.println("2. userid :"+ userid);


        List<GroupManageEntity> listForGroup = groupManageService.findByUserid(userid);
        List<GroupManageDto> listForGroupDTO = listForGroup.stream().map(b ->
                new GroupManageDto(b)).collect(Collectors.toList());
        //
        // warning!!!!! group_tb이 아니라 groupManage_tb이용했음
        //

        System.out.println("3. 그래서 찾은건? List");

        return  new WrapperClass(listForGroupDTO);

    }


    //UPDATE PART. MAYBE NAME OF GROUP? IF YOU ARE THE ONE WHO HAV MADE IT
    //NOTICE!!!!!!!!!!!!!!!!!!!YOU SHOULD GET NOT ONLY GROUPBTE BUT ALSO OLDGOURPNAME
    //WHEN YOU USE UPDATE-GROUPNAME AND UPDATE-GROUPDESCRIPT FUNCTION!!!!!!
    @PostMapping("/api/update-group")
    public ResponseEntity update_group(@RequestBody GroupDto groupDto,
                                       @RequestParam String oldGroupName){
        System.out.println("어ㅠ휴");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 보낼 내용이 없다 수정 잘 댓다  204 -> 수정이 정상적으로 완료됬음을 의미
        try{
            groupService.update(groupDto.getGroupname(),
                    groupDto.getDescript(), oldGroupName);
            // 여기서 리더 바꿀수도 잇긴함.
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST; // 400 에러
            System.out.println("update_group/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }

    //onetomany 해줘야함
    @DeleteMapping("/api/delete-group")
    public ResponseEntity delete_group(@RequestBody GroupDeleteDto groupDto){
        System.out.println("delete_group = " + groupDto);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 잘 됐따 보낼게 없다. 204
        try {
            GroupEntity group = groupService.findOne(groupDto.getGroupname());
            groupService.delete(group);
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("delete_group/exception = " + exception);

        }
        return new ResponseEntity(body, headers, status);

    }

    //그룹리더를 찾아보자..
    @GetMapping("/api/whoisGroupLeader/{groupname}")
    public WrapperClass findgroupleader(@PathVariable("groupname") String groupname){
        GroupDto groupDto = null;
        try{
            System.out.println("Searching for group leader");
            GroupEntity group = groupService.findOne(groupname);
            System.out.println("Found group leader? group" + group);
            groupDto = new GroupDto(group);
        } catch (Exception exception){
            System.out.println("findgroupleader/exception = " + exception);
        }
        return new WrapperClass(groupDto);
    }

    //해당 그룹엔 무슨 말머리가 있을까
    @GetMapping("/api/tag-list/{groupname}/{groupleader}")
    public WrapperClass findtags(@PathVariable("groupname") String groupname,
                                 @PathVariable("groupleader") String groupleader){
        
        System.out.println("태그가지러 왔니");
        String userid = SecurityUtil.getCurrentMemberId();

        List<TagEntity> taglist = tagService.findByGroupnametag(groupname);
        List<TagDto> tagDtos = taglist.stream().map(t ->
                new TagDto(t)).collect(Collectors.toList());

        for(TagDto tagDto : tagDtos){
            System.out.println(" 가지고 가는 태그들 : "+tagDto);
        }
        if (!groupleader.equals(userid)) {
            tagDtos.remove(0);
        }
        return new WrapperClass(tagDtos);
    }

    //태그 삭제
    @DeleteMapping("/api/updateTag")
    public ResponseEntity updateTag(@RequestBody TagDto tagDto) {
        System.out.println("태그삭제 on ");
        TagEntity tag = tagService.findByGroupnametagAndTag(tagDto.getGroupnametag(), tagDto.getTag());
        tagService.delete(tag);

        return ResponseEntity.ok().build();
    }



    //태그 새거 추가
    @PostMapping("/api/addTag")
    public ResponseEntity<TagDto> addTag(@RequestBody TagDto tagDto) {
        TagDto addTag = tagService.createTag(tagDto);
        System.out.println("태그add");
        System.out.println("gggggg");
        System.out.println("gggggdddg");

        if (addTag != null) {
            return new ResponseEntity<>(addTag, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    //DELETE PART. IF YOU ARE THE OWNER.
    //leaderchange

    @PutMapping("/api/change-leader/{userid}/{groupname}")
    public ResponseEntity change_leader(@PathVariable String userid,
                                        @PathVariable String groupname){

        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 보낼 내용이 없다 수정 잘 댓다  204 -> 수정이 정상적으로 완료됬음을 의미
        try{
            groupService.changeLeader(userid, groupname);
            groupManageService.changeLeader(userid, groupname);
        } catch (Exception exception){
            status = HttpStatus.BAD_REQUEST; // 400 에러
            System.out.println("update_board/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);

    }


}
