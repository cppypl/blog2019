<template>
  <div>
    <p v-if="$route.query.id">修改博客</p>
    <p v-else>添加博客</p>
    <div class="box">
      <input type="text" name="user" placeholder="标题" v-model="title" />
      <select v-model="chooseType"  >
        <option value="" v-for="item in typeList" :value="item.name">{{item.name}}</option>
      </select>
      
      <textarea name="" id="" cols="30" rows="10" placeholder="内容" v-model="content"></textarea>
      <div @click="edit" class="btn" v-if="$route.query.id">修改</div>
      <div @click="submit" class="btn" v-else>提交</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return{
      title:"",
      content:"",
      chooseType:"",
      typeList:[]
    }
  },
  methods:{
    async submit(){
      console.log(this.title);
      console.log(this.content);
      let result = await fetch(`${this.api.api}admin/api_addBlog`,{
        method:"POST",
        body:JSON.stringify({
          title:this.title,
          type:this.chooseType,
          content:this.content
        }),
        headers: {
          'content-type': 'application/json'
        },
      })
      let res=await result.json()
      console.log(res);
      
       alert(res.msg)
      
    },
    async edit(){
      console.log(this.title);
      console.log(this.content);
      let result = await fetch(`${this.api.api}admin/api_editBlog`,{
        method:"POST",
        body:JSON.stringify({
          id:this.$route.query.id,
          title:this.title,
          type:this.chooseType,
          content:this.content
        }),
        headers: {
          'content-type': 'application/json'
        },
      })
      let res=await result.json()
      console.log(res);
      
       alert(res.msg)
      
    },
    
  },
  async created(){

    let typeList=await fetch(`${this.api.api}admin/api_getType`)
    this.typeList=await typeList.json()
    
    if(this.$route.query.id){
      let result=await fetch(`${this.api.api}admin/getDetail?id=${this.$route.query.id}`)
      let res= await result.json()
      this.title=res.title;
      this.content=res.content;
      
    }
  }
};
</script>

<style lang="less" scoped>
.box{
  input{ padding: 10px; width: 100%; margin: 20px 0}
  textarea{ padding: 20px; width: 100%; margin: 20px 0;}
  .btn{
  background: #f60;
  color: #fff;
  padding: 10px 20px;
  display: inline-block;
  margin-bottom: 20px;
  cursor: pointer;
}
}
</style>