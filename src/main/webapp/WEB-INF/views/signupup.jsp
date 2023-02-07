<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <meta charset="UTF-8">
    <title>회원가입</title>
    <style>
        *     { box-sizing:border-box;  }

        body  { text-align: center;
            align-items: center;
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #f5f5f5;}

        main {
            display: block;
        }

        .signupForm { width:600px; margin:0 auto; }

        .signupForm input, select {

            border:1px solid grey;
            border-radius:10px;

            padding: 10px;
            margin:5px;

        }

        div  { width: 100%; text-align: center; padding: 0;}


        .con { width:100% }

        #form1 { width:100%; }
        #signup { width: 30%; margin-top: 20px; border:1px solid;}

        hr  {  margin-bottom:70px; }

        .signuplabel { margin-top: 50px; }


    </style>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <script>

    </script>
</head>
<body>
<main class="form-signin w-100 m-auto">
    <div class="signupForm">
        <h2 class="signuplabel">회원가입</h2>
        <hr />
        <form action="/auth/signup" method="POST" id="form1">
            <div class="con">
                <div>
                    <div>
                        <input type="text" id="email" name="email" placeholder="email" maxlength="20"><br>
                        <span id="unameCheck"></span>
                    </div>

                    <div>
                        <input type="password" id="password" name="password" placeholder="password" maxlength="20"><br>
                        <span id="pwCheck"></span>
                    </div>

                    <div>
                        <input type="password" id="repasswd" name="repasswd" placeholder="비밀번호 확인" maxlength="20"><br>
                        <span id="re_pwCheck"></span>
                    </div>

                    <div>
                        <input type="text" id="nickname" name="nickname" placeholder="닉네임" maxlength="15"><br>
                        <span id="unicknameCheck"></span>
                    </div>

                    <div>
                        <input type="text" id="authority" name="authority" placeholder="authority"><br>
                        <span id="emailCheck"></span>
                    </div>

                    <div><input type="submit" id="signup" name="signup" class="btn btn-primary" value="가입하기"/></div>
                </div>
            </div>
        </form>

    </div>
</main>
</body>
</html>