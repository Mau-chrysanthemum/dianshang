<template>
    <div>
        <!-- 1.0 面包屑导航 -->
        <MyBreadcrumb level1="商品管理" level2="分类参数"></MyBreadcrumb>
        <!-- 2.0 级联选择器 -->
        <el-cascader
            :options="options"
            :props="props"
            v-model="selectedOptions"
            :show-all-levels="false"
            @change="categoryChange"
        ></el-cascader>
        <!-- 3.0 Tabs -->
        <el-tabs v-model="type" @tab-click="tabClick" type="border-card">
            <el-tab-pane label="动态参数" name="dynamic">
                <!-- 添加按钮 -->
                <el-button
                    type="success"
                    @click="dialogVisible4AddDynamicParams = true"
                    plain
                >添加动态参数</el-button>
                <!-- 动态参数的表格 -->
                <el-table
                :data="dynamicParams"
                border
                style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-tag
                                :key="index"
                                v-for="(tag,index) in props.row.attr_vals"
                                closable
                                :disable-transitions="false"
                                @close="deleteAttrVal(index,props.row)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                    placeholder="按回车添加属性值"
                                    v-if="props.row.inputVisible"
                                    v-model="props.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="addDynamicParamsValue(props.row)"
                                    @blur="hideInput(props.row)"
                                >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">+ 添加值</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="index">
                    </el-table-column>
                    <el-table-column label="参数名称" prop="attr_name" width="500">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="props">
                            <div>
                                <el-button
                                    icon="el-icon-edit"
                                    size="small"
                                    @click="editDynamicParams(props.row.attr_id,props.row.attr_name)"
                                    type="primary"
                                    plain
                                ></el-button>
                                <el-button
                                    icon="el-icon-delete"
                                    @click="deleteDynamicParams(props.row.attr_id)"
                                    size="small"
                                    type="danger"
                                    plain
                                ></el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="static">
                <!-- 添加按钮 -->
                <el-button
                    type="success"
                    @click="dialogVisible4AddStaticProperty = true"
                    plain
                >添加静态属性</el-button>
                <el-table
                :data="staticProperties"
                border
                style="width: 100%">
                    <el-table-column type="index">
                    </el-table-column>
                    <el-table-column label="属性名称" prop="attr_name" width="250">
                    </el-table-column>
                    <el-table-column label="值" prop="attr_vals" width="250">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="props">
                            <div>
                                <el-button
                                    icon="el-icon-edit"
                                    size="small"
                                    @click="editStaticProperty(props.row)"
                                    type="primary"
                                    plain
                                ></el-button>
                                <el-button
                                    icon="el-icon-delete"
                                    size="small"
                                    @click="deleteStaticProperty(props.row.attr_id)"
                                    type="danger"
                                    plain
                                ></el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 4.0 动态参数相关 -->
        <!-- 添加动态参数 -->
        <el-dialog
            title="添加动态参数"
            :visible.sync="dialogVisible4AddDynamicParams"
            width="50%"
            >
            <el-form :model="addDynamicParamsObj" :rules="rules" ref="addDynamicParamsForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="参数名称" prop="attr_name">
                    <el-input v-model="addDynamicParamsObj.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4AddDynamicParams = false">取 消</el-button>
                <el-button type="primary" @click="addDynamicParams">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改的对话框 -->
        <el-dialog
            title="修改动态参数"
            :visible.sync="dialogVisible4EditDynamicParams"
            width="50%"
            >
            <el-form :model="editDynamicParamsObj" :rules="rules" ref="editDynamicParamsForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="参数名称" prop="attr_name">
                    <el-input v-model="editDynamicParamsObj.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4EditDynamicParams = false">取 消</el-button>
                <el-button type="primary" @click="submitEditDynamicParams">确 定</el-button>
            </span>
        </el-dialog>
         <!-- 5.0 静态属性相关 -->
         <!-- 添加静态属性 -->
         <el-dialog
            title="添加静态属性"
            :visible.sync="dialogVisible4AddStaticProperty"
            width="50%"
            >
            <el-form :model="addStaticPropertyObj" :rules="rules" ref="addStaticPropertyForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="属性名称" prop="attr_name">
                    <el-input v-model="addStaticPropertyObj.attr_name"></el-input>
                </el-form-item>
                <el-form-item label="属性值" prop="attr_vals">
                    <el-input v-model="addStaticPropertyObj.attr_vals"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4AddStaticProperty = false">取 消</el-button>
                <el-button type="primary" @click="addStaticProperty">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改静态属性 -->
        <el-dialog
            title="修改静态属性"
            :visible.sync="dialogVisible4EditStaticProperty"
            width="50%"
            >
            <el-form :model="editStaticPropertyObj" :rules="rules" ref="editStaticPropertyForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="属性名称" prop="attr_name">
                    <el-input v-model="editStaticPropertyObj.attr_name"></el-input>
                </el-form-item>
                <el-form-item label="属性值" prop="attr_vals">
                    <el-input v-model="editStaticPropertyObj.attr_vals"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4EditStaticProperty = false">取 消</el-button>
                <el-button type="primary" @click="submitEditStaticProperty">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MyBreadcrumb from '../subcomponents/MyBreadcrumb'
// import Vue from 'vue'
export default {
    components:{
        MyBreadcrumb
    },
    data(){
        return {
            options:[], //级联选择器需要的数据
            props:{
                label:'cat_name',
                children:'children',
                value:'cat_id'
            },
            // selectedOptions:[1,3,6]
            selectedOptions:[],
            type:'dynamic', // 类型，就是tab切换时候的type
            thirdLevelId:0, //三级分类id，查询动态参数和静态属性，必须依赖他
            dynamicParams:[], //动态参数的数组
            staticProperties:[], //静态属性的数组
            dialogVisible4AddDynamicParams:false, //添加动态参数的标识符
            addDynamicParamsObj:{ // 添加动态参数时候的对象
                attr_name:'',
                attr_sel:'many'
            },
            attr_id:0,//要修改的属性id【既包括动态参数的id & 静态属性的id】
            editDynamicParamsObj:{
                attr_name:'',
                attr_sel:'many'
            },
            rules:{//验证规则
                attr_name:[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                attr_vals:[
                    { required: true, message: '请输入属性值', trigger: 'blur' }
                ]
            },
            dialogVisible4EditDynamicParams:false, //修改动态参数的标识符
            dialogVisible4AddStaticProperty:false, //添加静态属性的标识符
            dialogVisible4EditStaticProperty:false,//修改静态属性的标识符
            addStaticPropertyObj:{ // 添加静态属性对象
                attr_name:'',
                attr_sel:'only', //代表添加的是静态属性
                attr_vals:''
            },
            editStaticPropertyObj:{ // 修改静态属性对象
                attr_name:'',
                attr_sel:'only', //代表修改的是静态属性
                attr_vals:''
            }
        }
    },
    created(){
        // 获取分类的数据
        this.getCategoriesData()
    },
    methods:{
        getCategoriesData(){
            this.$axios.get('categories',{
                params:{
                    type:3
                }
            }).then(res=>{
                // 给我们级联选择器需要的数组赋值
                this.options = res.data.data

                // 设置默认选中
                const firstId = res.data.data[0].cat_id
                const secondId = res.data.data[0].children[0].cat_id
                const thirdId = res.data.data[0].children[0].children[0].cat_id

                this.selectedOptions = [firstId,secondId,thirdId]

                // 给三级id赋值
                this.thirdLevelId = thirdId

                switch (this.type) {
                    case 'dynamic':
                        this.getThreeLevelDynamicParams()

                        break;
                    
                    case 'static':
                        this.getThreeLevelStaticProperty()
                        
                        break;
                
                    default:
                        break;
                }
            })
        },
        // 当我们的级联菜单发生了变化
        categoryChange(val){
            if (val.length < 3){
                this.$message.error('必须选择三级分类才能查到数据哦~')

                return
            }

            // 给三级id赋值
            this.thirdLevelId = val[2]

            switch (this.type) {
                case 'dynamic':
                    this.getThreeLevelDynamicParams()

                    break;
                
                case 'static':
                    this.getThreeLevelStaticProperty()
                    
                    break;
            
                default:
                    break;
            }
        },
        // Tabs切换的方法
        tabClick(val){
            this.type = val.name
            
            switch (this.type) {
                case 'dynamic':
                    this.getThreeLevelDynamicParams()

                    break;
                
                case 'static':
                    this.getThreeLevelStaticProperty()
                    
                    break;
            
                default:
                    break;
            }
        },
        // 获取三级分类的动态参数
        getThreeLevelDynamicParams(){
            // console.log("--获取动态参数---",this.thirdLevelId)
            
            this.$axios.get(`categories/${this.thirdLevelId}/attributes`,{
                params:{
                    sel:'many'
                }
            }).then(response=>{
                response.data.data.forEach(item=>{
                    if (item.attr_vals.trim().length === 0){//空串
                        item.attr_vals = []
                    } else {
                         item.attr_vals = item.attr_vals.split(',')
                    }

                    // 在后台返回的基础上，再动态添加两个属性
                    item.inputVisible = false
                    item.inputValue = ''
                })
                // 给动态参数数组赋值
                this.dynamicParams = response.data.data
            })
        },
        // 获取三级分类的静态属性
        getThreeLevelStaticProperty(){
            // console.log("--获取静态属性---",this.thirdLevelId)

            this.$axios.get(`categories/${this.thirdLevelId}/attributes`,{
                params:{
                    sel:'only'
                }
            }).then(response=>{
                // 给静态属性数组赋值
                this.staticProperties = response.data.data
            })
        },
        // 动态参数相关
        // 添加
        addDynamicParams(){
            this.$refs.addDynamicParamsForm.validate(valid=>{
                if (valid){
                    this.$axios.post(`categories/${this.thirdLevelId}/attributes`,this.addDynamicParamsObj).then(res=>{
                        if (res.data.meta.status === 201){
                            // 弹出提示
                            this.$message({
                                message: res.data.meta.msg,
                                type: 'success'
                            })

                            // 关闭添加的对话框
                            this.dialogVisible4AddDynamicParams = false

                            // 刷新表格
                            this.getThreeLevelDynamicParams()
                        }
                    })
                }
            })
        },
        // 修改动态参数
        editDynamicParams(attr_id,attr_name){
            // 给属性id
            this.attr_id = attr_id // 将来做修改能拿到这个id

            // 给修改的模型的attr_name赋值
            this.editDynamicParamsObj.attr_name = attr_name

            // 弹出修改动态参数的对话框
            this.dialogVisible4EditDynamicParams = true
        },
        // 提交修改之后的动态参数
        submitEditDynamicParams(){
            this.$refs.editDynamicParamsForm.validate(valid=>{
                if(valid){
                    this.$axios.put(`categories/${this.thirdLevelId}/attributes/${this.attr_id}`,this.editDynamicParamsObj).then(res=>{
                        if (res.data.meta.status === 200){
                            // 弹出提示
                            this.$message({
                                message: res.data.meta.msg,
                                type: 'success'
                            })

                            // 关闭添加的对话框
                            this.dialogVisible4EditDynamicParams = false

                            // 刷新表格
                            this.getThreeLevelDynamicParams()
                        }
                    })
                }
            })
        },
        deleteDynamicParams(attr_id){
            this.$axios.delete(`categories/${this.thirdLevelId}/attributes/${attr_id}`).then(res=>{
                if (res.data.meta.status === 200){
                    // 弹出提示
                    this.$message({
                        message: res.data.meta.msg,
                        type: 'success'
                    })

                    // 刷新表格
                    this.getThreeLevelDynamicParams()
                }
            })
        },
        // 新增静态属性
        addStaticProperty(){
            this.$refs.addStaticPropertyForm.validate(valid=>{
                if(valid){
                     this.$axios.post(`categories/${this.thirdLevelId}/attributes`,this.addStaticPropertyObj).then(res=>{
                        if (res.data.meta.status === 201){
                            // 弹出提示
                            this.$message({
                                message: res.data.meta.msg,
                                type: 'success'
                            })

                            // 关闭添加的对话框
                            this.dialogVisible4AddStaticProperty = false

                            // 刷新表格
                            this.getThreeLevelStaticProperty()
                        }
                    })
                }
            })
        },
        // 修改静态属性 弹框
        editStaticProperty(obj){
            this.attr_id = obj.attr_id // 属性id
            this.editStaticPropertyObj.attr_name = obj.attr_name
            this.editStaticPropertyObj.attr_vals = obj.attr_vals

            this.dialogVisible4EditStaticProperty = true
        },
        // 修改静态属性
        submitEditStaticProperty(){
            this.$refs.editStaticPropertyForm.validate(valid=>{
                if (valid){
                    this.$axios.put(`categories/${this.thirdLevelId}/attributes/${this.attr_id}`,this.editStaticPropertyObj).then(res=>{
                        if (res.data.meta.status === 200) {
                            // 弹出提示
                            this.$message({
                                message: res.data.meta.msg,
                                type: 'success'
                            })

                            // 关闭对话框
                            this.dialogVisible4EditStaticProperty = false

                            // 刷新静态属性列表
                            this.getThreeLevelStaticProperty()
                        }
                    })
                }
            })
        },
        // 删除静态属性
        deleteStaticProperty(attr_id){
            this.$axios.delete(`categories/${this.thirdLevelId}/attributes/${attr_id}`).then(res=>{
                if (res.data.meta.status === 200){
                    // 弹出提示
                    this.$message({
                        message: res.data.meta.msg,
                        type: 'success'
                    })

                    // 刷新静态属性的列表
                    this.getThreeLevelStaticProperty()
                }
            })
        },
        // 删除动态属性的某个值
        deleteAttrVal(index,dparams){
            // 删除dparams中的attr_vals
            dparams.attr_vals.splice(index,1)

            // 调用接口去更新动态参数的值
            this.addOrRemoveParamsAttrValues(dparams)
        },
        // 添加某个动态属性的值
        addDynamicParamsValue(dparams){
            if (dparams.inputValue.trim().length === 0){
                this.$message({
                    message: '输入内容之后，才能添加哦',
                    type: 'warning'
                });

                return
            }

            // 给当天数组添加内容，就会导致视图发生变化
            dparams.attr_vals.push(dparams.inputValue)

            // 添加动态参数的值
            this.addOrRemoveParamsAttrValues(dparams)
        },
        // 添加或是删除动态参数的值
        addOrRemoveParamsAttrValues(dparams){
            this.$axios.put(`categories/${this.thirdLevelId}/attributes/${dparams.attr_id}`,{
                attr_name:dparams.attr_name,
                attr_sel:'many',
                attr_vals:dparams.attr_vals.join(',')
            }).then(res=>{
                if (res.data.meta.status === 200){
                    // 弹出正确的提示
                    this.$message({
                        message: res.data.meta.msg,
                        type: 'success'
                    });

                    // 清空我们的dparams的inputValue的值，让inputVisible设置为false
                    dparams.inputValue = ''
                    dparams.inputVisible = false
                }
            })
        },
        // 失去焦点的时候，让Input框隐藏
        hideInput(dparams){
            dparams.inputVisible = false
        },
        // 当点击按钮，让Input出来，并且获得焦点
        showInput(dparams){
            // 我们更改了模型之后，Vue会重新渲染
            dparams.inputVisible = true

            // 等我们的页面完全渲染完毕之后，我才能拿到dom操作
            this.$nextTick(()=>{ // 它的执行时机是，当我们的所有dom元素渲染完毕，Vue框架会自动调用这个回调函数
                this.$refs.saveTagInput.focus()
            })
            /**
            Vue.nextTick(()=>{
                console.log(this.$refs.saveTagInput)
                this.$refs.saveTagInput.focus()
            })
             */
        }
    }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 150px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>