<template>
	<div class="container">
		<ul class="menu">
			<li
				@click="changeType('-1','')"
				:class="activeIndex==-1 ?'active':''"
			>全部</li>
			<li
				@click="changeType(index,item.name)"
				v-for="(item,index) in typeList"
				:key="item._id"
				:class="activeIndex==index ?'active':''"
			>{{item.name}}</li>
		</ul>
		<main class="rightContent">
			<router-link
				v-for="item in blogList"
				:key="item._id"
				:to="`/detail?id=${item._id}`"
				tag="article"
			>
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
					<span>浏览：{{item.views}}</span>
				</footer>
				<p class="content">{{item.descript}}...</p>
			</router-link>

			<el-pagination
				background
				hide-on-single-page
				layout="prev, pager, next"
				:total="pageData.total"
				@current-change="change"
			></el-pagination>
		</main>
	</div>
</template>
<script>
export default {

	name: "home",

	data() {
		return {

			blogList: [],
			typeList: [],
			type: '',
			activeIndex: -1,
			token: localStorage.getItem('token'),
			pageData: {
				pageNo: 1,
				pageSize: 10,
				total: 0
			}
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
		change(page) {
			this.pageData.pageNo = page
			this.getList()
		},
		async getList() {
			//获取博客列表
			let blogList = await this.$axios.get(`admin/api/blogList`, {
				params: {
					pageNo: this.pageData.pageNo,
					pageSize: this.pageData.pageSize,
					type: this.type || ''
				}
			})
			this.blogList = blogList.data.result
			this.pageData = blogList.data.pagination
			window.scrollTo(0, 0)

		},

		changeType(index, type) {
			this.activeIndex = index;
			this.type = type
			this.getList()
		},

		async getType() {
			//获取分类列表
			let typeList = await this.$axios.get(`admin/api/getType`)

			this.typeList = typeList.data.result

		}

	},

	async created() {
		await this.getList()
		await this.getType()
	}

}

</script>

<style lang="less" scoped>
.container{
	flex:1;
	overflow-y: auto;
}
.menu {
	background: #fff;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
	padding: 20px 40px;
	width: 100%;
	top: 0;
	display: flex;
	li{
		margin-right: 20px;
		cursor: pointer;
		color: #666;
		&.active{
			color: #007fff;
			text-decoration: underline;
		}
	}
}
</style>