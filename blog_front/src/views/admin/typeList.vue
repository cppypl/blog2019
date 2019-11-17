<template>
  <div>
    <router-link class="addBlog" to="addType" tag="span">添加博客</router-link>
    <table>
      <thead>
        <tr>
          <td>类型</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in listData" :key="item._id">
          <td>{{item.name}}</td>
          <td width="20%">
            <router-link :to="'addType?id='+item._id">修改</router-link>
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
 
  methods:{
    async getList(){
      let result=await fetch(`${this.api.api}admin/api_getType`);
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