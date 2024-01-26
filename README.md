# somit

> a tiny event emitter/listener
>
> 一个微型事件发射器/监听器

## override


### new Somit()
`new Somit(options:object)`
create somitter

```js
let somitter = new Somit(options);
```

### on()
`on(event:string|string[], callback:function):any`

regist a event listener.
```js
let sayHandler = (name, text) => {
	console.log(`${name}: ${text}.`);
};
somitter.on("say", sayHandler); // regist sayHandler listener to say event
somitter.on("laugh", () => console.log("HaHaHaHa!!!")); // regist a listener to laugh event
```

### off()
`somitter.off(event:string|string[], callback:function):status[]`

log out event listener.
```js
som
somitter.off("say", listener); // log out of the listener sayHandler from the say event
somitter.off("say"); // log out all say event listeners
somitter.off(["say", "laugh"]); // log out all say and laugh listeners
```

### emit()
`somitter.emit(event:string|string[], arg1:any, arg2:any, ...):any[]`

emitter event.
```js
somitter.emit("say", "Petter", "Hello World"); // emit say event
somitter.emit(["say", "laugh"], "Petter", "Hello World"); // emit say and laugh event
```

### lazyEmit()
`somitter.lazyEmit(event:string|string[], arg1:any, arg2:any, ..):any[]`

lazy emitter event.
```js
somitter.lazyEmit("say", "Petter", "Hello World"); // invalid
somitter.lazyEmit("say", "Petter", "Hello China"); // emit say even
```

## options

```js
{
	lazyTime: 1500, // lazyEmit delay time, default 1500ms
	ingoreError: false // ingore null event error report, default false
}
```