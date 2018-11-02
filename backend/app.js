let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let session = require('express-session')
let router = require('./routes/router')

let port = process.env.PORT || 9999
let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  session({
    secret: 'fuckupig',
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true
  })
)

app.use(function(req, res, next) {
  //设置跨域访问
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method == 'OPTIONS') {
    res.send(200) /*让options请求快速返回*/
  } else {
    next()
  }
})

app.use(router)


// app.use(logErrors);
// app.use(clientErrorHandler);
// app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    return res.status(500).send({ error: 'Something blew up!' })
  } else {
    next(err)
  }
}

function errorHandler(err, req, res, next) {
  res.status(500)
  return res.render('error', { error: err })
}

app.listen(port, () => {
  console.log(`devServer start on port:${port}`)
})

process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});