# LazyCss

### 简述

让你使用更简便的方式来编辑样式表。

如果您觉得该项目比较好的话，请给予一个“star”吧，这对于我来说非常重要。

英文文档部分基于有道翻译，可能会有部分差错。

如果有任何建议或者看法，请在仓库下方进行评论。

### 联系方式

Email: roseywrong@163.com

### 安装方法

普通页面使用：

```
<script src="http://cdn.basedigit.net/lazycss-base/lazyCss.global.js" />
```

latest version: 0.1.11

Node.js使用

```npm i lazycss-base
npm i lazycss-base
```

latest version: 0.1.18

### 文件列表

| 文件路径             | 文件说明              |
| -------------------- | --------------------- |
| ./lazycss-base.d.ts  | ts声明文件            |
| ./api-extractor.json | api-extractor配置文件 |
| ./rollup.config.ts   | rollup配置文件        |
| ./tsconfig.json      | ts配置文件            |
| ./test               | 测试文件              |
| ./src/index.ts       | 入口文件              |
| ./src/styleBase.ts   | useStyle              |
| ./src/styleLib.ts    | useLib/setStyleLib    |
| ./src/cssSuffix.ts | cssSuffix |
| ./src/styleUnit.ts | setUnit |
| ./src/styleRender.ts | 核心渲染器 |
| ./src/styleMedia.ts | 媒体查询（自适应）文件 |
| ./src/stylePreset.ts | 预设样式文件 |

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

### 兼容浏览器 [0.1.9]

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

**目前支持方案：基于List表，为样式进行自动化组装-webkit-、-moz-、-o-标签**

### 组件库的可用性 [0.1.11]

**styleLib.ts**

使用useLib可以从预先定义的styleLib中获取全部/部分样式以加载到当前页面进行使用

```javascript
export default const styleLib = setStyleLib("namespace",{
    Button: {
        width: 30,
    }
})
```

```javascript
import { useStyle,useLib } from "lazycss-base"
import demoLib from "./demoLib"
//use lib
useLib(demoLib);
//use single component
useLib(demoLib.Button);
let style = useStyle({
    //other style list
});
```

**现在，namespace量尚未被使用。**

**部分样式功能尚未被实现。**

### 伪元素支持 [0.1.12]

使用更加简便方式来为dom添加伪元素

```javascript
let style = useStyle({
    demo: {
        _hover:{
        	backgroundColor: '#1e9fff'
    	},
    	_active:{},
        _focus:{},
        _before:{},
        _after:{},
    }
})
```

在**0.1.12**版本中**已被支持**，但并没有被**规范化输入**

在**0.1.13**版本中，响应式刷新已被实现

double underline method has been cancel in **0.1.19**

### 子样式 [0.1.13]

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

已在**0.1.13**版本中支持

### 设置单位 [0.1.16]

这个功能允许你设置每一个需要自动添加的默认单位。

这允许你使用任何一个可以被css识别的单位，LazyCss并不会对此进行检查。

```javascript
import {setUnit, useStyle} from "lazycss-base"
setUnit("length", "%");

//use array
setUnit(["length", "height", "width"], "%");

let style = useStyle({
    //... more code
})

//other use method
setUnit("width","%");
style.demo.width = 22;
setUnit("width","px");
//equal to
style.demo.width = '22%';
```

**0.1.17**支持使用数组

### Future

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

*通过js控制的响应式设计，不依托于css的media媒体查询

```javascript
setMedia(config: mediaConfig, cssList: cssList)
```

```javascript
import { setMedia, mediaConfig } from "lazycss-base"

let media_config = mediaConfig({ 
    //some config... 
});
let media = setMedia(media_config, {
    //some css...
});
```

example:

```javascript
let style = useStyle({
    demo: {
        width: 65
    }
})
let media_config = mediaConfig({ 
    rule: { maxWidth: 200, maxHeight: 300 }, //when max width greater than 200,and max height greater than 300
});
let media = setMedia(media_config, {
    demo: {
        width: 55
    }
});
```

#### 自动后缀

**cssSuffix.ts**

将会提供一个自动化后缀功能，配合**setUnit**轻松完成单位添加功能。

#### 编译器

将css的编译时间提前至编译期，并且将css独立出来。

#### 字符匹配模式

使用使用特殊的样式定义方式来定义一个匹配字符的css样式表

```javascript
import { useStyle } from "lazycss-base"

let style = useStyle({
    '[col-${size}]': (size: string) => {
        //match col-1,col-2...
        return {
            width: size
        }
    }
})
```

