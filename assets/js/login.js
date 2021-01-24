$(function () {
  // 去注册
  $('#gotoRegi').on('click', function () {
    $('.regiBox').show()
    $('.loginBox').hide()
  })
  // 去登录
  $('#gotoLogin').on('click', function () {
    $('.regiBox').hide()
    $('.loginBox').show()
  })
  //表单自定义校验规则
  let form = layui.form
  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    //两次密码一致
    repass: function (value) {
      if ($('.regiBox [name=password]').val() !== value) {
        return '两次密码不一致'
      }
    },
  })
  //登录ajax
  $('.loginBox .layui-form').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('/api/login', data).then((res) => {
      if (res.data.status !== 0) {
        return layer.msg(res.data.message)
      }
      localStorage.setItem('token', res.data.token)
      layer.msg(
        '登陆成功,即将跳转',
        {
          time: 1000,
        },
        function () {
          location.href = '/home/index.html'
        }
      )
    })
  })
  //注册ajax
  $('.regiBox .layui-form').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('/api/reguser', data).then((res) => {
      if (res.data.status !== 0) {
        return layer.msg(res.data.message)
      }
      layer.msg('注册成功,请登录')
      $('#gotoLogin').click()
    })
  })
})
