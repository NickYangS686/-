$(function(){

  // 1.一进入页面，请求左侧一级分类数据，进行渲染
    $.ajax({
      type:"get",
      url:"/category/queryTopCategory",
      dataType:"json",
      success:function( info ){
        console.log(info);
        var htmlStr = template("category_left_tpl", info );
        $('.category_left ul').html( htmlStr );
        // 根据返回回来的第一个 一级分类的id 进行渲染
        renderById( info.rows[0].id);
      }
    })

  //2.给左侧添加点击事件，通过事件委托来实现
  $('.category_left ul').on('click','a',function(){
    // 添加高亮效果
    $(this).addClass("current").parent().siblings().find('a').removeClass("current");
    // 获取到点击的一级分类的id
    var id = $(this).data("id");
    // 根据拿到的id  进行二级页面渲染
    renderById(id);
  })

  // 根据一级分类的id 渲染二级分类
  function renderById( id ){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function( info ){
        console.log(info);
        var htmlStr = template("category_right_tpl",info);
        $('.category_right ul').html( htmlStr );
      }
    })
  }


});