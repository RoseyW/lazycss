# LazyCss

### 简述

让你使用更简便的方式来编辑样式表

### 安装方法

普通页面使用：

```
<script src="http://cdn.basedigit.net/lazycss-base/lazyCss.global.js" />
```

Node.js使用

```npm i lazycss-base
npm i lazycss-base
```

### 使用方法

普通页面：

```javascript
<script>
let style = lazyCss.useStyle({
	cssName: {
		cssList
	}
})

//响应式
style.cssName.cssListParam = cssValue;
</script>
```

Node.js:

```javascript
import useStyle from "lazycss-base/build/types/lazyCss";
let style = useStyle({
    cssName: {
        cssList
    }
})

//响应式
style.cssName.cssListParam = cssValue;
```



### 示例

```	html
<html>
...
<body>
<div class="demo"></div>
</body>
...
</html>
```

```javascript
let style = useStyle({
	demo: {
	width: 30
	}
})
```



### 工作原理

LazyCss会在useStyle时会根据传入的样式表生成对应的css样式表



### 更多功能

#### rgb2hex

将rgb色彩值转为16进制色彩值

```javascript
let demo = rgb(124,124,124); //#7c7c7c
```

在 useStyle 中使用

```javascript
let style = useStyle({
    demo: {
        color: rgb(124,124,124),
        //semblable
        color: '#7c7c7c',
    }
})
```



