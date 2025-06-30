async function makePresentation() {
    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "gpt-4.1",
            input: `$You are being used in a service and not as a chatbot so dont talk just generate. Your are supposed to make a markdown marp presentation from the following history (just return the markdown, nothing else): ${JSON.stringify(history)}`
        })
    });

    console.log((await response.json()).output[0].content[0].text);

    const { html, css } = marp.render(markdown);
    presentationContainer.innerHTML = html;
    const pdf = await html2pdf(presentationContainer);
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}

console.log("Popup script loaded");

const toggleBtn = document.getElementById("toggleBtn");
const indicator = document.getElementById("indicator");
const makePresentationBtn = document.getElementById("makePresentationBtn");
const resetBtn = document.getElementById("resetBtn");
const presentationContainer = document.getElementById("presentationContainer");


let recording = false;
let history = [];

// Load saved state when popup opens
chrome.storage.local.get(['recording', 'history'], (result) => {
    recording = result.recording || false;
    history = result.history || [];
    
    // Update UI to reflect saved state
    indicator.style.backgroundColor = recording ? "green" : "red";
    toggleBtn.textContent = recording ? "Stop" : "Start";
});

resetBtn.addEventListener("click", () => {
    history = [];
    chrome.storage.local.set({ history: history });
});

makePresentationBtn.addEventListener("click", makePresentation);

toggleBtn.addEventListener("click", () => {
    recording = !recording;
    indicator.style.backgroundColor = recording ? "green" : "red";
    toggleBtn.textContent = recording ? "Stop" : "Start";
    
    // Save state to storage
    chrome.storage.local.set({ recording: recording });
});

chrome.history.onVisited.addListener((historyItem) => {
    if (recording) { 
        history.push(historyItem);
        // Save updated history to storage
        chrome.storage.local.set({ history: history });
        console.log(history);
    }
});

