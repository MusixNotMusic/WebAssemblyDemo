# WebAssemblyDemo
```bash
emcc demo\marching-cubes.c -Os -s WASM=1 -s SIDE_MODULE=1 -o demo\marching-cubes.wasm
```