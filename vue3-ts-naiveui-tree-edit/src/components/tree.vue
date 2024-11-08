<script lang="ts" setup>
import { ref } from 'vue';
import { Draggable } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import data from './data.json';

// 使用响应式引用存储树数据
const treeData = ref(data);

// 添加同级段落
const addSibling = (node: any, parentNode: any) => {
  const newNode = { text: '这是一个新同级段落', children: [] };
  parentNode.children.push(newNode);
};

// 添加子段落
const addChild = (node: any) => {
  const newNode = { text: '这是一个新子段落', children: [] };
  if (!node.children) {
    node.children = [];
  }
  node.children.push(newNode);
};

// 删除当前段落
const deleteNode = (node: any, parentNode: any) => {
  // 如果没有父节点 (比如根节点)，则不允许删除
  if (!parentNode) return;

  const index = parentNode.children.indexOf(node);
  if (index !== -1) {
    // 使用 Vue 的响应式方法来删除当前节点
    parentNode.children.splice(index, 1);
  }
};
</script>

<template>
  <div class="tree-container">
    <Draggable v-model="treeData" ref="tree" virtualization class="tree" style="height: 80vh">
      <template #default="{ node, stat }">
        <div class="node-wrapper">
          <span v-if="stat.children.length" @click="stat.open = !stat.open" class="toggle-btn">
            <svg v-if="stat.open" class="toggle-icon open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 width="24" height="24">
              <path d="M6 9l6 6 6-6z"/>
            </svg>
            <svg v-else class="toggle-icon closed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                 height="24">
              <path d="M9 6l6 6-6 6z"/>
            </svg>
          </span>
          <span class="node-text">{{ node.text }}</span>

          <div class="actions">
            <!-- 根据节点层级决定按钮行为 -->
            <button v-if="stat.level === 1" @click="addChild(node)" class="action-btn add">
              添加子段落
            </button>
            <button v-else @click="addSibling(node, stat.parent)" class="action-btn add">
              添加同级段落
            </button>

            <!-- 删除当前段落按钮 -->
            <button v-if="node !== treeData.value" @click="deleteNode(node, stat.parent)" class="action-btn delete">
              删除当前段落
            </button>
          </div>
        </div>
      </template>
    </Draggable>
  </div>
</template>

<style lang="scss" scoped>
// 使用 @use 来引入样式
@use './index.scss' as *;
</style>
