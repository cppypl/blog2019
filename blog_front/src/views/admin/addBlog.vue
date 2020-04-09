<template>
	<div>
		<p v-if="$route.query.id">修改博客</p>
		<p v-else>添加博客</p>
		<div class="box">
			<input type="text" name="user" placeholder="标题" v-model="title" />
			<select v-model="chooseType" placeholder="请选择分类">
				<option  v-for="item in typeList" :value="item.name" :key="item._id">{{item.name}}</option>
			</select>

			<textarea name id cols="30" rows="10" placeholder="描述" v-model="descript" class="descript"></textarea>
			<!-- <textarea name id cols="30" rows="10" placeholder="内容" v-model="content"></textarea> -->
			<quill-editor
				v-model="content"
				ref="myQuillEditor"
				:options="editorOption"
				class="ql-editor"
				@blur="onEditorBlur($event)"
				@focus="onEditorFocus($event)"
				@ready="onEditorReady($event)"
			></quill-editor>
			<div @click="edit" class="btn" v-if="$route.query.id">修改</div>
			<div @click="submit" class="btn" v-else>提交</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>

import hljs from 'highlight.js'

export default {
	data() {
		return {
			title: "",
			descript: "",
			chooseType: "",
			typeList: [],
			content: '',
			editorOption: {
				// some quill options

				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'],
						['blockquote', 'code-block'],
						[{ 'header': 1 }, { 'header': 2 }],
						[{ 'list': 'ordered' }, { 'list': 'bullet' }],
						[{ 'script': 'sub' }, { 'script': 'super' }],
						[{ 'indent': '-1' }, { 'indent': '+1' }],
						[{ 'direction': 'rtl' }],
						[{ 'size': ['small', 'medium', 'large', 'huge', 'false'] }],
						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
						[{ 'font': [] }],
						[{ 'color': [] }, { 'background': [] }],
						[{ 'align': [] }],
						['clean'],
						['link', 'image', 'video']
					],
					syntax: {
						highlight: text => {
							return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
						}
					}
				}
			},

		}
	},


	methods: {
		onEditorBlur(quill) {
			console.log('editor blur!', quill)
		},
		onEditorFocus(quill) {
			console.log('editor focus!', quill)
		},
		onEditorReady(quill) {
			console.log('editor ready!', quill)
		},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text)
			this.content = html
		},
		async submit() {
			let result = await this.$axios.post(`admin/api/addBlog`, {
				title: this.title,
				type: this.chooseType,
				descript: this.descript,
				content: this.content
			})
			this.$message.success(result.data.msg)
			this.$router.go(-1)
		},
		async edit() {
			let result = await this.$axios.post(`admin/api/editBlog`, {
				id: this.$route.query.id,
				title: this.title,
				type: this.chooseType,
				descript: this.descript,
				content: this.content
			})
			this.$message.success(result.data.msg)
			this.$router.go(-1)

		},

	},
	
	async created() {

		let typeList = await this.$axios(`admin/api/getType`)
		this.typeList = typeList.data.result

		if (this.$route.query.id) {
			let result = await this.$axios(`admin/api/getDetail?id=${this.$route.query.id}`)
			this.title = result.data.result.title;
			this.content = result.data.result.content;
			this.descript = result.data.result.descript;
			this.chooseType = result.data.result.type;
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
	.descript {
		height: 60px;
	}
}
</style>