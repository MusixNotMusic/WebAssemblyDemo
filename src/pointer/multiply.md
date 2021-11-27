## 执行编译
```
   emcc multiply.c -o multiply.js -s EXPORTED_FUNCTIONS="['_float_multiply']" -s EXPORTED_RUNTIME_METHODS="['cwarp', 'ccall']"
```

```js
    var float_multiply = Module.cwrap('float_multiply', 'number', ['number', 'number']);
    var result = float_multiply(5.2, 4.5);
```