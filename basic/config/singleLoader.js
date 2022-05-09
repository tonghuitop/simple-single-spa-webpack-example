function createScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  })
}

// 加载子应用
function loadApp(url, globalVar, entrypoints) {
  return async () => {
    for (let i = 0; i < entrypoints.length; i++) {
      await createScript(url + entrypoints[i])
    }
    return window[globalVar]
  }
}

export { createScript, loadApp }
