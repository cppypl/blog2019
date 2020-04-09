<template>
	<div>
		<router-link class="addBlog" to="addBlog" tag="span">添加博客</router-link>
		<table>
			<thead>
				<tr>
					<td>标题</td>
					<td>添加时间</td>
					<td>类型</td>
					<td align="center">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item) in listData" :key="item._id">
					<td>
						<router-link :to="{path:'/detail',query:{id:item._id}}" class="a">{{item.title}}</router-link>
					</td>
					<td>{{item.time | formatTime}}</td>
					<td>{{item.type}}</td>
					<td width="20%" align="right">
						<router-link :to="'addBlog?id='+item._id" class="a">修改</router-link>
						<el-popconfirm @onConfirm="deleteThis(item._id)" title="确认要删除吗？">
							<a slot="reference" style="margin-left:20px" href="javascript:" class="a">删除</a>
						</el-popconfirm>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			listData: []
		};
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
		async deleteThis(id) {
			let res = await this.$axios.delete('/admin/api/deleteBlog?id=' + id)
			if (!res.data.code) {
				this.$message.success(res.data.msg)
				this.getList()
			}
		},
		getList() {
			this.$axios('/admin/api/blogList').then(res => {
				this.listData = res.data.result
			});

		}
	},
	created() {
		this.getList()
	}
};
</script>
<style lang="less" scoped>
table {
	border: 1px #ddd solid;
	border-collapse: collapse;
	width: 100%;
	td {
		padding: 10px;
		.a {
			color: #4f75bc;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	thead {
		td {
			background: #eee;
		}
	}
}
.addBlog {
	background: #f60;
	color: #fff;
	padding: 10px;
	display: inline-block;
	margin-bottom: 20px;
	cursor: pointer;
}
</style>