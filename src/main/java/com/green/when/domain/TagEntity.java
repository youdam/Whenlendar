

package com.green.when.domain;

import com.green.when.dto.dtos.TagDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table( name = "tag_tb")
@Data
@NoArgsConstructor
@ToString( exclude = {"groupEntity"})
public class TagEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column (name = "no", nullable = false)
        private Long no;

        @Column (name = "groupnametag", nullable = false)
        private String groupnametag;

        @Column (name = "tag",nullable = false)
        private String tag;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "groupnametag", referencedColumnName = "groupname", insertable = false, updatable = false)
        private GroupEntity groupEntity;

        public TagEntity(TagDto tagDto){
            this.no = tagDto.getNo();
            this.groupnametag = tagDto.getGroupnametag();
            this.tag = tagDto.getTag();
        }

        public TagEntity( String groupnametag, String tag){
                this.no = null;
                this.groupnametag=groupnametag;
                this.tag = tag;
        }

}
