LazyCss

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



### 特别的样式

#### autoFlex

自动化flex构建

```javascript
let style = useStyle({
    demo: {
        autoFlex: "center flex-start"
    }
})
```

autoFlex接收一个字符串，字符串中可以存储两个/一个值，该值描述了一个flex布局的方式，该方式的描述方式与css相同



### Future

#### 兼容浏览器

使用一行代码就可以做到多浏览器样式兼容

```javascript
let style = useStyle({
    demo: {
        userSelect: none;
    }
})
```

Will output

```css
.demo {
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
}
```

#### 伪元素支持

使用更加简便方式来为dom添加伪元素

```javascript
let style = useStyle({
    demo: {
        hover:{
            backgroundColor: '#1e9fff'
        },
        //maybe use
        //支持两种模式，单下划线为:(css2)，双下划线为::(css3+)
        _hover:{
        	backgroundColor: '#1e9fff'
    	},
    	_active:{},
        _focus:{},
        _before:{},
        _after:{},
        __hover:{}
        __before:{}
    }
})
```

#### 样式继承

从父元素上继承样式

```javascript
let style = useStyle({
    demo: {
        children:{
            test:{
                width: 30
            }
        }
    }
})
```

另一种添加方式

```javascript
let style = useStyle({
    demo: {
        width: 30
    }
})
let testStyle = {
    width:30
}
style.addChild(demo, testStyle);
```



