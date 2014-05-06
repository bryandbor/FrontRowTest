function createXMLHttpRequest() {
    var xmlHttp;
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xmlHttp = new XMLHttpRequest();
    }
    return xmlHttp;
}

var xmlHttp = createXMLHttpRequest();

function pageLoaded() {
    //document.getElementById('replyArea').innerHTML = 'Just another test for connections';
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open("GET", "serverCheck.php", true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
    }
}

function handleServerResponse() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			var data = JSON.parse(xmlHttp.responseText);
			var resultArea = document.getElementById('replyArea');
			resultArea.innerHTML = "";
			for (var obj in data) {
				resultArea.innerHTML += "<tr>";
				if (data[obj].done == false) {
					resultArea.innerHTML += "<td><input type='checkbox'></td>";
				} 
				resultArea.innerHTML += "<td>"+data[obj].name+"</td>"+
				"<td>"+data[obj].description+"</td>";
				resultArea.innerHTML += "</tr>";
			}
		}
	}
}
    if (xmlHttp.readystate == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open("POST", "serverAccess", true);
        xmlHttp.onreadystatechange = handleServerResponse;
        if (Document.getElementById()) {
            
        }
        xmlHttp.send(variables);
    }
}
