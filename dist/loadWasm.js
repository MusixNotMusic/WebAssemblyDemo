const imports = {
  env: {
    'memory': new WebAssembly.Memory({initial: 256, maximum: 256}),
    '__memory_base': 0,
    'tableBase': 0,
    'table': new WebAssembly.Table({initial: 10, element: 'anyfunc'}),
    abort:alert
 }
};

function loadWebAssembly (path) {
  return fetch(path)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      return new WebAssembly.Instance(module, imports);
    });
}

function loadWebAssembly1 (path, imports = {}) {
  return fetch(path)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      console.log('module', module);
      return WebAssembly.instantiate(module, imports);
    });
}

function loadWebAssembly2 (path) {
  return WebAssembly.instantiateStreaming(fetch(path), imports);
}

window.loadWebAssembly = loadWebAssembly;
window.loadWebAssembly1 = loadWebAssembly1;
window.loadWebAssembly2 = loadWebAssembly2;
