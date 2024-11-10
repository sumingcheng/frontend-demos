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
          <span v-if="!data.isEditing" class="node-label" @click="editNode(data)">
            {{ node.label }}
          </span>
          <el-input
              v-if="data.isEditing"
              v-model="data.label"
              size="small"
              :placeholder="data.originalLabel"
              @blur="stopEditing(data)"
              @keydown.enter="stopEditing(data)"
              style="width: 120px;"
          />
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
import { ElTree, ElMessageBox, ElInput } from 'element-plus';  // 引入 Element UI 的 Tree 组件和消息框组件
import { nanoid } from 'nanoid';  // 引入 nanoid 用于生成唯一 ID
import jsonData from './data.json';  // 引入树形数据

// 定义树节点的数据结构
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  isEditing?: boolean;  // 控制是否处于编辑状态
  originalLabel?: string;  // 保留原始标签内容
}

// 树形数据
const data = ref<TreeNode[]>(jsonData);

// 默认属性配置
const defaultProps = ref({
  children: 'children',  // 子节点属性名
  label: 'label'         // 标签属性名
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
    if (node.children) ids.push(...getAllNodeIds(node.children));  // 递归查找所有子节点
    return ids;
  }, [] as string[]);
};

// 添加子节点
const handleAddChild = (nodeData: TreeNode) => {
  const newNode: TreeNode = { id: nanoid(), label: '新子节点' };

  // 将新节点添加到当前节点的 children 中
  if (nodeData.children) {
    nodeData.children.push(newNode);
  } else {
    nodeData.children = [newNode];  // 如果没有 children 属性，初始化为包含新节点的数组
  }

  // 设置默认展开的节点
  defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
};

// 添加同级节点
const handleAddSibling = (nodeData: TreeNode) => {
  const newNode: TreeNode = { id: nanoid(), label: '新同级节点' };

  // 查找父节点
  const parentNode = findParentNode(data.value, nodeData.id);

  if (parentNode) {
    // 找到同级节点的位置
    const siblingNodeIndex = parentNode.children?.findIndex(child => child.id === nodeData.id);
    if (siblingNodeIndex !== undefined && siblingNodeIndex !== -1) {
      if (!parentNode.children) parentNode.children = [];  // 确保 children 存在
      parentNode.children.splice(siblingNodeIndex + 1, 0, newNode);  // 在当前节点后插入新节点
    }
  } else {
    // 如果没有父节点，直接将新节点添加为根节点
    data.value.push(newNode);
  }

  // 设置默认展开的节点
  defaultExpandedKeys.value = [...defaultExpandedKeys.value, newNode.id];
};

// 递归查找父节点
const findParentNode = (nodes: TreeNode[], nodeId: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.children?.some(child => child.id === nodeId)) return node;  // 找到父节点
    const found = node.children && findParentNode(node.children, nodeId);  // 递归查找子节点
    if (found) return found;
  }
  return null;
};

// 删除节点
const handleDeleteNode = async (nodeData: TreeNode) => {
  try {
    // 提示用户确认删除
    await ElMessageBox.confirm('确定要删除该节点吗?', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });

    // 删除节点
    const parentNode = findParentNode(data.value, nodeData.id);
    if (parentNode) {
      parentNode.children = parentNode.children?.filter(node => node.id !== nodeData.id) || [];
    } else {
      // 删除根节点
      data.value = data.value.filter(node => node.id !== nodeData.id);
    }
  } catch (error) {
    // 用户取消删除操作
    console.log('删除操作被取消');
  }
};

// 启动编辑模式
const editNode = (nodeData: TreeNode) => {
  nodeData.originalLabel = nodeData.label;  // 保留原始标签内容
  nodeData.isEditing = true;
};

// 结束编辑模式
const stopEditing = (nodeData: TreeNode) => {
  nodeData.isEditing = false;
  // 如果编辑框中的值与原始标签不同，更新标签内容
  if (nodeData.label !== nodeData.originalLabel) {
    // 在这里可以进行额外的操作，比如保存更改等
  }
};

// 设置默认展开的节点
onMounted(() => {
  const allNodeIds = getAllNodeIds(data.value);  // 获取所有节点 ID
  defaultExpandedKeys.value = allNodeIds;  // 默认展开所有节点
  defaultCheckedKeys.value = [];  // 初始化选中的节点为空
});
</script>

<style scoped>
:deep(.el-tree-node__content) {
  width: 50px; /* 设置树节点内容区域的宽度 */
}

.node-label {
  cursor: pointer;
}

.action-buttons {
  margin-top: 5px;
}

.el-input {
  width: 120px; /* 可调整输入框宽度 */
}
</style>
