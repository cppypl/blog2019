<template>
  <div>
    <router-link class="addBlog" to="addBlog" tag="span">添加博客</router-link>
    <table>
      <thead>
        <tr>
          <td>标题</td>
          <td>添加时间</td>
          <td>类型</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in listData" :key="item._id">
          <td>{{item.title}}</td>
          <td>{{item.time | formatTime}}</td>
          <td>{{item.type}}</td>
          <td width="20%">
            <router-link :to="'addBlog?id='+item._id">修改</router-link>
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
  filters:{
    add0(v){
      return v<10?'0'+v:v
    },
    formatTime(timer){
       let date= new Date(timer);
       let y=date.getFullYear();
       let M=date.getMonth()+1;
       let d=date.getDate();
       let h=date.getHours();
       let m=date.getMinutes();
       
       return `${y}-${M<10?'0'+M:M}-${d<10?'0'+d:d} ${h<10?'0'+h:h}:${m<10?'0'+m:m}`
    }
  },
  methods:{
    async getList(){
      let result=await fetch(`${this.api.api}admin/api_blogList`);
      let res =await result.json()
      this.listData=res
      
    }
  },
  created(){
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
  }
  thead {
    td {
      background: #eee;
    }
  }
  
}
.addBlog{
  background: #f60;
  color: #fff;
  padding: 10px;
  display: inline-block;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>