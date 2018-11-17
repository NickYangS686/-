//进度条

// 需求：在页面进行第一个ajax请求时，开启进度条
    // 在所有的ajax请求都回来后，关闭进度条

  $(document).ajaxStart(function(){
    // 第一个ajax发送时调用，开启进度条
    NProgress.start();
  });

  // 当所有的ajax请求结束时，关闭进度条
  $(document).ajaxStop(function(){
    // 延时器，5毫秒后触发
    setTimeout(function(){
      NProgress.done();
    },500)
  })

  //jquery入口函数，等待dom结构加载完成后，就执行
  $(function(){
    // 公共的功能
    // 功能1：点击导航切换功能
    $('.tog').click(function(){
      // 让下一个兄弟显示隐藏
      $(this).next().stop().slideToggle();
    });
    // 功能2：左侧菜单列表切换功能
    $(".topbar .icon-left").click(function(){
      // toggleClass切换类名
      $(".aside").toggleClass("hidemenu");
      $(".main").toggleClass("hidemenu");
      $(".topbar").toggleClass("hidemenu");
    });

    // 功能3：退出功能
    $('.topbar .icon-right').click(function(){
      // 点击按钮，显示模态框
      // $('#model').model("show") 显示
      // $('#model').model("hide") 隐藏
      $('myModal').modal("show");
    });

    // 模态框的按钮点击事件
    $('#outbtn').click(function(){
      // 发送ajax请求，让后台销毁当前用户的登录状态
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function( info ){
          console.log(info);
          if( info.success ){
            // 退出成功
           location.href = "login.html";
          }
        }
      })
    })

  });