# somit

> a tiny event emitter/listener
>
> 一个微型事件发射器/监听器

## override


### new Somit()
`new Somit(options:object)`
创建somit实例

```js
let somitter = new Somit(options);
```

### on()
`on(event:string|string[], callback:function):any`

注册事件监听器
```js
let sayHandler = (name, text) => {
	console.log(`${name}: ${text}.`);
};
somitter.on("say", sayHandler); // 为 say 事件注册一个 sayHandler 监听器
somitter.on("laugh", () => console.log("HaHaHaHa!!!")); // 为 laugh 事件注册一个监听器
```

### off()
`somitter.off(event:string|string[], callback:function):status[]`

注销事件监听器
```js
som
somitter.off("say", listener); // 注销 say 事件的 sayHandler 监听器
somitter.off("say"); // 注销所有 say 事件监听器
somitter.off(["say", "laugh"]); // 注销所有 say 和 laugh 事件监听器
```

### emit()
`somitter.emit(event:string|string[], arg1:any, arg2:any, ...):any[]`

发射事件
```js
somitter.emit("say", "Petter", "Hello World"); // 发射 say 事件
somitter.emit(["say", "laugh"], "Petter", "Hello World"); // 发射 say 和 laugh 时间
```

### lazyEmit()
`somitter.lazyEmit(event:string|string[], arg1:any, arg2:any, ..):any[]`

懒发射时间
```js
somitter.lazyEmit("say", "Petter", "Hello World"); // 无效
somitter.lazyEmit("say", "Petter", "Hello China"); // 发射say事件
```

## options

```js
{
	lazyTime: 1500, // 懒发射延时时长，默认为 1500ms
	ingoreError: false // 是否忽略空事件报错, 默认为 false
}
```