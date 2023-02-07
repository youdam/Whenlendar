package com.green.when.service;


import com.green.when.domain.GroupEntity;
import com.green.when.repositories.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;


    @Transactional
    public void create(GroupEntity group) {

        groupRepository.save(group);
    }

    @Transactional
    public void update(String groupname, String descript, String oldGroupName) {
        GroupEntity findGroup = groupRepository.findById(oldGroupName).orElseThrow(NullPointerException::new);
        findGroup.setGroupname(groupname);
        findGroup.setDescript(descript);
    }

    public GroupEntity findOne(String groupname) {
        return groupRepository.findById(groupname).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public void delete(GroupEntity group) {
        groupRepository.delete(group);
    }

    @Transactional
    public void changeLeader(String userid, String groupname) {
        GroupEntity findGroup = groupRepository.findById(groupname).orElseThrow(NullPointerException::new);
        findGroup.setGroupleader(userid);
    }


    public List<GroupEntity> findAll() {
        return groupRepository.findAll();
    }
}
