console.log("Background script loaded");

let history = [];
let recording = false;

chrome.history.onVisited.addListener((historyItem) => {
    console.log(recording)
    if (recording) {
        console.log("historyItem", historyItem);
        history.push(historyItem.url);
        chrome.storage.local.set({ history: history });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "GET_HISTORY") {
        console.log("GET_HISTORY called");
        sendResponse({ history: history });
        return true;
    }
    if (request.action === "RESET_HISTORY") {
        history = [];
        sendResponse({ success: true });
        return true;
    }
    if (request.action === "SET_RECORDING") {
        recording = request.recording;
        console.log("SET_RECORDING called", recording);
        sendResponse({ success: true });
        return true;
    }


});
