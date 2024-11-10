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
import { ElTree } from 'element-plus';  // 引入 ElTree 类型
import jsonData from './data.json';     // 引入数据

// 定义树节点的数据结构
interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

// 树形数据
const data = ref<TreeNode[]>(jsonData);

// 默认属性配置，指定树的数据字段名称
const defaultProps = ref({
  children: 'children',
  label: 'label'
});

// 默认展开的节点 ID 数组
const defaultExpandedKeys = ref<number[]>([]);

// 默认选中的节点 ID 数组
const defaultCheckedKeys = ref<number[]>([]);

// 引用 ElTree 组件
const tree = ref<InstanceType<typeof ElTree> | null>(null);

// 获取所有节点的 ID（递归获取）
const getAllNodeIds = (nodes: TreeNode[]): number[] => {
  return nodes.reduce((ids, node) => {
    ids.push(node.id);
    if (node.children) {
      ids.push(...getAllNodeIds(node.children));
    }
    return ids;
  }, [] as number[]);
};

// 在组件挂载后设置默认展开的节点
onMounted(() => {
  const allNodeIds = getAllNodeIds(data.value); // 获取所有节点的 ID
  defaultExpandedKeys.value = allNodeIds;       // 设置所有节点展开
  defaultCheckedKeys.value = [];                // 默认不选中任何节点
});

// 添加子节点
const handleAddChild = (nodeData: TreeNode) => {
  const newNode: TreeNode = {
    id: Date.now(),  // 使用当前时间戳作为新节点 ID
    label: '新子节点',
  };

  // 向当前节点添加子节点
  nodeData.children = nodeData.children ? [...nodeData.children, newNode] : [newNode];

  // 更新树数据
  tree.value?.updateKeyChildren(nodeData.id, nodeData.children);

  // 在添加子节点后，将新节点加入到 default-expanded-keys 中，确保它展开
  defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
};

// 添加同级节点
const handleAddSibling = (nodeData: TreeNode) => {
  const newNode: TreeNode = {
    id: Date.now(),  // 使用当前时间戳作为新节点 ID
    label: '新同级节点',
  };

  // 查找父节点
  const parentNode = findParentNode(data.value, nodeData.id);

  if (parentNode) {
    // 使用新的数组引用更新父节点的 children
    parentNode.children = [...(parentNode.children || []), newNode];

    // 更新树数据
    tree.value?.updateKeyChildren(parentNode.id, parentNode.children);
    defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
  } else {
    console.log("作为根节点添加新节点");
    data.value = [...data.value, newNode];  // 根节点直接更新
  }
};

// 递归查找父节点
const findParentNode = (nodes: TreeNode[], nodeId: number): TreeNode | null => {
  for (const node of nodes) {
    if (node.children && node.children.some(child => child.id === nodeId)) {
      return node;
    }
    if (node.children) {
      const found = findParentNode(node.children, nodeId);
      if (found) return found;
    }
  }
  return null;  // 如果未找到父节点
};

// 删除节点
const handleDeleteNode = (nodeData: TreeNode) => {
  tree.value?.remove(nodeData);  // 直接调用 tree 实例的 remove 方法删除节点
};
</script>
