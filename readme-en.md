# LazyCss

### Describe

Let's you edit stylesheets in an easier way

### Install methods

on ordinary html：

```
<script src="http://cdn.basedigit.net/lazycss-base/lazyCss.global.js" />
```

on Node.js:

```npm i lazycss-base
npm i lazycss-base
```

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

#### Compatibility explorer

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

### Future

#### Support pseudo elements

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

#### Child elements

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

#### Availability of component libraries

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



