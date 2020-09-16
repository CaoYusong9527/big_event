$(function () {
  $(".reg_link").on("click", function () {
    $(".login_form").hide();
    $(".reg_form").show();
  });
  $(".login_link").on("click", function () {
    $(".login_form").show();
    $(".reg_form").hide();
  });
  layui.form.verify({
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    checkPwd: function (value) {
      if ($("#reg_password").val() !== value) {
        return "密码不一致";
      }
    },
  });
  $(".reg_form").submit(function (e) {
    e.preventDefault();
    var username = $("#reg_Usr").val();
    var password = $("#reg_password").val();
    var formdata = {
      username: username,
      password: password,
    };
    $.post("/api/reguser", formdata, function (res) {
      if (res.status === 0) {
        // console.log(res.message);
        alert(res.message);
        layui.layer.msg(res.message);
        $(".login_link").click();
      } else {
        // console.log(res.message);
        // alert(res.message);
        layui.layer.msg(res.message);
        // $(".login_link").click();
      }
    });
  });

  // 登录请求
  $(".login_form").submit(function (e) {
    e.preventDefault();
    // var formdata = $(this).serialize();
    var username = $("#login_user").val();
    var password = $("#password").val();
    var formdata = {
      username: username,
      password: password,
    };
    $.post("/api/login", formdata, function (res) {
      if (res.status === 0) {
        console.log(res);
        window.location.href = "../index.html";
        // alert(res.message);

        res.token.length !== 0 &&
          window.localStorage.setItem("token", res.token);
      } else {
        layui.layer.msg(res.message);
      }
    });
  });
});
