package com.green.when.weather;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class SetDate {

    public String time() {
        Date thisTime = Calendar.getInstance().getTime();
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH");
        String time = timeFormat.format(thisTime);
        switch(time) {
            case "02":
            case "03":
            case "04":
                time ="0200"; // 다음날 예보 : +24 모래 예보 : +48 (페이지)
                break;
            case "05":
            case "06":
            case "07":
                time ="0500";//
                break;
            case "08":
            case "09":
            case "10":
                time ="0800";
                break;
            case "11":
            case "12":
            case "13":
                time ="1100";
                break;
            case "14":
            case "15":
            case "16":
                time ="1400";
                break;
            case "17":
            case "18":
            case "19":
                time ="1700";
                break;
            case "20":
            case "21":
            case "22":
                time ="2000";
                break;
            case "23":
            case "24":
            case "01":
                time ="2300";
                break;
        }
        return time;
    }

    public String day () {
    Date today = Calendar.getInstance().getTime();
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
    String day = dateFormat.format(today);
        return day;
    }



}
