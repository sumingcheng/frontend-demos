<template>
  <div class="tree-container">
    <n-tree
        block-line
        :data="treeData"
        :expanded-keys="expandedKeys"
        @update:expanded-keys="expandedKeys = $event"
        :expand-on-click="false"
        :checkable="false"
        :render-suffix="ButtonGroup"
    />
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, ref } from 'vue';
import { NButton } from 'naive-ui';
import { nanoid } from 'nanoid'; // 引入 nanoid
import rawData from './data.json';

interface TreeNode {
  label: string;
  key: string;
  children?: TreeNode[];
}

const transformData = (data: any[]): TreeNode[] => {
  return data.map(item => ({
    label: item.text,
    key: nanoid(), // 使用 nanoid 生成唯一 key
    children: item.children ? transformData(item.children) : undefined,
  }));
};

const treeData = ref<TreeNode[]>(transformData(rawData));

// 默认展开所有节点
const expandedKeys = ref<string[]>([]);

const initExpandedKeys = (nodes: TreeNode[]) => {
  nodes.forEach(node => {
    expandedKeys.value.push(node.key);  // 将每个节点的key加到expandedKeys
    if (node.children) {
      initExpandedKeys(node.children);  // 递归子节点
    }
  });
};

// 在mounted生命周期内，初始化展开的节点
onMounted(() => {
  initExpandedKeys(treeData.value);
});

const addSibling = () => console.log("添加同级节点");
const addChild = () => console.log("添加子节点");
const deleteNode = () => console.log("删除节点");

const ButtonGroup = () => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h(NButton, {
      size: 'small',
      type: 'primary',
      onClick: addSibling,
    }, { default: () => '添加同级段落' }),

    h(NButton, {
      size: 'small',
      type: 'info',
      onClick: addChild,
    }, { default: () => '添加子段落' }),

    h(NButton, {
      size: 'small',
      type: 'error',
      onClick: deleteNode,
    }, { default: () => '删除当前段落' }),
  ]);
};
</script>

<style scoped>
/* 样式根据需要调整 */
</style>
