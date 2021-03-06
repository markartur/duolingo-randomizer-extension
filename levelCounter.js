var count = {}

function has(nodeList, selector) {
    return Array.from(nodeList).filter(e => e.querySelector(selector))
}

function containsLevel(nodeList, text) {
    return Array.from(nodeList).filter(e => containsDeep(e, text))
}

function containsDeep(elem, text) {
    return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
}

function getText(elem) {
    var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

    if (!nodeType) {
        // If no nodeType, this is expected to be an array
        for (; (node = elem[i]); i++) {
            // Do not traverse comment nodes
            ret += getText(node);
        }
    } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (see #11153)
        if (typeof elem.textContent === "string") {
            return elem.textContent;
        } else {
            // Traverse its children
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                ret += getText(elem);
            }
        }
    } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
    }
    // Do not include comment or processing instruction nodes

    return ret;
};

function countLevels(){
    let skills = document.querySelectorAll('div[data-test="skill"]');
    level1s = containsLevel(skills, '1');
    level2s = containsLevel(skills, '2');
    level3s = containsLevel(skills, '3');
    level4s = containsLevel(skills, '4');
    level5s = containsLevel(skills, '5');

    count.level1Count = level1s.length;
    count.level2Count = level2s.length;
    count.level3Count = level3s.length;
    count.level4Count = level4s.length;
    count.level5Count = level5s.length;

    chrome.storage.sync.set({ count });
}

countLevels();