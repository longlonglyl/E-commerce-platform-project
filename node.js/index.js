const express = require('express') //导入express
const mysql = require('mysql') //导入mysql模块
const app = express() //创建实例

const jwt = require('jsonwebtoken') //jwt的tokn生成包
const expressJWT = require('express-jwt') //jwt的解析token包

//使用插件，不然express不能处理json格式的参数
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = mysql.createPool({ //连接数据库
    host: '127.0.0.1', //数据库的ip地址
    user: 'root', //用户名
    password: 'admin123', //密码
    database: 'goods_info' //数据库名
})

app.listen(80, function () { //启动服务器
    console.log('server is running at http://127.0.0.1');
});

// 响应get请求(test)
app.get('/test', function (req, res) {
    const query = req.query //把发送过去的参数存为一个变量，拼接字符串是对象格式
    res.send({
        status: '成功',
        date: query //把数据响应回去
    })
});

//获取商品信息请求 get 有参数{id： xxx}
app.get('/detail', function (req, res) {
    res.setHeader('Access-control-Allow-Origin', '*') //Cors请求头解决跨域问题，不然访问不到
    const query = req.query //发送过来的参数应该是{id： xxx}
    let info = {}
    //根据发送过来的id在数据库里查信息
    db.query(`select * from detail where id = ${query.id}`, function (err, response) {
        if (err) console.log(err.message);
        info = response
        if (info) {
            res.send({ //如果写在外面的话，会先db.query,再发数据，这样就发的空数据了
                status: 'ok',
                date: {
                    info
                } //把数据响应回去
            })
        } else {
            res.send({ //如果写在外面的话，会先db.query,再发数据，这样就发的空数据了
                status: '数据库中还没有这条数据哦'
            })
        }

    })
})

//检查用户名是否存在的请求,post,有参数{username: xxx}
app.post('/register/checkusername', function (req, res) {
    res.setHeader('Access-control-Allow-Origin', '*')
    let username = req.query.username
    //就算${username}本身是字符串，也要加引号，不然会获取不到数据
    db.query(`select * from users where username = '${username}'`, (err, response) => {
        if (err) {
            console.log('查询失败', err.message);
        }

        if (response.length == 0) {
            res.send({
                status: '该用户名可用',
                data: 1
            })
        } else {
            res.send({
                status: '用户名已存在',
                data: 0
            })
        }

    })
})

const secretKey = '114514_1919810' //生成token需要的密匙，其他请求也会用到，所以放在外面
//注册请求，post 有参数{ username: xxx, password: xxx}
app.post('/register', (req, res) => {
    res.setHeader('Access-control-Allow-Origin', '*')
    let username = req.query.username
    let password = req.query.password
    let avaliable = 1
    db.query(`insert into users (username,password,avaliable)
     values ('${username}','${password}',${avaliable})`, function (err, response) {
        if (err) console.log(err.message)
        //在注册用户的时候，创建一个该用户的购物车列表，里面存放了加入购物车的商品信息
        db.query(`CREATE TABLE goods_info.${username}_car (
            goodsid INT NOT NULL,
            price VARCHAR(45) NOT NULL,
            img VARCHAR(145) NOT NULL,
            title VARCHAR(145) NOT NULL,
            count INT NOT NULL,
            config VARCHAR(145) NOT NULL,
            PRIMARY KEY (goodsid))`,
            function (err, response) {
                if (err) console.log(err.message)
                res.send({
                    status: '注册成功'
                })
            })
    })
})


//登录请求，post 有参数 { username: xxx, password: xxx}
app.post('/login', (req, res) => {
    res.setHeader('Access-control-Allow-Origin', '*')
    let username = req.query.username
    let password = req.query.password
    //拿到用户名和密码以后，在数据库里查找是不是有该用户
    db.query(`select * from users where username = '${username}'`, function (err, response) {
        if (err) {
            res.send({
                status: '不存在该用户'
            })
        }
        //检验密码和用户
        if(response.length > 0) {  //如果不存在该用户的话，就会等于0
            if ( response[0].password === password && response[0].avaliable === 1) {
                //账号和密码正确，生成对应的token发回去
                //生成token字符串，这个字符串可以发送给前端，在操作需要登录权限的请求时把token发回来验证
                const tokenStr = jwt.sign({
                    username: req.query.username
                }, secretKey, {
                    expiresIn: 8 * 3600
                })
                res.send({
                    status: '登录成功',
                    username: username,
                    token: tokenStr
                })
            } else {
                res.send({
                    status: '密码错误',
                })
            }
        } else{
            res.send({
                status: '不存在该用户',
            })
        }
    })
})


//加入购物车请求，post，有参数 { username, goodsid, price, img, title, count}
app.post('/addcar', (req, res) => {
    res.setHeader('Access-control-Allow-Origin', '*')
    //解构对象，从对象中拿到自己想要的同名变量
    let {username,goodsid,price,img,title,count,config} = req.query
    config = String(config)  //发过来的是一个数组，要转换成字符串存储
    if (username && goodsid && price && img && title && count) { //如果发过来的数据是完整的，才加
        db.query(`insert into ${username}_car values (${goodsid},'${price}','${img}','${title}',${count},'${config}');`,
            function (err, response) {
                if (err) console.log(err.message);
                res.send({
                    status: '200',
                })
                console.log(`更改数据库${username}购物车成功`);
            }
        )
    } else {
        res.send({
            status: '201'
        })
        console.log('发送过来的信息不完整，更新数据库失败');
    }
})


// app.use(expressJWT({ secret: secretKey }))
//进入购物车页面以后，向数据库发请求，拿到当前用户的购物车信息
app.get('/mycar',(req,res) => {
    res.setHeader('Access-control-Allow-Origin', '*')
    let tokenStr = req.query.token
    let username = req.query.username
    if(tokenStr) {
        db.query(`select * from ${username}_car`,function(err,response) {
            if (err) console.log(err.message);
            res.send({
                status: '200',
                data: response
            })
        })
    }
})


app.post('/mycar/delete',(req,res) => {
    res.setHeader('Access-control-Allow-Origin', '*')
    let goodsid = req.query.goodsid
    if(goodsid) {
        db.query(`DELETE FROM goods_info.test_car WHERE goodsid = ${goodsid}`,(err,response)=> {
            if(err) console.log(err.message);
            res.send({
                status: '200'
            })
        })
    }
})