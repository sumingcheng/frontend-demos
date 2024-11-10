<template>
  <div>
    <!-- ElTree 组件 -->
    <el-tree
        :data="data"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
        node-key="id"
        ref="tree"
    >
      <template #default="{ node, data }">
        <span>{{ node.label }}</span>
        <el-button size="default" @click.stop="handleAddChild(data)">添加子节点</el-button>
        <el-button size="default" @click.stop="handleAddSibling(data)">添加同级节点</el-button>
        <el-button size="default" @click.stop="handleDeleteNode(data)">删除节点</el-button>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElTree } from 'element-plus';
import jsonData from './data.json';

// 定义树节点的数据结构
interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

// 树形数据
const data = ref<TreeNode[]>(jsonData);

// 默认属性配置
const defaultProps = ref({
  children: 'children',
  label: 'label'
});

// 默认展开和选中的节点
const defaultExpandedKeys = ref<number[]>([]);
const defaultCheckedKeys = ref<number[]>([]);

// 引用 ElTree 组件
const tree = ref<InstanceType<typeof ElTree> | null>(null);

// 获取所有节点的 ID（递归）
const getAllNodeIds = (nodes: TreeNode[]): number[] => {
  return nodes.reduce((ids, node) => {
    ids.push(node.id);
    if (node.children) ids.push(...getAllNodeIds(node.children));
    return ids;
  }, [] as number[]);
};

// 设置默认展开的节点
onMounted(() => {
  const allNodeIds = getAllNodeIds(data.value);
  defaultExpandedKeys.value = allNodeIds;
  defaultCheckedKeys.value = [];
});

// 添加子节点
const handleAddChild = (nodeData: TreeNode) => {
  const newNode: TreeNode = { id: Date.now(), label: '新子节点' };
  nodeData.children = nodeData.children ? [...nodeData.children, newNode] : [newNode];
  tree.value?.updateKeyChildren(nodeData.id, nodeData.children);
  defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
};

// 添加同级节点
const handleAddSibling = (nodeData: TreeNode) => {
  const newNode: TreeNode = { id: Date.now(), label: '新同级节点' };
  const parentNode = findParentNode(data.value, nodeData.id);
  if (parentNode) {
    parentNode.children = [...(parentNode.children || []), newNode];
    tree.value?.updateKeyChildren(parentNode.id, parentNode.children);
    defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
  } else {
    data.value = [...data.value, newNode];
  }
};

// 递归查找父节点
const findParentNode = (nodes: TreeNode[], nodeId: number): TreeNode | null => {
  for (const node of nodes) {
    if (node.children?.some(child => child.id === nodeId)) return node;
    const found = node.children && findParentNode(node.children, nodeId);
    if (found) return found;
  }
  return null;
};

// 删除节点
const handleDeleteNode = (nodeData: TreeNode) => {
  tree.value?.remove(nodeData);
};
</script>
