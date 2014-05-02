function createXMLHttpRequest() {
    var xmlHttp;
    if (window.ActiveXObject) {
        try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            xmlHttp = false;
        }
    } else {
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            xmlHttp = false;
        }
    }
    
    if (!xmlHttp) {
        alert("can't create AJAX object");
    } else {
        return xmlHttp;
    }
}

var xmlHttp = createXMLHttpRequest();

function pageLoaded() {
    if (xmlHttp.readystate == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open("POST", "serverAccess", true);
        xmlHttp.onreadystatechange = handleServerResponse;
        if (Document.getElementById()) {
            
        }
        xmlHttp.send(variables);
    }
}