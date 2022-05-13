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
import { useStyle } from "lazycss-base"
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
import { useStyle } from "lazycss-base"
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
import { rgb } from "lazycss-base"
let demo = rgb(124,124,124); //#7c7c7c
```

在 useStyle 中使用

```javascript
import { useStyle,rgb } from "lazycss-base"
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

#### 子样式



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
    demo_child:{
        position: 'relative'
    }
}
style.addChild(demo, testStyle);
```

#### 预设的样式组

**stylePreset.ts**

使用方法来预设一组样式，这一组样式将会传入到useStyle中，当使用该样式组时，useStyle将会调用预设样式来生成。

```javascript
import { useStyle,setPreStyle } from "lazycss-base"
let presetStyle = setPreStyle({
    //useStyle在调用presetStyle时，会传入一个value参数，用户可根据value参数来返回对应的css样式表
    preDemo: (value: any) => { return { width: value } }
    //返回的样式表需要为 K:V 集合，并使用驼峰命名，useStyle会自动将驼峰转为横杠
})

let style = useStyle({
    demo: {
        preDemo: "传参示例",
    }
}, presetStyle)
```

#### 组件库的可用性

**styleLib.ts**

使用useLib可以从预先定义的styleLib中获取全部/部分样式以加载到当前页面进行使用

```javascript
export default const styleLib = setStyleLib({
    Button: {
        width: 30,
    }
})
```

```javascript
import { useStyle,useStyleLib } from "lazycss-base"
import demoLib from "./demoLib"
//use lib
useLib(demoLib);
//use single component
useLib(demoLib.Button);
let style = useStyle({
    //other style list
});
```

#### 响应式设计

**styleMedia.ts**

在useStyle使用useMedia来实现对该元素的响应式设计

```javascript
import { useStyle, styleMedia } from "lazycss-base"
let style = useStyle({
    demo: {
        width: 20
    }
})

let media_screen_width_max_768 = styleMedia("screen", "max-width", 768, {
    demo: {
        width: 30
    }
})

style.setMedia(media_screen_width_max_768);
```

