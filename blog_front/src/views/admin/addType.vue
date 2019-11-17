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
  data(){
    return{
      name:"",
      content:""
    }
  },
  methods:{
    async submit(){
      console.log(this.name);
      let result = await fetch(`${this.api.api}admin/api_addType?name=${this.name}`)
      let res=await result.json()
      console.log(res);
      
       alert(res.msg)
      
    },
    async edit(){
      let result = await fetch(`${this.api.api}admin/api_editType?name=${this.name}`,{
        method:"POST",
        body:JSON.stringify({
          id:this.$route.query.id,
          name:this.name
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
    if(this.$route.query.id){
      let result=await fetch(`${this.api.api}admin/api_getTypeDetail?id=${this.$route.query.id}`)
      let res= await result.json()
      console.log(res);
      this.name=res.name;
      
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