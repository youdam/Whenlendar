package com.green.when.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "memo_tb")
@Getter
@Setter
@ToString(exclude =  {"groupEntity"})
@NoArgsConstructor
public class MemoEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "no", nullable = false)
    private  Long no;

    @Column( name = "userid", nullable = false)
    private String userid;

    @Column( name = "groupname", nullable = false)
    private String groupname;


    @Column( name = "memo", nullable = false)
    private  String memo;

    @Column( name = "region", nullable = false)
    private Long region;

    @Column( name = "targetdate", nullable = false)
    private String targetdate;

    @Column( name = "color")
    private String color;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "groupname", referencedColumnName = "groupname", insertable = false, updatable = false)
    private GroupEntity groupEntity;




}
