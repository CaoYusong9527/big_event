// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");

// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: ".img-preview",
};

// 1.3 创建裁剪区域
$image.cropper(options);

// ------------------------------
// 绑定上传按钮的功能
$(function () {
  $("#uploadBtn").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    // console.log(e.target.files[0]);
    // 创建一个对应的url地址
    var imgurl = URL.createObjectURL(e.target.files[0]);
    //console.log(imgurl); //b:http://127.0.0.1:5501/910d2f9b-f082-4357-be43-80a3b895bd59

    $image.cropper("destroy").attr("src", imgurl).cropper(options);
  });

  // 更改图片，发送请求
  $("#updateBtn").on("click", function (e) {
    e.preventDefault();
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.post(
      "/my/update/avater",
      {
        avater: dataURL,
      },
      function (res) {
        if (res.status === 0) {
          // 调用父类方法
          window.parent.geyUserInfo();
        }
      }
    );
  });
});
