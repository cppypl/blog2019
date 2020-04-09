const koa = require('koa')
const router = require('koa-router')()
// const koaStatic=require('koa-static')
const path=require('path')
const body=require('koa-better-body')
// const koaSession= require('koa-session')
// const ejs= require('koa-ejs')
const cors= require('koa-cors')
const jsonwebtoken=require('jsonwebtoken')
// const koajwt =require('koa-jwt')
let secret="i am jwt secret"
// 路由
let app=new koa()
app.listen(8000)
console.log('服务运行在8000端口')
app.use(cors({
    // origin: function(ctx) { //设置允许来自指定域名请求
    //     if (ctx.url === '/test') {
    //         return '*'; // 允许来自所有域名请求
    //     }
    //     return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    // },
    // maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    // credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))


// 错误处理
// app.use((ctx, next) => {
//     return next().catch((err) => {
        
//     })
// })

// app.use(koajwt({
// 	secret
// }).unless({
// 	path: ['/admin/api/login','/admin/api/blogList','/admin/api/getType','/admin/getDetail']
// }));
let white=['/admin/api/login','/admin/api/blogList','/admin/api/getType','/admin/api/getDetail','/admin/api/register']
app.use(async (ctx,next)=>{
    // console.log(ctx.header);
    if(white.indexOf(ctx.path)>-1){
        await next()
    }else{
        let token=ctx.header.authorization.split(' ')[1]
        try {
            let result=await jsonwebtoken.verify(token, secret)
            console.log('token',result.data);
            if(result.data.isAdmin){
				await next()
			}else{
				ctx.status = 401;
				ctx.body = {
					code:401,
					msg:'您没有权限访问'
				};
			}
        } catch (error) {
			console.log(63,error);
			
            ctx.status = 401;
      		ctx.body = {
                code:401,
                msg:'token无效'
			};
			
        }
        
    }
})

// // 统一错误处理
app.use(async (ctx,next)=>{
    try {
        await next()
    } catch (err) {
        console.log(81,err);
        
        ctx.status = 500;
        ctx.body = {
            code:500,
            msg:"服务器错误"
        };
    }

})
// 数据库
app.context.db=require('./lib/db')
// // 中间件
// ejs(app,{
//     root:"./template",
//     layout:false,//自己又加了一层，咱不需要
//     viewExt:"html",//扩展名
//     cache:false,//上线后改成true，有缓存

// })
app.use(body({
    uploadDir:'./upload'
}))

// session
// app.keys=['QWERTYUIOPAasdfghjkl:"zxcvbnm<>?','asdfghjkl741852963/8*-:','！@#￥%……&*（）——WSDRFTGYHUJIKL']//越多越好
// app.use(koaSession({
//     key:"pl",
//     maxAge:20*60*1000, //有效期
//     renew:true,//自动续期
// },app))
// app.use(async ctx=>{
    
//     if(!ctx.session.view){
//         ctx.session.view=0
//       }
//       ctx.session.view++
//       console.log(ctx.session);

//       ctx.body=`${ctx.session.view}次来访`
// })








router.use('/admin',require('./routers/admin'))
router.use('',require('./routers/www'))
app.use(router.routes())
// app.use(router.allowMethods())

// 静态文件
// app.use(koaStatic(path.resolve('static')),{
//     maxAge:3600*24*1000
// })
