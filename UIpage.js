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

