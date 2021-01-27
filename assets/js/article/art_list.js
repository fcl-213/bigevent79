$(function () {
  let form = layui.form
  let laypage = layui.laypage
  //定义查询参数
  const query = {
    pagenum: 1, // 是	int	页码值
    pagesize: 2, // 是	int	每页显示多少条数据
    cate_id: '', // "" 所有的文章分类 否	string	文章分类的 Id
    state: '', // "" 所有状态 文章状态  可选值有：已发布、草稿
  }
  template.defaults.imports.formatTime = function (time) {
    let d = new Date(time)
    let y = d.getFullYear().toString().padStart()
    let m = (d.getMonth() + 1).toString().padStart()
    let day = d.getDate().toString().padStart()
    let hours = d.getHours().toString().padStart()
    let min = d.getMinutes().toString().padStart()
    let s = d.getSeconds().toString().padStart()
    return `${y}/${m}/${day} ${hours}:${min}:${s}`
  }
  getArtList()
  function getArtList() {
    axios
      .get('/my/article/list', {
        params: query,
      })
      .then((res) => {
        console.log(res)
        let htmlStr = template('trTpl', res.data)
        $('tbody').html(htmlStr)
        //处理分页
        renderPage(res.data.total)
      })
  }
  //分页处理函数
  function renderPage(total) {
    laypage.render({
      elem: 'pagebox',
      count: total,
      curr: query.pagenum,
      limit: query.pagesize,
      limits: [2, 3, 5, 8, 10],
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        console.log(obj.curr) //得到当前页，以便向服务端请求对应页的数据。
        query.pagesize = obj.limit
        query.pagenum = obj.curr
        if (!first) {
          getArtList()
          //do something
        }
      },
    })
  }
  // 获取分类数据
  axios.get('/my/article/cates').then((res) => {
    // 动态创建option添加到下拉框中
    res.data.data.forEach(function (item) {
      $(`<option value="${item.Id}">${item.name}</option>`).appendTo(
        $('#cateSelect')
      )
    })
    // 当option创建添加到下拉框之后，手动更新form表单全部内容
    form.render()
  })
  // 实现筛选功能
  $('#form').on('submit', function (e) {
    e.preventDefault()
    query.cate_id = $('#cateSelect').val()
    query.state = $('#stateSelect').val()
    query.pagenum = 1
    getArtList()
  })
  //实现删除功能
  $('body').on('click', '.delBtn', function () {
    let id = $(this).attr('data-id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      query.pagenum = $('.delBtn').length === 1 ? 1 : query.pagenum - 1
      axios.get('/my/article/delete/' + id).then((res) => {
        console.log(res)
        if (res.data.status !== 0) {
          return layer.msg('删除文章失败')
        }
        getArtList()
        layer.msg('删除文章成功')
      })
      layer.close(index)
    })
  })
  //编辑
  $('body').on('click', '.editBtn', function () {
    location.href = '/article/art_edit.html?id=' + $(this).attr('data-id')
  })
})
