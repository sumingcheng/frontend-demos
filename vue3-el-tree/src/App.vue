<template>
  <div class="tree-container">
    <!-- ElTree 组件 -->
    <el-tree
        :data="data"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
        node-key="id"
        ref="tree"
        class="custom-tree"
    >
      <template #default="{ node, data }">
        <div class="tree-node">
          <span class="node-label">{{ node.label }}</span>
          <div class="action-buttons">
            <el-button size="small" @click.stop="handleAddChild(data)">添加子节点</el-button>
            <el-button size="small" @click.stop="handleAddSibling(data)">添加同级节点</el-button>
            <el-button size="small" @click.stop="handleDeleteNode(data)">删除节点</el-button>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElTree, ElMessageBox } from 'element-plus';  // 引入 ElMessageBox 用于删除确认
import { nanoid } from 'nanoid';
import jsonData from './data.json';

// 定义树节点的数据结构
interface TreeNode {
  id: string;
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
const defaultExpandedKeys = ref<string[]>([]);
const defaultCheckedKeys = ref<string[]>([]);

// 引用 ElTree 组件
const tree = ref<InstanceType<typeof ElTree> | null>(null);

// 获取所有节点的 ID（递归）
const getAllNodeIds = (nodes: TreeNode[]): string[] => {
  return nodes.reduce((ids, node) => {
    ids.push(node.id);
    if (node.children) ids.push(...getAllNodeIds(node.children));
    return ids;
  }, [] as string[]);
};

// 添加子节点
const handleAddChild = (nodeData: TreeNode) => {
  const newNode: TreeNode = { id: nanoid(), label: '新子节点' };

  // 直接更新响应式数据，Vue 会自动更新视图
  if (nodeData.children) {
    nodeData.children.push(newNode);
  } else {
    nodeData.children = [newNode];
  }

  // 设置默认展开的节点
  defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
};

// 添加同级节点
const handleAddSibling = (nodeData: TreeNode) => {
  const newNode: TreeNode = { id: nanoid(), label: '新同级节点' };

  const parentNode = findParentNode(data.value, nodeData.id);

  if (parentNode) {
    const siblingNodeIndex = parentNode.children?.findIndex(child => child.id === nodeData.id);
    if (siblingNodeIndex !== undefined && siblingNodeIndex !== -1) {
      // 插入新节点
      parentNode.children.splice(siblingNodeIndex + 1, 0, newNode);
    }
  } else {
    // 如果没有父节点，则新节点为根节点
    data.value.push(newNode);
  }

  // 设置默认展开的节点
  defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
};

// 递归查找父节点
const findParentNode = (nodes: TreeNode[], nodeId: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.children?.some(child => child.id === nodeId)) return node;
    const found = node.children && findParentNode(node.children, nodeId);
    if (found) return found;
  }
  return null;
};

// 删除节点
const handleDeleteNode = async (nodeData: TreeNode) => {
  try {
    // 提示用户是否确认删除
    await ElMessageBox.confirm('确定要删除该节点吗?', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });

    // 删除节点时，直接操作数据
    const parentNode = findParentNode(data.value, nodeData.id);
    if (parentNode) {
      parentNode.children = parentNode.children?.filter(node => node.id !== nodeData.id) || [];
    } else {
      // 根节点删除
      data.value = data.value.filter(node => node.id !== nodeData.id);
    }
  } catch (error) {
    // 用户取消删除
    console.log('删除操作被取消');
  }
};

// 设置默认展开的节点
onMounted(() => {
  const allNodeIds = getAllNodeIds(data.value);
  defaultExpandedKeys.value = allNodeIds;
  defaultCheckedKeys.value = [];
});
</script>

<style scoped>

</style>
