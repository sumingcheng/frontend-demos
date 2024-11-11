<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = `
<h2>
  你好，
</h2>
<p>
  这是一个 <em>基础的</em> <strong>tiptap</strong> 示例。当然，这里有你期望从文本编辑器中看到的各种基本文本样式。但等你看到列表就更惊喜了：
</p>
<ul>
  <li>
    这是一个带有一项的项目符号列表……
  </li>
  <li>
    ……或者有两项列表项。
  </li>
</ul>
<p>
  是不是很棒？而且所有这些都是可编辑的。但等等，还有更多。让我们试试代码块：
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  我知道，我知道，这很令人印象深刻。但这只是冰山一角。试试看，随便点击一下。别忘了查看其他示例。
</p>
<blockquote>
  哇，真是太棒了。干得好，孩子！👏
  <br />
  —— 妈妈
</blockquote>
`;

const editor = useEditor({
  extensions,
  content,
});
</script>

<template>
  <div>
    <div class="menu-bar" v-if="editor">
      <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
      >
        加粗
      </button>
      <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
      >
        斜体
      </button>
      <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
      >
        删除线
      </button>
      <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
      >
        代码
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        清除格式
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        清除节点
      </button>
      <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        段落
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        标题1
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        标题2
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        标题3
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        标题4
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        标题5
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        标题6
      </button>
      <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        无序列表
      </button>
      <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        有序列表
      </button>
      <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        代码块
      </button>
      <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        引用
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        水平线
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        强制换行
      </button>
      <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
      >
        撤销
      </button>
      <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
      >
        重做
      </button>
      <button
          @click="editor.chain().focus().setColor('#958DF1').run()"
          :class="{ 'is-active': editor.isActive({ color: '#958DF1' }) }"
      >
        紫色
      </button>
    </div>
    <EditorContent :editor="editor" class="tiptap"/>
  </div>
</template>
