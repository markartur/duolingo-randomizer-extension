function injectScript(path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', path);
    node.appendChild(script);
}

injectScript(chrome.runtime.getURL('injected.js'), 'body');
