console.log("Popup script loaded");

const toggleBtn = document.getElementById("toggleBtn");
const indicator = document.getElementById("indicator");
const makePresentationBtn = document.getElementById("makePresentationBtn");
const resetBtn = document.getElementById("resetBtn");
const presentationContainer = document.getElementById("presentationContainer");
const contextInput = document.getElementById("contextInput");

let recording = false;
let history = [];
let context = "";
let presentation = "";

contextInput.addEventListener("input", (e) => {
    context = e.target.value;
});

async function makePresentation() {
    chrome.runtime.sendMessage({ action: "GET_HISTORY" }, async (response) => {
        if (response) {
            history = response.history;
            console.log(history)
            const res = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ history, context })
            })
            const data = await res.json();
            console.log(data)
            const presentation = data.output[0].content[0].text;
            presentationContainer.innerHTML = `<pre><code>${presentation}</code></pre>`;
            chrome.storage.local.set({ presentation: presentation });
        }
    });

}

async function helloWorld() {
    const response = await fetch("http://localhost:3000/");
    const data = await response.text();
    console.log(data);
}

chrome.storage.local.get(['recording', 'history', 'presentation'], (result) => {
    recording = result.recording || false;
    history = result.history || [];
    presentation = result.presentation || "";

    indicator.style.backgroundColor = recording ? "green" : "red";
    toggleBtn.textContent = recording ? "Stop" : "Start";
    presentationContainer.innerHTML = `<pre><code>${presentation}</code></pre>`;
});

resetBtn.addEventListener("click", () => {
    history = [];
    presentation = "";
    recording = false;

    // Update UI elements immediately
    indicator.style.backgroundColor = "red";
    toggleBtn.textContent = "Start";
    presentationContainer.innerHTML = `<pre><code></code></pre>`;

    chrome.storage.local.set({ history: history, presentation: presentation, recording: recording });
});

makePresentationBtn.addEventListener("click", makePresentation);

toggleBtn.addEventListener("click", () => {
    recording = !recording;
    indicator.style.backgroundColor = recording ? "green" : "red";
    toggleBtn.textContent = recording ? "Stop" : "Start";

    chrome.runtime.sendMessage({ action: "SET_RECORDING", recording: recording }, (response) => {
        if (response && response.success) {
            console.log("Recording set successfully");
        }
    });

    chrome.storage.local.set({ recording: recording });
});

