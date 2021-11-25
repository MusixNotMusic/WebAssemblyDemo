const imports = {
  env: {
    // memoryBase: 0,
    // memory: new WebAssembly.Memory({ initial: 256 })
    // tableBase: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
  }
};

export function loadWebAssembly (path) {
  return fetch(path)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      return new WebAssembly.Instance(module, imports);
    });
}

export function loadWebAssembly1 (path, imports = {}) {
  return fetch(path)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      return WebAssembly.instantiate(module, imports);
    });
}

export function loadWebAssembly2 (path) {
  return WebAssembly.instantiateStreaming(fetch(path), imports);
}

window.loadWebAssembly = loadWebAssembly;
window.loadWebAssembly1 = loadWebAssembly1;
window.loadWebAssembly2 = loadWebAssembly2;
