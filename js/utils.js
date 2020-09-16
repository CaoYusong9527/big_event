// 提取公共的baseurl

$(function () {
  // 请求拦截器
  // 请求之前触发

  $.ajaxPrefilter(function (option) {
    // 统一设置baseurl
    option.url = "http://ajax.frontend.itheima.net" + option.url;

    // 统一设置请求头
    option.headers = {
      Authorization: localStorage.getItem("token") || "",
    };

    // 权限控制
    // var baseUrl = "http://ajax.frontend.itheima.net";

    // $.ajaxPrefilter(function (options) {
    //   options.url = baseUrl + options.url;

    //   if (options.url.includes("/my/")) {
    //     options.headers = {
    //       Authorization: localStorage.getItem("token") || "",
    //     };
    //   }

    //   options.complete = function (res) {
    //     if (
    //       res.responseJSON.status === 1 &&
    //       res.responseJSON.message === "身份认证失败！"
    //     ) {
    //       localStorage.removeItem("token");
    //       window.location.href = "../login.html";
    //     }
    //   };
    // });
  });
});

// ------------------------------------------------------------------
