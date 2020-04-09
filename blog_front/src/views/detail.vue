<template>
	<main class="rightContent">
		<div class="box">
			<header>{{content.title}}</header>
			<footer class="entry-footer">
				<span class="posted-on">
					发布于
					<time
						class="entry-date published updated"
						datetime="2019-06-02T11:05:24+00:00"
					>{{content.time | formatTime }}</time>
				</span>
				<span class="screen-reader-text">分类 {{content.type}}</span>
				<span>浏览：{{content.views}}</span>
			</footer>
			<div class="content" v-html="content.content"></div>
		</div>
	</main>
</template>
<script>
export default {

	name: "detail",

	data() {
		return {
			typeList: [],
			content: {},
		}
	},
	filters: {
		add0(v) {
			return v < 10 ? '0' + v : v
		},
		formatTime(timer) {
			let date = new Date(timer);
			let y = date.getFullYear();
			let M = date.getMonth() + 1;
			let d = date.getDate();
			let h = date.getHours();
			let m = date.getMinutes();

			return `${y}-${M < 10 ? '0' + M : M}-${d < 10 ? '0' + d : d} ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`
		}
	},
	methods: {
		async getType() {
			//获取分类列表
			let typeList = await this.$axios.get(`admin/api/getType`)

			this.typeList = typeList.data.result

		},
		getCotent() {
			this.$axios.get('/admin/api/getDetail?id=' + this.$route.query.id).then(res => {
				this.content = res.data.result
				console.log(this.content);
				
			})
		}
	},
	created() {
		this.getCotent()
		this.getType()
	}

}

</script>

<style lang="less" scoped>


.rightContent {
	background: #fff;

	.box {
		padding: 50px;
	}
	header {
		font-size: 32px;
		margin-bottom: 30px;
		color: #007fff;
	}
	footer {
		color: #999;
		margin-bottom: 30px;
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
</style>