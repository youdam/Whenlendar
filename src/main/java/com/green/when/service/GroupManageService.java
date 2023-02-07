
package com.green.when.service;

import com.green.when.domain.GroupManageEntity;
import com.green.when.dto.dtos.MemberAndGroupJoinDto;
import com.green.when.repositories.GroupManageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional( readOnly = true )
public class GroupManageService {

    private final GroupManageRepository groupManageRepository;


    public List<GroupManageEntity> findByUserid(String userid) {
        return groupManageRepository.findByUserid(userid);

    }

    @Transactional
    public void create(GroupManageEntity groupfortwo) {
        groupManageRepository.save(groupfortwo);
    }

    public GroupManageEntity findOne(Long no) {
       return groupManageRepository.findById(no).orElseThrow(NullPointerException::new);
    }


    @Transactional
    public void delete(GroupManageEntity groupManage) {
        groupManageRepository.delete(groupManage);
    }



    public List<MemberAndGroupJoinDto> findByGroupName(String groupname) {

        List<GroupManageEntity> groupManageEntities = groupManageRepository.findAllByGroupname(groupname);
        List<MemberAndGroupJoinDto> lists = new ArrayList<>();
        groupManageEntities.forEach(g -> {
            MemberAndGroupJoinDto memberAndGroupJoinDto = new MemberAndGroupJoinDto();
            memberAndGroupJoinDto.setUserid(g.getUserid());
            memberAndGroupJoinDto.setUsernickname(g.getMemberEntities().getUsernickname());
            memberAndGroupJoinDto.setGrade(g.getGrade());
            memberAndGroupJoinDto.setTime(g.getTime());
            memberAndGroupJoinDto.setGroupname(g.getGroupname());
            lists.add(memberAndGroupJoinDto);
        });

        return lists;


    }


    @Transactional
    public void changeLeader(String userid, String groupname) {
        Long no = Long.valueOf(1);
        GroupManageEntity group = groupManageRepository.findByGradeAndGroupname(no, groupname);
        group.setGrade(2L);
        GroupManageEntity groupNewLeader = groupManageRepository.findByUseridAndGroupname(userid, groupname);
        groupNewLeader.setGrade(1L);



    }

    public GroupManageEntity findit(String userid, String groupname) {
        return groupManageRepository.findByUseridAndGroupname(userid, groupname);
    }

    @Transactional
    public void save(GroupManageEntity groupManageEntity) {
        groupManageRepository.save(groupManageEntity);
    }


    @Transactional
    public void update(GroupManageEntity grovi, Long accessiblelevel) {
        grovi.setAccessiblelevel(accessiblelevel);

    }

    public List<GroupManageEntity> findonlyByGroupName(String groupname) {
        return groupManageRepository.findAllByGroupname(groupname);
    }
}
