var express = require('express');
var router = express.Router();

function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') +
    '"}'
  )
}

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  res.json({
    code: 20000,
    result: userMap[username]
  });
})

router.get("/info", (req, res, next) => {
  const {
    token
  } = param2Obj(req.url)
  if (userMap[token]) {
    res.json({
      code: 20000,
      result: userMap[token]
    })
  } else {
    res.json({
      code: 50001,
      result: ''
    })
  }
})

router.post("/logout",(req,res,next)=>{
	res.json({
		code: 20000,
		result: 'success'
	})
})

module.exports = router;
