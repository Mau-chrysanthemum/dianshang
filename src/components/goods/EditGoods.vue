<template>
  <div>
    <!-- 1.0 标题 -->
    <div class="title">修改商品信息</div>
    <!-- 2.0 步骤条 -->
    <el-steps
      :space="200"
      :active="active"
      finish-status="success"
    >
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 3.0 把我们需要提交的内容，用form表单包裹起来 -->
    <el-form
      :model="goodsObj"
      :rules="rules"
      ref="updateGoodsForm"
      label-width="150px"
    >
      <!-- 左边显示的Tab -->
      <el-tabs
        value="base"
        @tab-click="tabClick"
        tab-position="left"
      >
        <el-tab-pane
          name="base"
          label="基本信息"
        >
          <el-form-item
            label="商品名称"
            prop="goods_name"
          >
            <el-input v-model="goodsObj.goods_name"></el-input>
          </el-form-item>
          <el-form-item
            label="商品价格"
            prop="goods_price"
          >
            <el-input v-model="goodsObj.goods_price"></el-input>
          </el-form-item>
          <el-form-item
            label="商品数量"
            prop="goods_number"
          >
            <el-input v-model="goodsObj.goods_number"></el-input>
          </el-form-item>
          <el-form-item
            label="商品分类"
            prop="goods_cat"
          >
            <el-cascader
              :props="props"
              :show-all-levels="false"
              v-model="selectedOptions"
              @change="categoryChange"
              :options="options"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio
              v-model="goodsObj.is_promote"
              :label="1"
              border
            >是</el-radio>
            <el-radio
              v-model="goodsObj.is_promote"
              :label="0"
              border
            >否</el-radio>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          name="params"
          label="商品参数"
        >
          <!-- 生成每一个el-form-item -->
          <el-form-item
            v-for="item in dparams"
            :key="item.attr_id"
            :label="item.attr_name"
          >
            <el-checkbox-group v-model="item.attr_vals">
              <!-- 生成每一个checkbox -->
              <el-checkbox
                border
                v-for="(subitem,index) in item.attr_vals"
                :key="index"
                :label="subitem"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          name="property"
          label="商品属性"
        >
          <el-form-item
            v-for="item in sproperty"
            :key="item.attr_id"
            :label="item.attr_name"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          name="picture"
          label="商品图片"
        >
          <!-- action跟axios不一样，它发送请求是单独的 -->
          <el-upload
            action="http://127.0.0.1:8888/api/private/v1/upload"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="goodsObj.pics"
            name="file"
            list-type="picture"
          >
            <el-button
              type="success"
              plain
              icon="el-icon-upload"
            >上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane
          name="content"
          label="商品内容"
        >
          <quill-editor v-model="goodsObj.goods_introduce"></quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <!-- 4.0 取消 & 确定按钮 -->
    <div class="footer">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button
        @click="updateGoods"
        type="primary"
      >修改</el-button>
    </div>
    <!-- 5.0 预览图片的对话框 -->
    <el-dialog
      :visible.sync="dialogVisible4Preview"
      width="50%"
    >
      <img
        :src="previewImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      active: 0, //步骤条激活的索引
      goodsObj: {
        // 这个数据，刚开始查询给他赋值，然后可以供用户修改，修改完成之后，可以提交给后台
      },
      rules: {
        // 校验规则
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      options: [], //级联选择器需要的数据
      selectedOptions: [], //默认选择的级联数据
      props: {
        // 级联选择器与我们实际的数据的映射
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      cat_id: null, // 三级分类的id
      dparams: [], //动态参数
      sproperty: [], //静态属性
      headers: {
        // 上传文件时候的请求头
        Authorization: localStorage.getItem('mytoken')
      },
      previewImageUrl: '', //要预览图片的路径
      dialogVisible4Preview: false//图片预览
    }
  },
  created() {
    this.getCategoriesData()
    this.getGoodsData()
  },
  methods: {
    // 获取商品信息
    getGoodsData() {
      this.$axios.get(`goods/${this.$route.query.goods_id}`).then(res => {
        // console.log(res.data.data)
        // 设置默认选中
        this.selectedOptions = [
          res.data.data.cat_one_id,
          res.data.data.cat_two_id,
          res.data.data.cat_three_id
        ]

        // 三级分类赋值
        this.cat_id = res.data.data.cat_id

        // 给pics的每一项增加name 和 url属性
        res.data.data.pics.forEach((item, index) => {
            item.name =`第${index + 1}张`,
            item.url = item.pics_mid_url
        })

        // 过滤动态参数 [1,3,8,5,2].filter(item=>item > 4)
        const tempArray = res.data.data.attrs.filter(
          item => item.attr_sel === 'many'
        )

        tempArray.forEach(item => {
          if (item.attr_value.trim().length === 0) {
            item.attr_vals = []
          } else {
            item.attr_vals = item.attr_value.split(',')
          }
        })

        // 赋值给动态参数
        this.dparams = tempArray

        // 过滤静态属性
        this.sproperty = res.data.data.attrs.filter(
            item => item.attr_sel === 'only'
        )

        this.goodsObj = res.data.data
      })
    },
    // tab点击
    tabClick(val) {
      // 根据点击的不同的tab，让步骤条显示对应的步骤
      switch (val.name) {
        case 'base':
          this.active = 0
          break

        case 'params':
          this.active = 1
          // 加载第三级分类的动态参数数据
          this.getThreeLevelParamsOrPropertyData('many')
          break

        case 'property':
          this.active = 2
          // 加载第三级分类的静态属性
          this.getThreeLevelParamsOrPropertyData('only')
          break

        case 'picture':
          this.active = 3
          break

        case 'content':
          this.active = 4
          break

        default:
          break
      }
    },
    // 查询第三级分类的动态参数或是静态属性
    // type 就是类型 only many
    getThreeLevelParamsOrPropertyData(type) {
      if (!this.cat_id) {
        this.$message.error('请选择三级分类')
        return
      }

      // 如果我们分类id没有改变，则不需要发送请求，只需要把服务器返回的数据，渲染出来即可
      if (this.goodsObj.cat_id === this.cat_id) {
        // 我们要展示的动态参数与静态属性，都从这里来
        if (type === 'many') {
          // 过滤动态参数
          const tempArray = this.goodsObj.attrs.filter(
            item => item.attr_sel === 'many'
          )

          tempArray.forEach(item => {
            if (item.attr_value.trim().length === 0) {
              item.attr_vals = []
            } else {
              item.attr_vals = item.attr_value.split(',')
            }
          })

          // 赋值给动态参数
          this.dparams = tempArray
        } else if (type === 'only') {
          /**
           * this.goodsObj.attrs 14个元素一个一个的进行遍历
           * 如果遍历到的每一项的attr_sel的only,我才把这一项加入到新的数组中
           */
          this.sproperty = this.goodsObj.attrs.filter(
            item => item.attr_sel === 'only'
          )
        }
      } else {
        // 加载数据
        this.$axios
          .get(`categories/${this.cat_id}/attributes`, {
            params: {
              sel: type
            }
          })
          .then(res => {
            if (type === 'many') {
              // 给动态参数赋值
              res.data.data.forEach(item => {
                if (item.attr_vals.trim().length === 0) {
                  item.attr_vals = []
                } else {
                  item.attr_vals = item.attr_vals.split(',')
                }
              })

              // 给动态参数赋值
              this.dparams = res.data.data
            } else if (type === 'only') {
              // 给静态属性赋值
              // 给静态属性赋值
              this.sproperty = res.data.data
            }
          })
      }
    },
    // 获取我们所有的分类数据
    getCategoriesData() {
      this.$axios
        .get('categories', {
          params: {
            type: 3
          }
        })
        .then(res => {
          this.options = res.data.data
        })
    },
    // 分类更改了
    categoryChange(val) {
      // val [1,3,6]
      if (val.length < 3) {
        // 没有选择到第三级分类
        this.$message.error('请选择三级分类')
        return
      }

      // 拿到第三级分类，赋值给 goodsObj.goods_cat
      this.goodsObj.goods_cat = val.join(',')

      // 把第三级分类ID保存起来，方便后面查询商品参数和商品属性
      this.cat_id = val[val.length - 1]
    },
    /** 图片上传相关的 */
    // 上传图片成功之后的回调函数
    handleSuccess(response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log("----handleSuccess----")
      if (response.meta.status === 200) {
        this.goodsObj.pics.push({
          pic: response.data.tmp_path,
          url:response.data.url
        })

        // 重新赋值
        this.goodsObj.pics.forEach((item,index)=>{
          item.name = `第${index+1}张`
        })
      }
    },
    // 图片预览
    handlePreview(file) {
      // console.log(file)
      // console.log("----handlePreview----")
      this.previewImageUrl = file.url

      // 预览图片
      this.dialogVisible4Preview = true
    },
    handleRemove(file, fileList) {
      // console.log(file)
      // console.log("-------handleRemove------")
      // 要删除的url地址
      const deleteUrl = file.url

      // 找到要删除的图片的在pics中的索引
      const dIndex = this.goodsObj.pics.findIndex(
        item => item.pic === deleteUrl
      )

      // 从pics中删除
      this.goodsObj.pics.splice(dIndex, 1)
    },
    // 修改商品信息
    updateGoods() {
      this.$refs.updateGoodsForm.validate(valid => {
        if (valid) {
          // console.log(this.goodsObj)

          // 把动态参数与静态属性合在一起提交
          this.goodsObj.attrs = this.dparams.concat(this.sproperty)

          // 调用接口
          this.$axios
            .put(`goods/${this.goodsObj.goods_id}`, this.goodsObj)
            .then(res => {
              if (res.data.meta.status === 200) {
                //1、提示
                this.$message({
                  message: res.data.meta.msg,
                  type: 'success'
                })

                //2、回到列表页面
                this.$router.go(-1)
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.title {
  height: 45px;
  line-height: 45px;
  background-color: #d7e2ef;
  padding-left: 20px;
}
.el-steps {
  margin: 15px 0px;
  padding-left: 20px;
}
.footer {
  margin-top: 20px;
  text-align: center;
}
.el-tabs__item {
  margin-top: 15px;
}
.el-input {
  height: 20px;
  width: 600px;
}
.quill-editor {
  height: 400px;
}
</style>
