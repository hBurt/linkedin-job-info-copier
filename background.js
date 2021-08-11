// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
}

browser.menus.create({
    id: "copy-job-info",
    title: "Copy Job Info",
    contexts: ["all"],
    documentUrlPatterns: ["*://www.linkedin.com/jobs/search/*"]
});

browser.menus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-job-info") {
        browser.tabs.sendMessage(tab.id, {text: 'report_back'});//, doStuffWithDom);
    }
});


