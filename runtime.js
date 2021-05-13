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


async function startRandomLesson() {

    chrome.storage.sync.get("level", ({ level }) => {
        let skills = document.querySelectorAll('div[data-test="skill"]');
        skills = containsLevel(skills, level);

        var n_elements = skills.length;
        if (n_elements > 0) {
            var random = Math.floor(Math.random() * n_elements);

            var selected = skills[random];

            selected.querySelector('div._15U-t').click();

            let start = document.querySelector('button[data-test="start-button"]');

            start.click();
        }
    });


}



startRandomLesson();