<template>
  <div class="tree-container">
    <n-tree
        block-line
        :data="treeData"
        :expanded-keys="expandedKeys"
        @update:expanded-keys="expandedKeys = $event"
        :expand-on-click="false"
        checkable
        :render-suffix="renderSuffix"
    />
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, ref } from 'vue';
import { NButton, NTree } from 'naive-ui';
import { cloneDeep } from 'lodash';
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
    children: item.children ? transformData(item.children, `${ parentKey }${ index }-`) : undefined
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

const addSibling = (node: TreeNode, nodes: TreeNode[]) => {
  console.log('添加同级节点到:', node);
  const newSibling: TreeNode = {
    text: '新同级段落',
    label: '新同级段落',
    key: `${ node.key.slice(0, -1) }${ nodes.length }`
  };

  const newData = cloneDeep(treeData.value);
  const targetNodes = node.key.split('-').slice(0, -1).reduce((acc, cur) => acc[Number(cur)].children!, newData);
  targetNodes.push(newSibling);

  treeData.value = newData;
  expandedKeys.value.push(newSibling.key);
  console.log('添加后的树数据:', treeData.value);
};

const addChild = (node: TreeNode) => {
  console.log('添加子节点到:', node);
  const newChild: TreeNode = {
    text: '新子段落',
    label: '新子段落',
    key: `${ node.key }-${ node.children?.length || 0 }`
  };

  const newData = cloneDeep(treeData.value);
  const targetNode = node.key.split('-').reduce((acc, cur) => acc[Number(cur)], newData);
  if (!targetNode.children) targetNode.children = [];
  targetNode.children.push(newChild);

  treeData.value = newData;
  expandedKeys.value.push(newChild.key);
  console.log('添加后的树数据:', treeData.value);
};

const deleteNode = (node: TreeNode) => {
  console.log('删除节点:', node);

  const newData = cloneDeep(treeData.value);
  const traverse = (nodes: TreeNode[]) => {
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.key === node.key) {
        nodes.splice(i, 1);
        console.log('节点已删除:', node);
        return true;
      }
      if (n.children) {
        if (traverse(n.children)) {
          if (n.children.length === 0) delete n.children;
          return true;
        }
      }
    }
  };

  traverse(newData);
  treeData.value = newData;
  console.log('删除后的树数据:', treeData.value);
};

const renderSuffix = (option: TreeNode) => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h(NButton, {
      size: 'small',
      type: 'primary',
      onClick: () => addSibling(option, option.key.split('-').length === 1 ? treeData.value : option.key.split('-').slice(0, -1).reduce((nodes, key) => nodes[Number(key)].children!, treeData.value))
    }, { default: () => '添加同级段落' }),

    h(NButton, {
      size: 'small',
      type: 'info',
      onClick: () => addChild(option)
    }, { default: () => '添加子段落' }),

    h(NButton, {
      size: 'small',
      type: 'error',
      onClick: () => deleteNode(option)
    }, { default: () => '删除当前段落' })
  ]);
};
</script>

<style scoped>
/* 样式根据需要调整 */
</style>
