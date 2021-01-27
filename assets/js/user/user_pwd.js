$(function () {
  //表单校验规则
  let form = layui.form
  form.verify({
    newPwd: function (value) {
      if ($('[name = oldPwd]').val() === value) {
        return '新旧密码不能相同'
      }
    },
    renewPwd: function (value) {
      if ($('[name = newPwd]').val() !== value) {
        return '两次输入的密码不一致'
      }
    },
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  })
  //修改密码
  $('#form').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('/my/updatepwd', data).then((res) => {
      if (res.data.status !== 0) {
        return layer.msg(res.data.message)
      }
      layer.msg('更新密码成功')
      $('#form')[0].reset()
    })
  })
})
