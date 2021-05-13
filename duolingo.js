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
