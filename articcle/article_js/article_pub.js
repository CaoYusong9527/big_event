$(function () {
  var state = "已发布";

  $("#caogao").click(function () {
    state = "草稿";
  });
  // 初始化富文本编辑器
  initEditor();
  // 获取分类
  $.get(`/my/article/cates`, function (res) {
    if (res.status === 0) {
      var strHTML = template("cate", res);
      $("[name=cate_id]").html(strHTML);
      layui.form.render();
    }
  });

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  //   伪造按钮
  $("#chooseImage").click(function () {
    $("#file").click();
  });

  $("#file").change(function (e) {
    var fd = e.target.files[0];
    console.log(fd);
    var newImgURL = URL.createObjectURL(fd);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //   表单提交
  $("#formPub").submit(function (e) {
    e.preventDefault();
    var fd = new FormData($(this)[0]);
    fd.append("state", state);

    // 获取选择后的图片，并且利用toBlob转换成了接口要的进制数据
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        fd.append("cover_img", blob);

        $.ajax({
          url: `/my/article/add`,
          data: fd,
          method: "POST",
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res);
            if (res.status === 0) {
              window.location.href = "/article/art_list.html";
            }
          },
        });
      });
  });
});
