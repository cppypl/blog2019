const MongoClient = require('mongodb').MongoClient;
class Db {
    constructor(){
        MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true },(err,client)=>{
                console.log('连接数据库成功');
                this.db=client.db('201984')
        })
    }
    col(colName){
        return this.db.collection(colName)
    }
}
module.exports = new Db()
