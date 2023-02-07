package com.green.when.service;

import com.green.when.mapper.CalendarMapper;
import com.green.when.mapper.UserMapper;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.vo.ScheduleVo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Getter
@Setter
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarService {
    private final CalendarMapper calendarMapper;
    @Transactional
    public void insertSchedule(ScheduleVo schedule) {
        calendarMapper.insertSchedule(schedule);

    }

    @Transactional
    public List<ScheduleVo> getSchedules(ScheduleVo scheduleVo) {
        List<ScheduleVo> scheduleList = calendarMapper.getSchedules(scheduleVo);
        return scheduleList;
    }

    @Transactional
    public List<ScheduleVo> getAllSchedules(ScheduleVo scheduleVo) {
        List<ScheduleVo> allScheduleList = calendarMapper.getAllSchedules(scheduleVo);
        return allScheduleList;
    }

    @Transactional
    public void deleteSchedule(ScheduleVo schedule) {
        calendarMapper.deleteSchedule(schedule);
    }

    @Transactional
    public void updateSchedules(Map schedule) {
        calendarMapper.updateSchedules(schedule);
    }

}