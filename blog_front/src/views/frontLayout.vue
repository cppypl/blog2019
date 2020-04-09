<template>
	<div class="home">
		<div id="sidebar" class="sidebar">
			<header class="site-header" role="banner">
				<h1 class="logo">
					<router-link to="/">彭 磊</router-link>
				</h1>
				<p class="site-description">心之所向，行之所至</p>
			</header>
			<nav id="site-navigation" class="main-navigation" role="navigation">
				<ul class="navMenu">
		
					<router-link to="/" tag="li" :class="$route.path=='/'?'active':''">我的博客</router-link>
					<router-link to="/about" tag="li" :class="$route.path=='/about'?'active':''">关于我们</router-link>
					<router-link to="/admin" tag="li" v-if="token" class="mt">管理后台</router-link>
					<router-link to="/login" tag="li" v-else class="mt">登录</router-link>
				</ul>
			</nav>
		</div>
		<keep-alive include="home">
			<router-view ></router-view>
		</keep-alive>
	</div>
</template>
<script>
export default {

	name: "frontLayout",

	data() {
		return {

			token: localStorage.getItem('token'),

		}
	},

	methods: {
		
	},
	created() {
	}

}

</script>

<style lang="less" >
.goAdmin {
	color: #fff;
	position: absolute;
	bottom: 40px;
	left: 60px;
}
.home {
	width: 100%;
	height: 100%;
	display: flex;
}
.logo a {
	font-size: 22px;
	color: #fff;
}
.sidebar {
	background: #007fff;
	color: #fff;
	width: 300px;
	height: 100%;
	// padding: 0 60px;
}
nav li {
	padding: 20px 60px;
	cursor: pointer;
	&:hover {
		background-color: #0071e4;
	}
	&.active {
	background-color: #0054a9;
}

}
.site-header {
	margin: 20% 0;
	padding: 0 60px;
}

.main-navigation {
	font-size: 12px;
	font-size: 1.2rem;
}


.rightContent {
	background: #eee;
	padding: 30px;
	flex: 1;
	overflow-y: auto;
	article {
		padding: 30px;
		background: #fff;
		margin-bottom: 30px;
		border-radius: 4px;
		cursor: pointer;
		&:hover {
			box-shadow: 2px 5px 10px #ccc;
			header{
				text-decoration: underline;
			}
		}
		header {
			font-size: 24px;
			margin-bottom: 10px;
			color: #007fff;
		}
		footer {
			color: #999;
			margin-bottom: 20px;
			span {
				margin-right: 20px;
			}
		}
		.content {
			font-size: 16px;
			line-height: 30px;
			color: #666;
		}
	}
}
.mt{
	margin-top: 40px;
}
</style>