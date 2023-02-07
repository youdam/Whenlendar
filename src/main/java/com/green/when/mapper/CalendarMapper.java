package com.green.when.mapper;


import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.vo.ScheduleVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//기존 DaoImpl 대신 mapper와 다이렉트 연결
@Repository
@Mapper
public interface CalendarMapper {
    void insertSchedule(ScheduleVo schedule);

    List<ScheduleVo> getSchedules(ScheduleVo scheduleVo);

    void deleteSchedule(ScheduleVo schedule);

    void updateSchedules(Map schedule);

    List<ScheduleVo> getAllSchedules(ScheduleVo scheduleVo);

}
