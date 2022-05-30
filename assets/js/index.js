function getUserInfo(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        success:(res)=>{
            if(res.status !==0) return layer.msg('获取用户失败')
            layer.msg('获取用户信息成功')
            // console.log(res);
            renderAvatar(res.data)
        }
    })
}
// 渲染用户信息
const renderAvatar=(user)=>{
    let uname=user.nickname || user.username
    // 渲染欢迎语
    $('#welcome').html(`欢迎 ${uname}`)
    // 渲染头像
    if(user,user_pic !==null){
        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.text-avatar').html(uname[0].toUpperCase())
    }
}
// 退出登录
$('#btnLogout').click(()=>{
    layer.confirm('是否要退出？',{icon:3,title:'提示'},
        function(index){
        localStorage.removeItem('token')
        location.href='/login.html'
    })
})
getUserInfo()