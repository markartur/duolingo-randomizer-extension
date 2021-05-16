let randomButton = document.getElementById("randomLesson");

randomButton.addEventListener("click", async () => {  
    let level = document.querySelector('input[name="levels"]:checked').value;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.sync.set({ level });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['runtime.js'],
    });
});


chrome.storage.sync.get("count", function (data) {
    document.getElementById("level1total").innerText = data.count.level1Count;
    document.getElementById("level2total").innerText = data.count.level2Count;
    document.getElementById("level3total").innerText = data.count.level3Count;
    document.getElementById("level4total").innerText = data.count.level4Count;
    document.getElementById("level5total").innerText = data.count.level5Count;
})