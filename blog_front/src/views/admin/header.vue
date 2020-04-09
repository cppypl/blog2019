<template>
    <div style="height:100%">
        <header><router-link to="/" style="float:right">回首页</router-link>管理后台</header>
        <main>
            <div class="left">
                <ul>
                    <router-link to="/admin/list" tag="li">博客列表</router-link>
                    <router-link to="/admin/type" tag="li">博客分类</router-link>
                    <!-- <router-link to="/admin/my" tag="li">我的简介</router-link> -->
                </ul>
            </div>

            <router-view class="right"></router-view>
        </main>
    </div>
</template>
<style lang="less" scoped>
header {
    background: #fff;
    padding: 20px;
    height: 60px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    z-index: 11;
    position: absolute;
    top: 0;
    width: 100%;
}
main {
    background: #f5f5f5;
    height: 100%;
    padding-top: 60px;
}
.left {
    padding-top: 40px;
    width: 200px;
    float: left;
    background: #4f75bc;
    height: 100%;
    li {
        width: 100%;
        padding: 20px 0;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        &:hover {
            background: #3c63ad;
        }
    }
}
.right {
    margin: 40px 40px 40px 240px;
    padding: 40px;
    background: #fff;
}
.router-link-exact-active {
    background: #3c63ad;
}
</style>