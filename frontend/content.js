console.log("Content script loaded");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);
    if(message.action === "EXTRACT_HTML") {
        const html = document.documentElement.outerHTML;
        sendResponse(html);
        return true;
    }
    return false;
});



