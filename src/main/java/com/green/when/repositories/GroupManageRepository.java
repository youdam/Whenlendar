package com.green.when.repositories;



import com.green.when.domain.GroupManageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupManageRepository extends JpaRepository<GroupManageEntity, Long> {
    List<GroupManageEntity> findByUserid(String userid);

    List<GroupManageEntity> findAllByGroupname(String groupname);


    GroupManageEntity findByNo(Long no);

    GroupManageEntity findByUseridAndGroupname(String userid, String groupname);

    GroupManageEntity findByGradeAndGroupname(Long no, String groupname);

}
