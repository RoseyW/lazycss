# LazyCss

### Describe

Let's you edit stylesheets in an easier way.

If you think this project is good, please give a "STAR", which is very important to me.

The English document is partly based on Youdao translation, which may have some errors.

If you have any suggestions or comments please leave them in the comments section below.

### Contact

Email: roseywrong@163.com

welcome to contact me if you have good idea or opinion.

### Install methods

on ordinary html：

```
<script src="http://cdn.basedigit.net/lazycss-base/lazyCss.global.js" />
```

latest version: 0.1.11

on Node.js:

```npm i lazycss-base
npm i lazycss-base
```

latest version: 0.1.18

### Files List

| 文件路径             | 文件说明               |
| -------------------- | ---------------------- |
| ./lazycss-base.d.ts  | ts声明文件             |
| ./api-extractor.json | api-extractor配置文件  |
| ./rollup.config.ts   | rollup配置文件         |
| ./tsconfig.json      | ts配置文件             |
| ./test               | 测试文件               |
| ./src/index.ts       | 入口文件               |
| ./src/styleBase.ts   | useStyle               |
| ./src/styleLib.ts    | useLib/setStyleLib     |
| ./src/cssSuffix.ts   | cssSuffix              |
| ./src/styleUnit.ts   | setUnit                |
| ./src/styleRender.ts | 核心渲染器             |
| ./src/styleMedia.ts  | 媒体查询（自适应）文件 |
| ./src/stylePreset.ts | 预设样式文件           |

**because i want not translate. so this part haven't english version.**

### Use methods

ordinary page：

```javascript
<script>
let style = lazyCss.useStyle({
	cssName: {
		cssList
	}
})

//use reactive
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

//use reactive
style.cssName.cssListParam = cssValue;
```

### Example

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

//use reactive
style.demo.width = 40;
```



### Run theory

lazycss will create css list to render in page when user use useStyle input style list

just only one!

### More function

#### rgb2hex

turn rgb to hex color

```javascript
let demo = rgb(124,124,124); //#7c7c7c
```

used in useStyle

```javascript
let style = useStyle({
    demo: {
        color: rgb(124,124,124),
        //semblable write method
        color: '#7c7c7c',
    }
})
```

### Special style

#### autoFlex

automation flex layout build

```javascript
let style = useStyle({
    demo: {
        autoFlex: "center flex-start"
    }
})
```

autoFlex accepts a string that can store two/one values that describe a Flex layout, this describe same css describe.

### Compatibility explorer [0.1.9]

Multi-browser style compatibility can be achieved with a single line of code

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

**Currently supported solutions: Automatic assembly of styles - webkit -, -moz -, -o- tags based on the List table**

### Availability of component libraries [0.1.11]

**styleLib.ts**

With useLib, you can get all/part of the style from the pre-defined styleLib to load into the current page for use.

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

**namespace not be used now.**

**'part style' functionality has not yet been implemented.**

### Support pseudo elements [0.1.12]

Use an easier way to add pseudo-elements to the DOM

```javascript
let style = useStyle({
    demo: {
        //support two mode，single underline[:](css2)，double underline[::](css3+)
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

is supported in **0.1.12**, but is **not** normalized input, so if you use this function, you should becareful.

In version **0.1.13**, reactive refresh was implemented

### Set Unit [0.1.16]

This function allows you to set every default units that needs to be added automatically.

This allows you to use any units recognized by CSS, and LazyCss does not check for this.

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

use array was support in **0.1.17**

### Child elements [0.1.13]

inhert style from father element

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

other add child method:

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

### Future

#### Preset style group

**stylePreset.ts**

use a function to preset style group, the style group will transmit into useStyle. when using elements in this group, useStyle will invoking this preset style to create css list.

```javascript
import { useStyle,setPreStyle } from "lazycss-base"
let presetStyle = setPreStyle({
    //When useStyle calls presetStyle, it passes in a value parameter, which can be used to return the CSS style sheet
    preDemo: (value: any) => { return { width: value } }
    //The returned stylesheet needs to be a K:V collection and be named with a hump, which useStyle automatically converts to a bar
})

let style = useStyle({
    demo: {
        preDemo: "传参示例",
    }
}, presetStyle)
```

#### Screen responsive design

**styleMedia.ts**
UseMedia is used in useStyle to implement responsive design for this element

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

*Responsive design controlled by JS, not relying on CSS media methods

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

#### Automatic suffix

**cssSuffix.ts**

There will be an automated suffix function that works with setUnit to easily add units.

#### Compiler

Move the compile of the CSS up to compile time and separate the CSS.

#### Letter match

Use a CSS style sheet that uses a special style definition to define a matching character

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

