function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
}

function doRangeCopy(element){
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNode(element);
    selection.removeAllRanges();
    selection.addRange(range);

    const successful = document.execCommand('copy');

    selection.removeAllRanges();
}

function createTableCell(currentRow, displyText, link){
    var td = currentRow.insertCell();
    var a = document.createElement("a");
    a.setAttribute('style', 'font-weight: normal')
    a.setAttribute("href", link);
    a.text = displyText;
    td.appendChild(a);
}

function createTable(table, jobCompanyName, jobCompanyLink, jobTitleName, jobTitleLink){
    table.setAttribute("id", "jobInfoTable");
    document.body.appendChild(table);

    var tHead = table.createTHead();
    var row = tHead.insertRow();
    row.setAttribute("align", "left");
    
    createTableCell(row, jobCompanyName, jobCompanyLink);
    createTableCell(row, jobTitleName, jobTitleLink);
}

function copyJobInfo(){
    
    const baseElement = document.getElementsByClassName("jobs-unified-top-card__content--two-pane")[0];

    var baseJobCompanyElemenet = baseElement.children[1].children[0].children[0];

    var jobCompanyName = baseJobCompanyElemenet.innerText;
    var jobCompanyLink = baseJobCompanyElemenet.querySelector('a').href;
    var jobTitleName = baseElement.children[0].children[0].innerText;
    var jobTitleLink = baseElement.querySelector('a').href;

    const table = document.createElement("table");

    //inject table 
    createTable(table, jobCompanyName, jobCompanyLink, jobTitleName, jobTitleLink);

    //copy the injected content
    doRangeCopy(document.getElementById("jobInfoTable"));

    //remove injected table
    document.body.removeChild(table);
}

browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        // sernResponse sends information into the background worker
        //sendResponse(document.getElementsByClassName("jobs-unified-top-card__content--two-pane")[0].children[0].children[0].innerText);
        copyJobInfo();
    }
});