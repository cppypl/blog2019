const router= require('koa-router')()

// router.get('/',async ctx=>{
//     console.time('11');
    
//     let data=await ctx.db.col('list').find().toArray()
//     console.timeEnd('11');
//     ctx.body=data
// })


router.get('/login',async ctx=>{
    await ctx.render('admin/login',{
        test:123
    })
})



router.use('/api/edit',require('./edit'))
module.exports=router.routes()