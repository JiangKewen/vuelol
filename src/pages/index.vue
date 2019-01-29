<template>
  <div class="mainBox">
    <div class="insertBox">
      <el-form ref="insert" :model="insert" :rules="rules" label-width="100px">
        <el-form-item label="英雄名称" prop="heroicName">
          <el-input v-model="insert.heroicName" placeholder="请输入英雄名称"></el-input>
        </el-form-item>
        <el-form-item label="英雄昵称" prop="heroicNickName">
          <el-input v-model="insert.heroicNickName" placeholder="请输入英雄昵称"></el-input>
        </el-form-item>
        <!-- heroicCounterID heroicRestraintName -->
        <el-form-item label="counter位" prop="counter">
          <el-autocomplete
            class="inline-input"
            v-model="insert.counter"
            :fetch-suggestions="querySearch"
            placeholder="请选择英雄counter位"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('insert')">立即创建</el-button>
          <el-button @click="resetForm('insert')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getAllHeroes, putHero } from '@/api'
import * as heroes from '../../static/heroes.json'
export default {
  data () {
    return {
      msg: 'hello',
      insert: {
        heroicName: '',
        heroicNickName: '',
        counter: ''
      },
      heroes: heroes.heroes,
      rules: {
        heroicName: [{ required: true, message: '请输入英雄名称', trigger: 'change' }],
        heroicNickName: [{ required: true, message: '请输入英雄昵称', trigger: 'change' }],
        counter: [{ required: true, message: '请选择英雄counter位', trigger: 'change' }]
      }
    }
  },
  methods: {
    getHeroes () {
      getAllHeroes({}).then(res => {
        console.log(res, 'res')
      })
    },
    querySearch (queryString, cb) {
      var restaurants = this.heroes
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 选中counter位
    handleSelect (item) {
      console.log(item, '选中counter位')
      this.insert.heroicCounterID = item.id
      this.insert.heroicRestraintName = item.value
    },
    // 提交按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 可以添加一个确认信息的按钮
          const params = { ...this.insert }
          delete params.counter
          putHero({ ...params }).then(res => {
            console.log(res, '录入返回信息')
          })
          this.resetForm('insert')
        } else {
          this.$message({
            showClose: true,
            message: '请填写完整信息',
            type: 'warning'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    // this.getHeroes()
    console.log(heroes, 'heroes')
  }
}
</script>
<style lang="scss" scoped>
.mainBox {
  // background: url('../../static/index.jpg');
  width: 100vw;
  height: 100vh;
  padding-top: 200px;
  .insertBox {
    padding: 50px 50px 50px 10px;
    background: #05090a;
    border-radius: 10px;
    width: 400px;
    margin: 0 auto;
  }
}
</style>
