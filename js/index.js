$(function () {
  var token = localStorage.getItem("token");

  $.ajax({
    url: "/my/userinfo",
    headers: {
      Authorization: token,
    },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }

      renderAvatar(res.data);
    },
  });
});
// ------------------------------------------------------------
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  $(".welcome").html(name);

  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}

$("#btn-logout").on("click", function () {
  layui.layer.confirm(
    "确认退出么？？",
    { icon: 3, title: "真的要退出吗？" },
    function (index) {
      //do something
      localStorage.removeItem("token");

      window.location.href = "../login.html";
      layer.close(index);
    }
  );
});
// ---------------------------------------------
