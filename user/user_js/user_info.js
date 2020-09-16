$(function () {
  // 用户昵称的限制条件
  window.layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称不能超过6位！";
      }
    },
  });

  // 获取用户信息
  getUserInfo();
  function getUserInfo() {
    $.get("/my/userinfo", function (res) {
      console.log(res);
      $("#username").val(res.data.username);
    });
  }

  //   重置信息
  $("#btn-reset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });

  // ----------------------------
  // 提交修改的信息
  $(".updateInfo").submit(function (e) {
    e.preventDefault();
    $.post("/my/userinfo", $(this).serialize(), function (res) {
      console.log(res);
      if (res.status === 0) {
        return layui.layer.msg(res.message);
      }
    });
  });
});
