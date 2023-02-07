

package com.green.when.service;


import com.green.when.domain.TagEntity;
import com.green.when.dto.dtos.TagDto;
import com.green.when.repositories.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;


    @Transactional
    public void create(TagEntity tag) {
        tagRepository.save(tag);
    }


    public List<TagEntity> findByGroupnametag(String groupname) {
        return tagRepository.findByGroupnametag(groupname);
    }

    @Transactional
    public TagDto updateTag(Long no, TagDto tagDto) {
        Optional<TagEntity> tagData = tagRepository.findById(no);
        if (tagData.isPresent()) {
            TagEntity tagEntity = tagData.get();
            tagEntity.setTag(tagDto.getTag());
            tagRepository.save(tagEntity);
            return new TagDto(tagEntity);
        } else {
            return null;
        }

    }

    @Transactional
    public TagDto createTag(TagDto tagDto) {
        TagEntity newTag = new TagEntity(tagDto);
        if (newTag != null) {
            tagRepository.save(newTag);
            return new TagDto(newTag);
        } else {
            return null;
        }
    }

    @Transactional
    public void delete(TagEntity tag) {
        System.out.println("삭제될 태그 : " + tag);
        tagRepository.delete(tag);
    }

    @Transactional
    public TagEntity findByGroupnametagAndTag(String groupnametag, String tag) {
        return tagRepository.findByGroupnametagAndTag(groupnametag, tag);
    }
}