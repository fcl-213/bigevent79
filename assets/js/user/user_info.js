$(function () {
  let form = layui.form
  getUserInfo()
  //表单校验
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度需要在1-6个字符'
      }
    },
  })
  //修改和重置
  function getUserInfo() {
    axios.get('/my/userinfo').then((res) => {
      //给表单赋值
      form.val('form', res.data.data)
    })
  }
  //修改
  $('#form').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('/my/userinfo', data).then((res) => {
      if (res.data.status !== 0) {
        return layer.msg('更新用户信息失败')
      }
      layer.msg('更新用户信息成功')
      window.parent.getUserInfo()
    })
    getUserInfo()
  })
  //重置
  $('#resetBtn').on('click', function (e) {
    e.preventDefault()
    getUserInfo()
  })
})
