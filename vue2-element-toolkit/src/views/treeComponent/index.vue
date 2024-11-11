<template>
  <div>
    <!--<el-input-->
    <!--    placeholder="输入关键字进行过滤"-->
    <!--    v-model="filterText">-->
    <!--</el-input>-->
    <el-tree ref="tree" :data="_TreeData" :default-expand-all="defaultExpansion"
        :default-expanded-keys="customOpen" :expand-on-click-node="true" :filter-node-method="filterNode"
        :icon-class="isIcon" :indent="indent" :props="defaultProps" node-key="id" :default-checked-keys="checkedArr"
        :show-checkbox="isCheckbox" class="treeStyle" @node-click="nodeClick" @check-change="handleCheckChange">
      <template v-slot="{data,node}">
        <span :class="customIcon && data.levelOne ? 'lOneNodeIcon' : ''">{{ data[label] }}</span>
      </template>
    </el-tree>
  </div>
</template>
<script>

export default {
  props: {
    // 是否默认展开一级
    options: {
      type: Object,
      default: () => ({
        // 默认展开一级
        expandLevel1Data: true,
        // 子节点标识
        childNodeID: 'hasChild',
        // 缩进
        indent: 30,
        // 是否可选
        isCheckbox: false,
        // 是否全部展开
        defaultExpansion: false,
        // 是否显示三角,false 为显示自定义图标
        isIcon: false,
        // 是否默认选择数据
        checkedName: 'checked',
        // 自定义图标
        customIcon: false,
        // 是否自动勾选
        isCheck: false,
      })
    },
    // 树形结构数据
    TreeData: {
      type: Array,
      default: () => []
    },
    // 默认节点名
    defaultProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'label'
      })
    }
  },
  data() {
    return {
      // filterText: '',
      // 展开数据
      arr: [],
      // 选择数据
      checkedArr: []
    };
  },
  watch: {
    TreeData(val, newVal) {
      console.log(val, newVal);
    }
    // filterText(val) {
    //   this.$refs.tree.filter(val);
    // }
  },
  computed: {
    _TreeData: {
      get() {
        return this.TreeData;
      },
      set(newVal) {
        this.$emit('update:TreeData', newVal);
      }
    },
    isCheck() {
      return this.options.isCheck;
    },
    expandLevel1Data() {
      return this.options.expandLevel1Data;
    },
    customIcon() {
      return this.options.customIcon;
    },
    checkedName() {
      return this.options.checkedName;
    },
    childNodeID() {
      return this.options.childNodeID;
    },
    children() {
      return this.defaultProps.children;
    },
    label() {
      return this.defaultProps.label;
    },
    isCheckbox() {
      return this.options.isCheckbox;
    },
    defaultExpansion() {
      return this.options.defaultExpansion;
    },
    indent() {
      return parseInt(this.options.indent);
    },
    customOpen() {
      return this.arr.slice(0, 1);
    },
    isIcon() {
      return this.options.isIcon === false ? ' ' : '';
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.expandLevel1Data) {
        // 默认展开一级
        this.dfs(this._TreeData);
      }
      if (this.isCheck) {
        // 是否自动勾选
        this.checkedArrCreate(this._TreeData);
      }
    },
    // 节点点击
    handleCheckChange(data, checked, indeterminate) {
      this.$emit('checkChange', data, checked, indeterminate);
    },
    selectAll() {
      this.$refs.tree.setCheckedNodes(this._TreeData);
    },
    deselect() {
      this.$refs.tree.setCheckedKeys([]);
    },
    checkedArrCreate(TreeData) {
      TreeData.forEach((elem) => {
        if (elem[this.checkedName] === true) {
          this.checkedArr.push(elem.id);
          if (elem[this.children] && elem[this.childNodeID] === true) {
            this.checkedArrCreate(elem[this.children]);
          }
        }
      });
    },
    dfs(tree) {
      tree.forEach(elem => {
        if (elem[this.childNodeID] && elem[this.children] && elem[this.childNodeID] === true) {
          this.arr.push(elem.id);
          this.dfs(elem[this.children]);
        }
      });
    },
    // 节点文字点击
    nodeClick(data) {
      console.dir(data);
      this.$emit('nodeClick', data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== - 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.treeStyle {
  height: 100%;

  // 一级样式
  :deep .lOneNodeIcon {
    &:before {
      display: inline-block;
      vertical-align: middle;
      content: "";
      position: relative;
      width: 15px;
      height: 15px;
      margin-right: 10px;
      background-image: url("@/assets/imgs/512.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  :deep .el-tree-node__label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :deep .el-tree-node__content {
    font-size: 16px;
    height: 36px;

    &:hover {
      background-color: #f5f7fa;
      font-weight: bold;
      color: #409eff;
    }

    &:focus {
      background-color: #f5f7fa;
      font-weight: bold;
      color: #409eff;
    }

    &:active {
      background-color: #f5f7fa;
      font-weight: bold;
      color: #409eff;
    }
  }
}
</style>
