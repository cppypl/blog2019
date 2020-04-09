const router = require('koa-router')()
const jsonwebtoken=require('jsonwebtoken')
let ObjectId = require('mongodb').ObjectID;
let secret="i am jwt secret"
// router.get('/login',async ctx=>{
    
//     await ctx.render('admin/login',{
//         err:ctx.query.err
//     })
// })


// 接口
router.post('/api/login',async ctx=>{
    let {username,password}=ctx.request.fields
    
    let res=await ctx.db.col('users').findOne({"username":username,"password":password})
    if(!res){
        // ctx.redirect(`/admin/login?err=${encodeURIComponent('没有此账户')}`)
        ctx.body={code:1,msg:'用户名或密码错误',}
        
    }else{
        // ctx.session.user=username
        let userInfo={
            _id:res._id,
            username:res.username,
        }
        ctx.body={code:0,msg:'登录成功',isAdmin:res.isAdmin,result:userInfo,token:jsonwebtoken.sign(
            {
                exp:Math.floor(Date.now() / 1000) + 3600, //1小时过期
                data:{
                    _id: res._id,
                    username:res.username,
                    isAdmin:res.isAdmin
                }
            },
            secret
        )}
        // ctx.redirect('/admin')
    }
})

// 注册
router.post('/api/register', async ctx=>{
    let {username,password}=ctx.request.fields
    let user=await ctx.db.col('users').findOne({'username':username})
    console.log(user);
    
    if(!user){
        // ctx.body={code:1,msg:'用户名或密码错误',}
        let newUser=await ctx.db.col('users').insertOne({"username":username,"password":password,"isAdmin":false})
        let userInfo={
            _id:newUser.insertedId,
            username,
        }
        ctx.body={code:0,msg:'注册成功',result:userInfo,token:jsonwebtoken.sign(
            {
                data:{
                    _id:newUser.insertedId,
                    username,
                    isAdmin:false
                },
                exp:Math.floor(Date.now()/1000)+3600
            },
            secret
        )}
    }else{
        ctx.body={code:1,msg:'此账户已存在',}
    }
})
//获取详情
router.get('/api/getDetail',async ctx=>{
    let {id}= ctx.query
    
    if(id){
        let res=await ctx.db.col('list').findOneAndUpdate({'_id':ObjectId(id)},{$inc:{views:1}})


        ctx.body={code:0,msg:'成功',result:res.value}
        
    }
    // let {username,password}=ctx.request.fields
    
    // let res=await ctx.db.col('users').find({"username":username}).toArray()
    // console.log(res);
    // if(!res.length){
    //     // ctx.redirect(`/admin/login?err=${encodeURIComponent('没有此账户')}`)
    //     ctx.body={code:1,msg:'没有此账户',}
        
    // }else{
    //     if(res[0].password!=password){
    //         ctx.body={code:1,msg:'用户名或密码错误'}
    //         // ctx.redirect(`/admin/login?err=${encodeURIComponent('用户名或密码错误')}`)
            
    //     }else{
    //         ctx.session['user']=res[0]
    //         ctx.body={code:0,msg:'登录成功',res:res[0]}
    //         // ctx.redirect('/admin')
    //     }
    // }
})

// 获取列表
router.get('/api/blogList', async ctx=>{
    let {pageNo,pageSize,type}= ctx.query
    let condition={
        isDelete:false
    }
    if(type)  condition.type=type
    
    let total=await ctx.db.col('list').find(condition).count()
    let res=await ctx.db.col('list').find(condition,{"isDelete":0}).skip((pageNo-1)*pageSize).limit(parseInt(pageSize)).sort({"time":-1}).toArray()
    ctx.body={code:0,msg:"成功",result:res,pagination:{
        pageNo,
        pageSize,
        total

    }}
})
// 添加博客
router.post('/api/addBlog', async ctx=>{

    let {title,content,type,descript}=ctx.request.fields
    let res=await ctx.db.col('list').insertOne({
        title,
        content,
        descript,
        type,
        hotCount:1,
        isDelete:false,
        time:new Date().getTime()
    })
    if(res.result.ok){
        ctx.body={code:0,msg:"添加成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
    
    
})
// 修改博客
router.post('/api/editBlog', async ctx=>{

    let {id,title,content,type,descript}=ctx.request.fields
    let res=await ctx.db.col('list').update({'_id':ObjectId(id)},{
        title,
        content,
        type,
        isDelete:false,
        descript,
        time:new Date().getTime()
    })
    console.log(res.result);
    if(res.result.ok){
        ctx.body={code:0,msg:"修改成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
    
    
})
//删除博客
router.delete('/api/deleteBlog',async ctx=>{
    
    let {id}=ctx.query
    let res =await ctx.db.col('list').updateOne({"_id":ObjectId(id)},{$set:{isDelete:true}})
    console.log(161,res.result);
    
    if(res.result.ok===1){
        ctx.body={code:0,msg:"删除成功"}
    }else{
        ctx.body={code:1,msg:"删除失败"}
        
    }
})

//获取分类列表
router.get('/api/getType', async ctx=>{

    let res =await ctx.db.col('type').find().toArray()

    ctx.body={code:0,msg:"成功",result:res}
    

})

//添加分类
router.get('/api/addType', async ctx=>{
    let {name}=ctx.query
    let res =await ctx.db.col('type').insertOne({name})

    console.log(res);
    if(res.result.ok){
        ctx.body={code:0,msg:"添加成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
})

//修改分类
router.post('/api/editType', async ctx=>{
    let {id,name}=ctx.request.fields
    let res =await ctx.db.col('type').update({'_id':ObjectId(id)},{name})

    console.log(res);
    if(res.result.ok){
        ctx.body={code:0,msg:"修改成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
})
//获取分类
router.get('/api/getTypeDetail', async ctx=>{
    let {id}=ctx.query
    let res =await ctx.db.col('type').findOne({'_id':ObjectId(id)})

    console.log(res);
    if(res){
        ctx.body={code:0,msg:"成功",result:res}
    }else{
        ctx.body={code:1,msg:"没有找到"}
    }
})

// router.all('*',async (ctx,next)=>{
//     console.log("**********");
    
//     if(ctx.session['user']){
//         await next()
//     }else{
//         ctx.redirect('/admin/login')
//     }
// })
// router.get('/articleList',async ctx=>{
    
//     await ctx.render('admin/articleList')
// })
// router.get('/',async ctx=>{

//         let res = await ctx.db.col('users').find().toArray()
    
//         await ctx.render('admin/index',{
//             arr:res
//         })
   
    
// })





// router.use('/admin',require('./admin'))
// router.use('/vip',require('./vip'))


module.exports=router.routes()