<template>
  <div class="tree-container">
    <n-tree
        block-line
        :data="treeData"
        :expanded-keys="expandedKeys"
        @update:expanded-keys="expandedKeys = $event"
        :expand-on-click="false"
        :checkable="false"
        :render-suffix="renderSuffix"
    />
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, ref } from 'vue';
import { NButton } from 'naive-ui';
import rawData from './data.json';

interface TreeNode {
  label: string;
  key: string;
  text?: string;
  children?: TreeNode[];
}

const transformData = (data: any[], parentKey = ''): TreeNode[] => {
  return data.map((item, index) => ({
    ...item,
    label: item.text,
    key: `${ parentKey }${ index }`,
    children: item.children ? transformData(item.children, `${ parentKey }${ index }-`) : undefined,
  }));
};

const treeData = ref<TreeNode[]>(transformData(rawData));
const expandedKeys = ref<string[]>([]);

const initExpandedKeys = (nodes: TreeNode[]) => {
  nodes.forEach(node => {
    if (!expandedKeys.value.includes(node.key)) expandedKeys.value.push(node.key);
    if (node.children) initExpandedKeys(node.children);
  });
};

onMounted(() => {
  initExpandedKeys(treeData.value);
});

// 添加同级节点
const addSibling = () => {
  console.log("添加同级节点");
};

// 添加子节点
const addChild = () => {
  console.log("添加子节点");
};

// 删除节点
const deleteNode = () => {
  console.log("删除节点");
};

// 渲染后缀
const renderSuffix = () => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h(NButton, {
      size: 'small',
      type: 'primary',
      onClick: () =>
          addSibling(),
    }, { default: () => '添加同级段落' }),

    h(NButton, {
      size: 'small',
      type: 'info',
      onClick: () => addChild(),
    }, { default: () => '添加子段落' }),

    h(NButton, {
      size: 'small',
      type: 'error',
      onClick: () => deleteNode(),
    }, { default: () => '删除当前段落' }),
  ]);
};
</script>

<style scoped>
/* 样式根据需要调整 */
</style>
