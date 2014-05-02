/*** @jsx React.DOM */

function createXMLHttpRequest() {
    var xmlHttp;
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xmlHttp = new XMLHttpRequest;
    }
    return xmlHttp;
}

var xmlHttp = createXMLHttpRequest();
var resultData;

var questions = React.createClass({
    render: function(){
        var allQuestions = this.props.data.map(function(question){
            return <questionText qText={question.qText} />
        });
        return (
            <div>
                {allQuestions}
            </div>
        );
    }
});

var questionText = React.createClass({
    render: function() {
        return(
            <div>
                {this.props.qText}
            </div>
        );
    }
});

function pageLoaded() {
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open("GET","serverAccess.php",true);
        xmlHttp.onreadystatechange = handleServerResponse;
        xmlHttp.send(null);
    }
}

function handleServerResponse() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        resultData = JSON.parse(xmlHttp.responseText);
        document.getElementById('replyArea').innerHTML = resultData['q0'].qText;
    }
}

alert('Hello');

React.renderComponent(
    <questionText qText="testing" />,
    document.getElementById('replyArea')
);