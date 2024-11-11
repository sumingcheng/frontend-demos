<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">树形组件</el-menu-item>
      <el-menu-item index="2">柱状图组件</el-menu-item>
      <el-menu-item index="3">请求等待练习</el-menu-item>
      <el-menu-item index="4">自定义指令</el-menu-item>
      <el-menu-item index="5">步骤条</el-menu-item>
      <el-menu-item index="6">描述列表</el-menu-item>
      <el-menu-item index="7">临时</el-menu-item>
    </el-menu>
    <div class="exhibition" v-if="activeIndex==='1'">
      <div>
        <treeComponent ref="treeCom" :TreeData.sync="treeData" :options="options" :defaultProps="defaultProps"
            @nodeClick="nodeClick" @checkChange="checkChange">
        </treeComponent>
      </div>
      <div class="content">
        <div style="display: inline-block; margin-bottom: 20px">
          <el-button type="primary" @click="selectAll">全选</el-button>
          <el-button type="primary" @click="deselect">取消选择</el-button>
        </div>
        <h1>点击的数据：{{ nodeData.id }}</h1>
        <ul>
          <li>是否永远子节点：{{ nodeData.hasChild === true ? '是' : '否' }}</li>
          <li>标题：{{ nodeData.label }}</li>
          <li>节点id：{{ nodeData.id }}</li>
          <li>是否选中：{{ nodeData.checked === true ? '是' : '否' }}</li>
          <li>是否是一级节点：{{ nodeData.levelOne === true ? '是' : '否' }}</li>
        </ul>
      </div>
    </div>
    <div v-if="activeIndex==='2'">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <bar :options="barOptions1"></bar>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <bar :options="barOptions2"></bar>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <bar :options="barOptions3"></bar>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="activeIndex==='3'">
      <toast>Loading</toast>
    </div>
    <div v-if="activeIndex==='4'">
      <instructions></instructions>
    </div>
    <div v-if="activeIndex==='5'">
      <stepBar>Loading</stepBar>
    </div>
    <div v-if="activeIndex==='6'">
      <list :descriptionList="descriptionList"></list>
    </div>
    <div v-if="activeIndex==='7'">
    </div>
  </div>
</template>

<script>
import bar from '@/views/bar/index.vue'
import { tree } from '@/mock/mock'
import toast from '@/views/toast/index.vue'
import stepBar from '@/views/stepBar/index.vue'
import list from '@/views/list'
import { nanoid } from 'nanoid'

export default {
  components: {
    treeComponent: () => import('@/views/treeComponent/index.vue'),
    bar,
    toast,
    stepBar,
    list,
    instructions: () => import('@/views/instructions/index.vue')
  },
  data() {
    return {
      barOptions1: {
        height: 15,
        maximum: 100,
        minimum: 50,
        percentage: 30,
        bgColor: '#e5f1ff',
        barColor: '#4fa5f8',
      },
      barOptions2: {
        height: 15,
        maximum: 100,
        minimum: 50,
        bgColor: '#002fa7',
        barColor: '#FFE76F',
      },
      barOptions3: {
        height: 15,
        maximum: 100,
        minimum: 50,
        bgColor: '#01847F',
        barColor: '#F9D2E4',
      },
      // 配置
      options: {
        expandLevel1Data: true,
        childNodeID: 'hasChild',
        defaultExpansion: false,
        indent: 30,
        isCheckbox: true,
        isIcon: true,
        checkedName: 'checked',
        customIcon: true,
        isCheck: true,
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeArr: [],
      // 数据
      activeIndex: '6',
      nodeData: {
        hasChild: '',
        label: '',
        id: '',
      },
      arr: [],
      array: [],
      descriptionList: [
        { id: nanoid(11), label: 'label', text: 'Item 1' },
        { id: nanoid(11), label: 'label', text: 'Item 2' },
        { id: nanoid(11), label: 'label', text: 'Item 3' },
        { id: nanoid(11), label: 'label', text: 'Item 3' },
      ]
    }
  },

  computed: {
    treeData() {
      let { array } = tree
      return array
    }
  },
  mounted() {
  },
  methods: {
    // 树形结构
    selectAll() {
      this.$refs.treeCom.selectAll()
    },
    deselect() {
      this.$refs.treeCom.deselect()
    },
    checkChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    nodeClick(data) {
      this.nodeData = data
    },
    // 菜单
    handleSelect(key) {
      this.activeIndex = key.toString()
    },
  }
}
</script>

<style lang="scss" scoped>
.exhibition {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows:  repeat(4, 25%);

  .content {
    margin: 20px;
  }

  li {
    font-size: 18px;
    font-weight: bold;
    line-height: 40px;
  }
}

</style>
