const ElementList = document.querySelectorAll("*");
const iframeList = document.getElementsByTagName('iframe');
var tagNameList = ['button', 'input', 'a', 'div'];
// console.log(document);

function ProcessFrame(frame) {
    frame.style.opacity = 1;
    frame.style.border = "3px dashed red";
    console.log("iframe detected");

}

function ProcessElement(element) {
    const style = getComputedStyle(element);
    // console.log(style);
    const elementTagName = element.tagName.toLowerCase();
    if (tagNameList.includes(elementTagName) == true) {
        if (elementTagName == 'a' &&
                (getOpacity(style.color) < 0.2 || style.zIndex >= 1)) {
            element.style.border = "3px dashed blue";
        }
        else if (elementTagName == 'div' && 
                    (getOpacity(style.color) < 0.2 || style.zIndex >= 1)) {
            element.style.border = "3px dashed blue";
        }
        else if (elementTagName == 'button' && getOpacity(style.backgroundColor) < 0.2) {
            element.style.border = "3px dashed blue";
        } 
        else if (elementTagName == 'input' && 
                    (getBorder(style.border)[0] < 0.2 || style.zIndex >= 1)
                    && getOpacity(style.backgroundColor) < 0.2) {
            element.style.border = "3px dashed blue";
        }
    }
}


function getOpacity(style) {
    var string = style.replace(/\s/g, '');
    string = string.split(",");

    if (!string[3]) return 1;

    string = string[3].slice(0, -1);

    return string;
}

function getBorder(style) {
    const border = style
        .match(/\d+\.\d+|\d+\b|\d+(?=\w)/g)
        .map(function (v) { return +v; }); //=> [4567, 4, 2.12, 67]
    return border;
}

function isInIframe(element) {
    if (element.ownerDocument !== document) {
        return true;
    }
    else return false;
}


if (iframeList.length != 0) {
    for (var i = 0; i < ElementList.length; i++) {
        if (ElementList[i].tagName.toLowerCase() == "iframe") {
            ProcessFrame(ElementList[i]);
        } else {
            ProcessElement(ElementList[i]);
        }
    }
}
else {
    console.log("No iframe found!");
}