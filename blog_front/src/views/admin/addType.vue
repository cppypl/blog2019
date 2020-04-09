<template>
	<div>
		<p v-if="$route.query.id">修改类型</p>
		<p v-else>添加类型</p>
		<div class="box">
			<input type="text" placeholder="类型名称" v-model="name" />
			<div @click="edit" class="btn" v-if="$route.query.id">修改</div>
			<div @click="submit" class="btn" v-else>提交</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {
			name: "",
			content: ""
		}
	},
	methods: {
		async submit() {
			console.log(this.name);
			let result = this.$axios(`admin/api/addType?name=${this.name}`)
			let res = await result.json()
			console.log(res);

			alert(res.msg)

		},
		async edit() {
			let result = await this.$axios.post(`admin/api/editType`, {
				id: this.$route.query.id,
				name: this.name
			})
			if (!result.data.code) {
				this.$message.success(result.data.msg)
				this.$router.push('/admin/type')

			}
		},

	},
	async created() {
		if (this.$route.query.id) {
			let result = await this.$axios(`admin/api/getTypeDetail?id=${this.$route.query.id}`)
			this.name = result.data.result.name;

		}
	}
};
</script>

<style lang="less" scoped>
.box {
	input {
		padding: 10px;
		width: 100%;
		margin: 20px 0;
	}
	textarea {
		padding: 20px;
		width: 100%;
		margin: 20px 0;
	}
	.btn {
		background: #f60;
		color: #fff;
		padding: 10px 20px;
		display: inline-block;
		margin-bottom: 20px;
		cursor: pointer;
	}
}
</style>