<template>
    <div>
        <!-- 1.0 导航面包屑 -->
        <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>

        <!-- 2.0 添加角色 -->
        <el-button type="success" @click="dialogVisible4Add = true" plain>添加角色</el-button>
        <!-- 3.0 角色列表 -->
        <el-table
            :data="rolesList"
            style="width: 100%">
             <!-- 代表这一列是可以展开的 -->
             <el-table-column type="expand">
                 <!-- 此时这里的作用域插槽，scope有三个属性 
                    scope.row rolesList中遍历到的每一行的数据 每个角色的数据
                    scope.column 这一列
                    scope.$index 遍历到每一行数据的索引
                 -->
                <template slot-scope="scope">
                    <!-- todo 具体的权限列表 -->
                    <el-row v-for="item in scope.row.children" :key="item.id">
                        <!-- 左边列占3份(一级权限) -->
                        <el-col :span="3">
                            <el-tag @close="deleteRights(scope.$index,scope.row.id,item.id)" closable>
                                {{item.authName}}
                            </el-tag>
                            <i
                                v-if="item.children.length > 0"
                                class="el-icon-arrow-right arrow"
                            ></i>
                        </el-col>
                        <!-- 右边占21份(包含二级和三级权限) -->
                        <el-col :span="21">
                            <!-- 根据二级权限有多少个，生成多少行 -->
                            <el-row class="authlist" v-for="subitem in item.children" :key="subitem.id">
                                <!-- 二级权限 -->
                                <el-col :span="4">
                                    <el-tag @close="deleteRights(scope.$index,scope.row.id,subitem.id)" type="success" closable>
                                        {{subitem.authName}}
                                    </el-tag>
                                    <i
                                        v-if="subitem.children.length > 0"
                                        class="el-icon-arrow-right arrow"
                                    ></i>
                                </el-col>
                                <!-- 三级权限 -->
                                <el-col :span="20">
                                    <el-tag
                                        class="thirditem"
                                        v-for="thirditem in subitem.children"
                                        :key="thirditem.id"
                                        @close="deleteRights(scope.$index,scope.row.id,thirditem.id)"
                                        closable
                                        type="warning">
                                        {{thirditem.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
             </el-table-column>
             <el-table-column type="index" width="50">
             </el-table-column>
             <el-table-column
                label="角色名称"
                prop="roleName"
                width="180"
             ></el-table-column>
             <el-table-column
                label="角色描述"
                prop="roleDesc"
                width="400"
             ></el-table-column>
             <el-table-column label="操作">
                 <template slot-scope="scope">
                     <el-button type="primary" icon="el-icon-edit" @click="editRole(scope.row.id)" size="small" plain></el-button>
                     <el-button type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)" size="small" plain></el-button>
                     <el-button type="warning" icon="el-icon-check" @click="grantRights(scope.row)" size="small" plain></el-button>
                 </template>
             </el-table-column>
        </el-table>
        <!-- 4.0 新增角色的对话框 -->
        <el-dialog
            title="新增角色"
            :visible.sync="dialogVisible4Add"
            width="50%">
            <!-- 添加角色表单 -->
            <el-form :model="addRoleObj" :rules="rules" ref="addRoleRef" label-width="100px" class="demo-ruleForm">
                <!-- prop和验证规则的rules中的属性名保持一致 -->
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleObj.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="addRoleObj.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4Add = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 5.0 修改的对话框 -->
        <el-dialog
            title="修改角色"
            :visible.sync="dialogVisible4Edit"
            width="50%">
            <!-- 修改角色表单 -->
            <el-form :model="editRoleObj" :rules="rules" ref="editRoleRef" label-width="100px" class="demo-ruleForm">
                <!-- prop和验证规则的rules中的属性名保持一致 -->
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editRoleObj.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="editRoleObj.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4Edit = false">取 消</el-button>
                <el-button type="primary" @click="editRole2">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 6.0 展示权限的对话框 -->
        <el-dialog
            title="角色赋权"
            :visible.sync="dialogVisible4Grant"
            width="60%">
            <el-tree
                ref="grantTreeRef"
                :data="treeRights"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="checkedKeys"
                :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4Grant = false">取 消</el-button>
                <el-button type="primary" @click="submitGrant">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MyBreadcrumb from '../subcomponents/MyBreadcrumb'
export default {
    components:{
        MyBreadcrumb
    },
    data(){
        return {
            rolesList:[], //角色列表
            dialogVisible4Add:false, //新增角色的标识符
            dialogVisible4Edit:false,//修改角色的标识符
            dialogVisible4Grant:false,//给角色赋权的对话框
            addRoleObj:{ // 添加角色时候的对象
                roleName:'', // 角色名称
                roleDesc:'' // 角色描述
            },
            editRoleObj:{// 修改角色时候的对象
                roleName:'',
                roleDesc:''
            },
            rules:{
                roleName:[
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            },
            treeRights:[],// 所有的权限（以树形的结构展示）
            checkedKeys:[], // 将来要选中的keys，就是角色拥有的三级权限的id
            defaultProps: { // 配置对应关系
                children: 'children',
                label: 'authName'
            },
            roleId:null //角色ID
        }
    },
    created(){
        // 获取角色列表数据
        this.getRolesListData()
    },
    methods:{
        // 获取角色列表
        getRolesListData(){
            this.$axios.get('roles').then(response=>{
                this.rolesList = response.data.data
            })
        },
        // 添加角色
        addRole(){
            this.$refs.addRoleRef.validate(valid=>{
                if (valid) {
                    this.$axios.post('roles',this.addRoleObj).then(response=>{
                        if (response.data.meta.status === 201) {
                            this.$message({
                                message: response.data.meta.msg,
                                type: 'success'
                            })

                            // 隐藏对话框
                            this.dialogVisible4Add = false

                            // 刷新页面
                            this.getRolesListData()
                        }
                    })
                }
            })
        },
        // 修改角色之前，弹出对话框
        editRole(roleId){
            this.$axios.get(`roles/${roleId}`).then(response=>{
                // 赋值数据给模型
                this.editRoleObj = response.data.data
                // 弹出修改的对话框
                this.dialogVisible4Edit = true
            })
        },
        // 修改操作
        editRole2(){
            this.$axios.put(`roles/${this.editRoleObj.roleId}`,this.editRoleObj).then(response=>{
                if(response.data.meta.status === 200){
                    this.$message({
                        message: response.data.meta.msg,
                        type: 'success'
                    })

                    // 隐藏对话框
                    this.dialogVisible4Edit = false

                    // 刷新页面
                    this.getRolesListData()
                }
            })
        },
        // 删除操作
        deleteRole(roleId){
            this.$confirm('确定删除该角色吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`roles/${roleId}`).then(response=>{
                    if (response.data.meta.status === 200){
                        this.$message({
                            message: response.data.meta.msg,
                            type: 'success'
                        })
                        
                        // 刷新页面
                        this.getRolesListData()
                    }
                })
            }).catch(() => {
                         
            })
        },
        // 删除角色下面的权限
        deleteRights(index,roleId,rightId){
            // res返回的就是该角色删除之后，剩下的权限
            this.$axios.delete(`roles/${roleId}/rights/${rightId}`).then(response=>{
                if (response.data.meta.status === 200){
                    this.$message({
                        message: response.data.meta.msg,
                        type: 'success'
                    })

                    // 重新给我们删除之后的角色赋值
                    this.rolesList[index].children = response.data.data
                }
            })
        },
        // 弹出授权树形框
        grantRights(role){
            // 给roleId赋值
            this.roleId = role.id

            // 清除掉之前的选中的keys
            this.checkedKeys = []

            // console.log(role)
            //1、设置要选中的keys【就是选中的第三级的权限id】
            if (role.children && role.children.length > 0) {
                role.children.forEach(subitem=>{
                    if (subitem.children && subitem.children.length > 0){
                        subitem.children.forEach(third => {
                            if (third.children && third.children.length > 0){
                                third.children.forEach(last => {
                                    this.checkedKeys.push(last.id)
                                })
                            }
                        })
                    }
                })
            }
            
            // 2、获取所有的权限（树形结构）
            this.$axios.get(`rights/tree`).then(response=>{
                this.treeRights = response.data.data

                this.dialogVisible4Grant = true
            })
        },
        // 提交授权
        submitGrant(){
            // 获取全选中的keys
            const checkedKeys = this.$refs.grantTreeRef.getCheckedKeys() 

            const halfCheckedKeys = this.$refs.grantTreeRef.getHalfCheckedKeys()

            const lastKeys = checkedKeys.concat(halfCheckedKeys)
            
            // 这是最终需要提交给后台的字符串（里面包含选中和半选中的key）
            const rids = lastKeys.join(',')
            
            // 给角色赋值
            this.$axios.post(`roles/${this.roleId}/rights`,{
                rids
            }).then(response=>{
                if(response.data.meta.status === 200){
                    this.$message({
                        message: response.data.meta.msg,
                        type: 'success'
                    })

                    // 关闭对话框
                    this.dialogVisible4Grant = false

                    // 刷新角色列表
                    this.getRolesListData()
                }
            })
        }
    }
}
</script>

<style scoped>
.el-tag {
  margin-left: 5px;
  margin-top:5px;
}
.authlist {
  border-top: solid 1px #d3dce6;
  padding-bottom: 5px;
}
.arrow {
  font-size: 16px;
  font-weight: bold;
}
</style>
