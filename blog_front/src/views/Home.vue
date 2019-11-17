<template>
    <div class="home">
        <div id="sidebar" class="sidebar" style="position: fixed;">
            <header class="site-header" role="banner">
                <h1 class="logo">
                    <a href="#" rel="home">MiloPeng</a>
                </h1>
                <p class="site-description">大前端行业的小学生</p>
            </header>
            <nav id="site-navigation" class="main-navigation" role="navigation">
                <ul id="menu-%e9%a1%b6%e9%83%a8%e8%8f%9c%e5%8d%95" class="nav-menu">
                    <li v-for="item in typeList">{{item.name}}</li>
                </ul>
            </nav>
        </div>

        <main class="rightContent">
            <article v-for="item in blogList">
                <header>{{item.title}}</header>
                <footer class="entry-footer">
                    <span class="posted-on">
                        发布于
                        <time
                            class="entry-date published updated"
                            datetime="2019-06-02T11:05:24+00:00"
                        >{{item.time | formatTime }}</time>
                    </span>
                    <span class="screen-reader-text">分类 {{item.type}}</span> 
                    <span>热度：75</span>
                </footer>
                <p class="content">{{item.content}}</p>
            </article>
        </main>
    </div>
</template>
<script>
export default {

    name: "home",

    data() {
        return {

            blogList: [],
            typeList: []
        }
    },
      filters:{
    add0(v){
      return v<10?'0'+v:v
    },
    formatTime(timer){
       let date= new Date(timer);
       let y=date.getFullYear();
       let M=date.getMonth()+1;
       let d=date.getDate();
       let h=date.getHours();
       let m=date.getMinutes();
       
       return `${y}-${M<10?'0'+M:M}-${d<10?'0'+d:d} ${h<10?'0'+h:h}:${m<10?'0'+m:m}`
    }
  },
    methods: {

    },
    async created() {
        //获取分类列表
        let typeList = await fetch(`${this.api.api}admin/api_getType`)
        this.typeList = await typeList.json()

        //获取博客列表
        let blogList = await fetch(`${this.api.api}admin/api_blogList`)
        this.blogList = await blogList.json()


    }

}

</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
}
.logo a{ font-size: 22px; color:  #fff; }
.sidebar {
    position: fixed;
    left: 0;
    background: #007fff;
    color: #fff;
    width: 300px;
    height: 100%;
    padding: 0 60px;
}
nav li{
    margin-bottom: 20px
}
.site-header {
    margin: 20% 0;
}

.main-navigation {
    font-size: 12px;
    font-size: 1.2rem;
}
.rightContent {
    background: #eee;
    padding: 60px;
    // max-width: 820px;
    margin-left: 300px;
    article {
        padding: 50px;
        background: #fff;
        margin-bottom: 50px;
        border-radius: 4px;
        &:hover{box-shadow: 0 0 10px rgba(0, 0, 0,0.1);}
        header{font-size: 32px; margin-bottom: 30px; color: #007fff}
        footer{
            color: #999;
            margin-bottom: 30px;
            span{margin-right: 20px;}
        }
        .content{
            font-size: 16px;
            line-height: 30px;
            color: #666
        }
    }
}
</style>