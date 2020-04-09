<template>
	<div class="bg">
		<div class="box">
			<p>登录</p>
			<input type="text" id="username" placeholder="用户名" v-model="username" />
			<br />
			<input type="password" id="password" placeholder="密码" v-model="password" />
			<br />
			<button id="login" @click="login">登录</button>

			<button id="reg" @click="reg">注册</button>
		</div>
	</div>
</template>
<script>
export default {

	data() {
		return {
			username: "",
			password: "",
		}
	},
	methods: {

		login() {
			this.$axios.post('admin/api/login', {
				username: this.username,
				password: this.password
			}).then(res => {
				if (!res.data.code) {
					localStorage.setItem('token', res.data.token)
					localStorage.setItem('userinfo', JSON.stringify(res.data.result))
					let pathUrl = this.$route.query.redirect || '/'
					this.$router.push(pathUrl)
				}else{
					this.$message.error(res.data.msg)
				}
			})
		},
		reg() {
			this.$axios.post('admin/api/register', {
				username: this.username,
				password: this.password
			}).then(res => {
				if (!res.data.code) {
					localStorage.setItem('token', res.data.token)
					localStorage.setItem('userinfo', JSON.stringify(res.data.result))
					this.$message('注册成功')
					this.$router.push('/')
				}else{
					this.$message.error(res.data.msg)
				}
			})
		}
	}
};
</script>
<style lang="less" scoped>
.bg {
	background: #999;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.box {
	width: 400px;
	padding: 20px;
	background: #fff;
}
.box p {
	font-size: 24px;
	text-align: center;
	padding-bottom: 20px;
}
.box input {
	height: 50px;
	border: 1px #ddd solid;
	padding: 10px;
	margin-bottom: 20px;
	width: 100%;
	font-size: 18px;
}
.box button {
	width: 100%;
	font-size: 16px;
	margin-bottom: 20px;
	height: 50px;
	border: none;
	background: #f60;
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
}
.box button:last-child {
	background: none;
	color: #f60;
	border: 1px #f60 solid;
}
</style>