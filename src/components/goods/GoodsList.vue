<template>
  <div>
    <!-- 1.0 搜索框 & 添加商品按钮 -->
    <my-search
      title="添加商品"
      @myquery="queryGoodsList"
      @myadd="addGoods"
    ></my-search>
    <!-- 2.0 商品列表表格 -->
    <el-table
      :data="goodsList"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="编号"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="价格"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="库存量"
        width="90"
      >
      </el-table-column>
      <el-table-column
        label="商品状态"
        width="90"
      >
        <template slot-scope="scope">
          {{scope.row.goods_state | filterState}}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="160"
      >
        <template slot-scope="scope">
          {{scope.row.add_time | dateFilter}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
      >
        <template slot-scope="scope">
          <el-button
            class="el-icon-edit"
            size="small"
            @click="$router.push({path:'/layout/goods/edit?goods_id='+scope.row.goods_id})"
            type="primary"
            plain
          ></el-button>
          <el-button
            class="el-icon-delete"
            @click="deleteGoods(scope.row.goods_id)"
            size="small"
            type="danger"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 3.0 分页条 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import MySearch from '../subcomponents/MySearch'
export default {
  // 局部注册
  components: {
    'my-search': MySearch
  },
  data() {
    return {
      goodsList: [], //商品列表数组
      query: '', //查询关键字
      pagenum: 1, //页码
      pagesize: 10, //页容量
      total: 0 // 总条数
    }
  },
  filters:{
    /**
     * 过滤器的第一个参数，是 | 前面的原始数据
     */
    filterState(input){
      let state = ''
      switch (input) {
        case 0:
          state = '未通过'
          break
        case 1:
          state = '审核中'
          break
        case 2:
          state = '已审核'
          break
      }

      return state
    }
  },
  created() {
    this.getGoodsListData()
  },
  methods: {
    // 获取商品列表
    getGoodsListData() {
      this.$axios
        .get('goods', {
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: this.query
          }
        })
        .then(res => {
          this.goodsList = res.data.data.goods

          this.total = res.data.data.total
        })
    },
    // 子组件触发了myquery事件之后，会调用该函数
    queryGoodsList(query) {
      //赋值给模型中的query
      this.query = query

      //搜索
      this.getGoodsListData()
    },
    handleSizeChange(pagesize){
        this.pagesize = pagesize

        this.getGoodsListData()
    },
    handleCurrentChange(pagenum){
        this.pagenum = pagenum

        this.getGoodsListData()
    },
    // 添加商品
    addGoods(){
      // this.$router.push({name:'AddGoods'})
      // this.$router.push({path:'/layout/goods/add'})
      this.$router.push('/layout/goods/add')
    },
    deleteGoods(goods_id){
      this.$confirm('确定删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$axios.delete(`goods/${goods_id}`).then(res=>{
          if (res.data.meta.status === 200){
            // 提示
            this.$message({
                message: res.data.meta.msg,
                type: 'success'
            })

            // 刷新
            this.getGoodsListData()
          }
        })
      }).catch(() => {
              
      });
    }
  }
}
</script>

<style scoped>
.el-pagination {
    background-color: #d3dce6;
    padding-top: 10px;
    height: 35px;
    line-height: 35px;
}
</style>
