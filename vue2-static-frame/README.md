# 目录结构

```bash
│  index.html  首页
│
├─css
│      element-v2.5.3.css   UI样式 2.5.3
│      main.css             公用样式
│      reset.css			初始化设置
│
├─images
├─js
│      element-ui-2.15.3.js	UI效果 2.15.3
│      index.js				每个HTML对应一个相同名字的VUE实例
│      main.js				公用JS
│      moment.js			处理时间的插件
│      pageOne.js			每个HTML对应一个相同名字的VUE实例
│      request.js			请求
│      vue-v2.5.2.js		Vue 2.5
│
└─page
        pageOne.html		子页面
```

# 注意事项

### 1.每添加一个新的静态页面，都要在根节点添加 *v-cloak*

```javascript
  <div id="index" v-cloak>
    <h1>{{title}}</h1>
  </div>
```

### 2.如果新的子页面需要使用Vue，请新建*.js文件，在新的*.js文件内写请求，创建Vue实例。

### 3.静态页面的js文件加载需要一定的先后顺序，如果页面加载不出来，可以看看js的顺序。

# 本地文件和CDN

建议只选择一种引入方式，如果选择CDN方式，可以再添加些相同版本不同托管的链接，这样如果一个CDN失效，还有一个备选。

```javascript
  <!-- 文件引入 -->
  <!-- <link rel="stylesheet" href="./css/element-v2.5.2.css"> -->

  <!-- CDN引入 -->
  <link href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.3/theme-chalk/index.css" rel="stylesheet">
```

