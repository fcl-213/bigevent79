$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //点击上传
  $('#chooseBtn').on('click', function () {
    $('#file').click()
  })

  //文件域改变事件
  $('#file').on('change', function () {
    let file = this.files[0]
    if (!file) {
      return
    }
    let newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  //点击确定实现上传头像
  $('#sureBtn').on('click', function () {
    let dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    axios
      .post('/my/update/avatar', 'avatar=' + encodeURIComponent(dataURL))
      .then((res) => {
        console.log(res)
        if (res.data.status !== 0) {
          return layer.msg('更新头像失败')
        }
        layer.msg('更新头像成功')
        window.parent.getUserInfo()
      })
  })
})
