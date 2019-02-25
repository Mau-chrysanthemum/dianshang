<template>
    <div>
        <!-- 1.0 面包屑导航 -->
        <MyBreadcrumb level1="商品管理" level2="商品分类"></MyBreadcrumb>
        <!-- 2.0 添加按钮 -->
        <el-button type="success" @click="addCategory" plain>添加分类</el-button>
        <!-- 3.0 树状表格 -->
        <dzh-tree-grid
            :columns="columns"
            :loading="loading"
            :dataSource="categories"
            >
            <template slot-scope="scope">
                <el-button plain title='修改商品分类' @click="editCategory(scope.row)" type="primary" size="small" icon="el-icon-edit"></el-button>
                <el-button plain title='删除商品分类' @click="deleteCategory(scope.row.cat_id)" type="danger" size="small" icon="el-icon-delete"></el-button>
            </template>
        </dzh-tree-grid>
        <!-- 4.0 分页条 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 20, 30]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 5.0 添加分类的对话框 -->
        <el-dialog
            title="添加分类"
            :visible.sync="dialogVisible4Add"
            width="50%">
            <el-form :model="addCategoryObj" :rules="rules" ref="addCategoryForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addCategoryObj.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级名称：">
                    <el-cascader
                        placeholder="不选就创建第一级"
                        :props="defaultProps"
                        change-on-select
                        @change = "categoryChange"
                        :options="options"></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4Add = false">取 消</el-button>
                <el-button type="primary" @click="submitAddCategory">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 6.0 修改的对话框 -->
        <el-dialog
            title="修改分类名称"
            :visible.sync="dialogVisible4Edit"
            width="50%">
            <el-form :model="editCategoryObj" :rules="rules" ref="editCategoryForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="editCategoryObj.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4Edit = false">取 消</el-button>
                <el-button type="primary" @click="submitEditCategory">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MyBreadcrumb from '../subcomponents/MyBreadcrumb'
import DZHTreeGrid from 'dzh-tree-grid'
export default {
    components:{
        MyBreadcrumb,
        "dzh-tree-grid" : DZHTreeGrid
    },
    data(){
        return {
            categories:[], //分类数据【包含三级】
            pagenum:1,//默认加载第一页
            pagesize:10,//页容量
            total:0, //总条数
            columns: [// 需要展示的列
                {
                    label: '分类名称',
                    prop: 'cat_name'
                },
                {
                    label: '级别',
                    prop: 'cat_level_name',
                    width: 500 // 可选
                }
            ],
            loading: true, // 正在加载中...
            dialogVisible4Add:false, //添加的标识符
            dialogVisible4Edit:false, //修改的标识符
            addCategoryObj:{ // 将来要提交给后台的
                cat_pid:0, // 父级分类
                cat_name:'', // 分类的名字
                cat_level:0  // 一级为0  二级为1  三级为2
            },
            rules:{ //验证规则
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ]
            },
            options:[], //cascader菜单展示需要的数据
            defaultProps:{//cascader的映射关系
                label:'cat_name',
                children:'children',
                value:'cat_id'
            },
            editCategoryObj:{
                cat_id:0, //修改时候需要的分类id
                cat_name:'' //修改时候分类的名字
            }
        }
    },
    created(){
        // 获取分类的数据
        this.getCategoriesData()
    },
    methods:{
        getCategoriesData(){
            // 要去加载数据了...
            this.loading = true

            this.$axios.get(`categories`,{
                params: {
                    type: 3,
                    pagenum:this.pagenum,
                    pagesize:this.pagesize
                }
            }).then(response=>{
                this.loading = false
                // 赋值categories和total
                this.categories = response.data.data.result

                this.total = response.data.data.total
            })
        },
        // 分页条的页容量发生了改变
        handleSizeChange(size){
            this.pagesize = size

            this.getCategoriesData()
        },
        // 分页条的页码发生了改变
        handleCurrentChange(page){
            this.pagenum = page

            this.getCategoriesData()
        },
        // 加载级联菜单需要的数据及展示出来
        addCategory(){
            this.$axios.get('categories',{
                params:{
                    type:2
                }
            }).then(response=>{
                // 给我们级联菜单需要的数组赋值
                this.options = response.data.data

                this.dialogVisible4Add = true
            })
        },
        // 分类改变了
        categoryChange(val){ // 下面在设置值的时候，一定得仔细
            if (val.length == 1){ //选了一级分类，添加二级分类
                this.addCategoryObj.cat_pid = val[0]
                this.addCategoryObj.cat_level = 1
            } else if (val.length == 2){ //选了二级分类，添加三级分类
                this.addCategoryObj.cat_pid = val[1]
                this.addCategoryObj.cat_level = 2
            } else { // 添加一级分类
                this.addCategoryObj.cat_pid = 0
                this.addCategoryObj.level = 0
            }
        },
        // 添加分类
        submitAddCategory(){
            this.$refs.addCategoryForm.validate(valid=>{
                if(valid){
                    this.$axios.post('categories',this.addCategoryObj).then(res=>{
                        if (res.data.meta.status === 201) {
                            //0、清空之前添加的值
                            this.addCategoryObj.cat_name = ''

                            //1、提示
                            this.$message({
                                message: res.data.meta.msg,
                                type: 'success'
                            })

                            //2、关闭对话框
                            this.dialogVisible4Add = false

                            //3、重新请求，获取数据
                            this.getCategoriesData()
                        }
                    })
                }
            })
        },
        // 弹出修改分类的对话框
        editCategory(obj){
            this.editCategoryObj.cat_id = obj.cat_id
            this.editCategoryObj.cat_name = obj.cat_name

            this.dialogVisible4Edit = true
        },
        // 提交修改之后的分类
        submitEditCategory(){
            this.$refs.editCategoryForm.validate(valid=>{
                if(valid){
                    this.$axios.put(`categories/${this.editCategoryObj.cat_id}`,{
                        cat_name: this.editCategoryObj.cat_name
                    }).then(res=>{
                        if (res.data.meta.status === 200) {
                            //1、提示
                            this.$message({
                                message: res.data.meta.msg,
                                type: 'success'
                            })

                            //2、关闭对话框
                            this.dialogVisible4Edit = false

                            //3、重新请求，获取数据
                            this.getCategoriesData()
                        }
                    })
                }
            })
        },
        deleteCategory(cat_id){
            this.$axios.delete(`categories/${cat_id}`).then(res=>{
                if (res.data.meta.status === 200) {
                    //1、提示
                    this.$message({
                        message: res.data.meta.msg,
                        type: 'success'
                    })

                    //2、重新请求，获取数据
                    this.getCategoriesData()
                }
            })
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