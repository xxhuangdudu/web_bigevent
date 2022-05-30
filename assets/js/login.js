$(function(){
    // 点击去注册账号让 登录框隐藏，注册框显示
    $('#link_reg').click(()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录让 注册框隐藏，登录框显示
    $('#link_login').click(()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 引入form模块
    const form=layui.form
     // 获取 layui 弹窗
    const layer = layui.layer
    // 设置请求根路径
    // const baseUrl = "http://www.liulongbin.top:3007"
    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 确认密码校验规则
        repwd:(value)=>{
            const pwd=$('#form_reg [name=password]').val()
            if(pwd!==value)return'两次密码不一致'
        }
    })
    $('#form_reg').on('submit',(e)=>{
        e.preventDefault();
        $.ajax({ 
            type:'POST',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            },
        })
    })
    // 登入功能
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status !==0)return layer.msg('登录失败')
                layer.msg('登录成功')
                // 登录成功后需要吧token 令牌存放在本地
                localStorage.setItem('token',res.token)
                // 跳转页面
                location.href='/index.html'
            }
        })
    })
})