// Get all element in the doc
const ElementList = document.querySelectorAll("*");
var listIframe = [];

console.log(document);

// function ProcessIframe(frame){
//     var elements = frame.contentWindow.document.querySelectorAll("*");
//     if(elements.length < 1) return;

//     for(var i = 0; i < elements.length; i ++ ){
//         if(elements[i].tagName.toUpperCase() == "IFRAME"){
//             console.log(elements[i]);

//             ProcessFrame(elements[i]);
//             ProcessIframe(elements[i]);
//         }else{
//             ProcessElement(elements[i]);
//         }
//     }
// }

function ProcessFrame(frame) {
    frame.style.opacity = 1;
    frame.style.border = "3px dashed red";
    console.log("IFRAME DETECTED");

}

function ProcessElement(element){
    const style = getComputedStyle(element);
    if (element.tagName.toLowerCase() == "button" && getOpacity(style) < 0.2) {
        // console.log('found' + element);
        element.style.border = "3px dashed blue";
    }
}

function getOpacity(style) {
    var string = style.backgroundColor.replace(/\s/g, '');
    string = string.split(",");

    if (!string[3]) return 1;

    // console.log(string);
    string = string[3].slice(0, -1);
    
    return string;
}

function isInIframe(element){
    if (element.ownerDocument !== document) {
        return true;
    }
    else return false;
}

for (var i = 0; i < ElementList.length; i++) {
    if (ElementList[i].tagName.toUpperCase() == "IFRAME") {
        listIframe.push(ElementList[i]); // Store "iframe" element
        ProcessFrame(ElementList[i]);
    } else {
        if (ElementList[i].ownerDocument !== document) {
            console.log("This " + ElementList[i] + " is in iframe");
            continue;
        }
        else ProcessElement(ElementList[i]);
    }
}