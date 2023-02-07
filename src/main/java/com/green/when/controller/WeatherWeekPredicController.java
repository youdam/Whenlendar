package com.green.when.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class WeatherWeekPredicController {
    @GetMapping("/weekPredict")
    public ResponseEntity<Map>  weekPredict() throws Exception {

        String appUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=129&exclude=current,minutely,hourly,alerts&appid=0d4156b167362a339b8e51c8f22507ef&lang=kr";

        URL url = new URL(appUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;

        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        String data = sb.toString();
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jacksonMap = objectMapper.readValue(data, new TypeReference<Map<String, Object>>(){});
        System.out.println("weekly"+jacksonMap);
//
//        HashMap <String, Object> resultMap = new HashMap<>();
//        data = data.replaceAll("\"", "");
//
//        Map result = new HashMap<>();
//        result.put("data", data);
        return ResponseEntity.ok(jacksonMap);
    }
}
