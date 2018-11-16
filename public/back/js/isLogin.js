// 需求：如果当前用户是未登录的，想要登录到index页面，拦截到登录页
// 因为前后分离的原因，前端不知道当前用户是否登陆过，但是后台知道，
// 需要发送ajax请求询问后台，当前用户的登录状态
$.ajax({
  type:'get',
  url:'/employee/checkRootLogin',
  dataType:"json",
  success:function( info ){
    console.log( info );
    if( info.success ){
        // 用户已登录
        console.log("用户已登录，继续访问")
        
    }
    if( info.error === 400){
      // 证明没有登录
      location.href = "login.html";
    }
  }
});