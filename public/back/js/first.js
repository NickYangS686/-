// 良好的习惯  入口函数
$(function(){
  // 声明一个当前页
  var currentpage = 1;
  // 每页多少条
  var pageSize = 5;
  // 一进入页面就调用，进行ajax请求，得到数据，进行页面渲染
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      dataType:"json",
      data:{
          page:currentpage,
          pageSize:pageSize
      },
      success:function( info ){
        console.log(info);
        // 将前端的模板引擎绑定
        var htmlStr = template("firsttmp",info);
        $('tbody').html(htmlStr);

        // 分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 给按钮添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentpage = page;
            // 重新渲染
            render();
          }
        })
      } 
    })
  }

  // 功能2：添加模态框
  $('.content .btn').click(function(){
    $('#addModal').modal('show');
  })

  //3.实现表单校验
  $('#form').bootstrapValidator({
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 字段列表
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  });

  //4.注册表单校验成功事件，阻止submit默认的提交，通过ajax提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    //通过ajax提交
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$('#form').serialize(),
      dataType:"json",
      success: function( info ){
        console.log( info );
        if( info.success){
          //添加成功  关闭模态框
          $('#addModal').modal('hide');
          //重新渲染第一页
          currentpage = 1;
          render();

          // 重置表单的内容和状态
          $('#form').data("bootstrapValidator").resetForm( true );
        }
      }
    })
  })

})