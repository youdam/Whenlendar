<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Spring Boot Application with JSP</title>
</head>
<body>
<div> member</div>
<c:forEach var="salaryList" items="${salaryList}">
    <p><c:out value="${salaryList.userid}" /></p>
</c:forEach>
<div><a href="/list">member!!!</a></div>
</body>
</html>