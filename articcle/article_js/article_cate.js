$(function () {
  // 获取服务端的文章数据

  initArticleData();
  function initArticleData() {
    $.get("/my/article/cates", (res) => {
      //   console.log(res);
      var strHtml = template("templateInit", res);
      $("tbody").html(strHtml);
    });
  }
  var indexOfAdd = 0;
  var indexOfEdit = 0;
  //   给文章添加功能弹出层
  $("#addBtn").on("click", (e) => {
    e.preventDefault();
    // 获取content内容表单字符串
    var strHtml = $("#templateAdd").html();
    indexOfAdd = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "编辑文章 分类",
      content: strHtml,
    });
  });

  //   弹出框的表单提交（事件代理）
  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();
    $.post("/my/article/addcates", $(this).serialize(), function (res) {
      console.log(res);
      if (res.status === 0) {
        // console.log(res.message);
        layui.layer.close(indexOfAdd);
        initArticleData();
      }
    });
  });

  // 通过代理，为编辑按钮绑定时间
  $("tbody").on("click", ".edit", function (e) {
    e.preventDefault();
    var strHtml = $("#templateEdit").html();
    indexOfEdit = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "编辑文章 分类",
      content: strHtml,
    });
    $.get("/my/article/cates/" + $(this).attr("data-id"), function (res) {
      console.log(res);
      if (res.status === 0) {
        layui.form.val("editForm", res.data);
      }
    });
  });

  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    $.post("/my/article/updatecate", $(this).serialize(), function (res) {
      if (res.status === 0) {
        initArticleData();
        layer.close(indexOfEdit);
      }
    });
  });

  //   定义类别删除按钮
  $("tbody").on("click", ".delete", function (e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    layer.confirm("is not?", { icon: 3, title: "提示" }, function (index) {
      $.get(`/my/article/deletecate/${id}`, function (res) {
        console.log(res);
        if (res.status === 0) {
          initArticleData();
          layer.close(index);
        } else {
          layui.layer.msg(res.message);
        }
      });
    });
  });
});
