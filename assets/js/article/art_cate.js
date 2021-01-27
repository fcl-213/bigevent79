$(function () {
  let form = layui.form
  function getArtCate() {
    axios.get('/my/article/cates').then((res) => {
      let htmlStr = template('trTpl', res.data)
      $('tbody').html(htmlStr)
    })
  }
  getArtCate()
  //添加分类弹出框
  let index
  $('#addBtn').on('click', function () {
    index = layer.open({
      type: 1,
      title: '添加文章分类',
      area: '500px',
      content: $('#addFormTpl').html(),
    })
    //拿到的index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数。
  })
  //确认添加分类
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('/my/article/addcates', data).then((res) => {
      console.log(res)
      if (res.data.status !== 0) {
        return layer.msg('新增文章分类失败')
      }
      layer.close(index)
      getArtCate()
      layer.msg('新增文章分类成功')
    })
  })
  //编辑弹出框
  let editIndex
  $('tbody').on('click', '.editBtn', function () {
    editIndex = layer.open({
      type: 1,
      title: '编辑分类信息',
      area: '500px',
      content: $('#editFormTpl').html(),
    })
    let id = $(this).attr('data-id')
    axios.get('/my/article/cates/' + id).then((res) => {
      console.log(res)
      form.val('editForm', res.data.data)
    })
  })
  //确认编辑
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('/my/article/updatecate', data).then((res) => {
      console.log(res)
      if (res.data.status !== 0) {
        return layer.msg('更新失败')
      }
      layer.close(editIndex)
      getArtCate()
      layer.msg('更新成功')
    })
  })
  //删除
  $('body').on('click', '.delBtn', function () {
    let id = $(this).attr('data-id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      axios.get('/my/article/deletecate/' + id).then((res) => {
        console.log(res)
        if (res.data.status !== 0) {
          return layer.msg('删除文章分类失败')
        }
        getArtCate()
        layer.msg('删除文章分类成功')
      })
      layer.close(index)
    })
  })
})
