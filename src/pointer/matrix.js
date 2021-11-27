// cwrap float_multiply_matrix
var float_multiply_matrix = Module.cwrap(
    'float_multiply_matrix', 'number', ['number', 'number', 'number']
  );
  
var width = 10;
var height = 5;
var data = new Float32Array(width * height);
for (var i = 0; i < width * height; i++) {
    data[i] = i;
}

var dataSize = data.length * data.BYTES_PER_ELEMENT;
var dataHeadAddress = Module._malloc(dataSize);

// 堆内存地址分配
var dataHeap = new Uint8Array(Module.HEAP8.buffer, dataHeadAddress, dataSize);
// 赋值堆内存地址
dataHeap.set(new Uint8Array(data.buffer));

// 初始化 指针地址
var pointers = new Int32Array(height);
for (var i = 0; i < pointers.length; i++) {
    pointers[i] = dataHeadAddress + i * width * data.BYTES_PER_ELEMENT;
}

var pointsSize = pointers.length * pointers.BYTES_PER_ELEMENT;
var pointHeadAddress = Module._malloc(pointsSize);

var pointsHeap = new Uint8Array(Module.HEAP8.buffer, pointHeadAddress, pointsSize);
pointsHeap.set(new Uint8Array(pointers.buffer));


float_multiply_matrix(pointsHeap.byteOffset, height, width);

var result = new Float32Array(dataHeap.buffer, dataHeap.byteOffset, data.length);

// Free memory
Module._free(pointerHeap.byteOffset);
Module._free(dataHeap.byteOffset);