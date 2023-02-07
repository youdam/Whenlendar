

package com.green.when.repositories;


import com.green.when.domain.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@EnableJpaRepositories
public interface TagRepository extends JpaRepository<TagEntity, Long> {


    List<TagEntity> findByGroupnametag(String groupname);

    TagEntity findByGroupnametagAndTag(String groupnametag, String tag);
}
