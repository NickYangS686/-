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
    },1500)
  })