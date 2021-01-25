//头像
function getUserInfo() {
  axios.get('/my/userinfo').then((res) => {
    if (res.data.status !== 0) {
      return layer.msg('获取用户信息失败')
    }
    avatarAndName(res.data)
  })
}
getUserInfo()
function avatarAndName(res) {
  let name = res.data.nickname || res.data.username
  $('#welcome').text('欢迎 ' + name)
  if (res.data.user_pic) {
    $('.text_avataar').hide()
    $('.layui-nav-img').attr('src', res.data.user_pic).show()
  } else {
    $('.layui-nav-img').hide()
    $('.text_avataar').text(name[0].toUpperCase()).show()
  }
}
//退出功能
$('#logoutBtn').on('click', function () {
  layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
    //do something
    localStorage.removeItem('token')
    location.href = '/home/login.html'
    layer.close(index)
  })
})
