package com.green.when.controller;//package com.green.when.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.json.JSONObject;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import com.green.when.weather.SetDate;
//import java.io.BufferedReader;
//import java.io.BufferedWriter;
//import java.io.InputStreamReader;
//import java.io.OutputStreamWriter;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api")
//public class WeatherAPIController {
//
//    @GetMapping("/weather")
//    public ResponseEntity restApiGetWeather() throws Exception {
//        /*
//            @ API LIST ~
//
//            getUltraSrtNcst 초단기실황조회
//            getUltraSrtFcst 초단기예보조회
//            getVilageFcst 동네예보조회
//            getFcstVersion 예보버전조회
//        */
//        SetDate setDate= new SetDate();
//        String day = setDate.day();
//        String time = setDate.time();
//        System.out.println("시간"+ day);
//        System.out.println("시간"+ time);
//        String url = "https://api.openweathermap.org/data/2.5/weather?q=Busan&appid=0d4156b167362a339b8e51c8f22507ef";
////                + "?serviceKey=eGMtdRftJiYZQLaCrsbuga7lhzTOZ5YjKsXxB4onZefxLAEtGf49DZr1S%2Be6rJyiTRHtKL2J001cnCC%2Bh52ieQ%3D%3D"
////                + "&dataType=JSON"            // JSON, XML
////                + "&numOfRows=12"             // 페이지 ROWS ( 시간당 11개 항목)
////                + "&pageNo=2"                 // 페이지 번호
////                + "&base_date="+day            // 발표일자
////                + "&base_time="+time           // 발표시각
////                + "&nx=60"                    // 예보지점 X 좌표
////                + "&ny=127";                  // 예보지점 Y 좌표
//
//        HashMap<String, Object> resultMap = getDataFromJson(url, "UTF-8", "get", "");
//
//        System.out.println("# RESULT : " + resultMap);
////        JSONObject jsonObj = new JSONObject();
////        jsonObj.put("result", resultMap);
////
////        String result = jsonObj.toString();
//
//        return ResponseEntity.ok(resultMap);
//
//    }
//
//    public HashMap<String, Object> getDataFromJson(String url, String encoding, String type, String jsonStr) throws Exception {
//        boolean isPost = false;
//
//        if ("post".equals(type)) {
//            isPost = true;
//        } else {
//            url = "".equals(jsonStr) ? url : url + "?request=" + jsonStr;
//        }
//
//        return getStringFromURL(url, encoding, isPost, jsonStr, "application/json");
//    }
//
//    public HashMap<String, Object> getStringFromURL(String url, String encoding, boolean isPost, String parameter, String contentType) throws Exception {
//        URL apiURL = new URL(url);
//
//        HttpURLConnection conn = null;
//        BufferedReader br = null;
//        BufferedWriter bw = null;
//
//        HashMap<String, Object> resultMap;
//
//        try {
//            conn = (HttpURLConnection) apiURL.openConnection();
//            conn.setConnectTimeout(15000);
//            conn.setReadTimeout(15000);
//            conn.setDoOutput(true);
//
//            if (isPost) {
//                conn.setRequestMethod("POST");
//                conn.setRequestProperty("Content-Type", contentType);
//                conn.setRequestProperty("Accept", "*/*");
//            } else {
//                conn.setRequestMethod("GET");
//            }
//
//            conn.connect();
//
//            if (isPost) {
//                bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "UTF-8"));
//                bw.write(parameter);
//                bw.flush();
//                bw = null;
//            }
//
//            br = new BufferedReader(new InputStreamReader(conn.getInputStream(), encoding));
//
//            String line = null;
//            StringBuffer result = new StringBuffer();
//            while ((line=br.readLine()) != null) result.append(line);
//            ObjectMapper mapper = new ObjectMapper();
//            resultMap = mapper.readValue(result.toString(), HashMap.class);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new Exception(url + " interface failed" + e.toString());
//        } finally {
//            if (conn != null) conn.disconnect();
//            if (br != null) br.close();
//            if (bw != null) bw.close();
//        }
//        return resultMap;
//    }
//
//
//}
