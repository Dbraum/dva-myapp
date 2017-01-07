var express = require('express');
var Mock = require('mockjs');
var router = express.Router();

//init user data
var usersListData = Mock.mock(require('../../mock/users'))


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.info(req.body)
  const {page={}} = req.body

  const pageSize = page.pageSize || 20
  const currentPage = page.page || 1

  let data
  let newPage

  let newData = usersListData.data.concat()

  if (page.field) {
    const d = newData.filter(function(item) {
      return item[page.field].indexOf(decodeURI(page.keyword)) > -1
    })

    data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    newPage = {
      current: currentPage * 1,
      total: d.length
    }
  } else {
    data = usersListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    usersListData.page.current = currentPage * 1
    newPage = {
      current: usersListData.page.current,
      total: usersListData.page.total
    }
  }
  res.json({
    success: true,
    data,
    page: newPage
  })
});

module.exports = router;
