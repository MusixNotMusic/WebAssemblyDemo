```js
// Import function from Emscripten generated file
float_multiply_array = Module.cwrap(
  'float_multiply_array', 'number', ['number', 'number', 'number']
);

// Create example data to test float_multiply_array
var data = new Float32Array([1, 2, 3, 4, 5]);

// Get data byte size, allocate memory on Emscripten heap, and get pointer
var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
var dataPtr = Module._malloc(nDataBytes);

// Copy data to Emscripten heap (directly accessed from Module.HEAPU8)
var dataHeap = new Uint8Array(Module.HEAPU8.buffer, ptr, nDataBytes);
dataHeap.set(new Uint8Array(data.buffer));

// Call function and get result
float_multiply_array(2, dataHeap.byteOffset, data.length);
var result = new Float32Array(dataHeap.buffer, dataHeap.byteOffset, data.length);

// Free memory
Module._free(dataHeap.byteOffset);
```
