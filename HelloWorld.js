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

var otherData = [
    {"id":"thing1", "qText":"This will be a question."},
    {"id":"thing2", "qText":"This will be another question."}
];


var resultData;
var unparsed;

function pageLoaded() {
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open('POST', 'serverAccess.php', true);
        xmlHttp.onreadystatechange = handleServerResponse;
        xmlHttp.send(null);
    }
}

function handleServerResponse() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        unparsed = xmlHttp.responseText;
        otherData = unparsed;
        resultData = JSON.parse(xmlHttp.responseText);
    }
}

var xmlHttp = createXMLHttpRequest();

var questions = React.createClass({
    render: function () {
        var thisData = this.props.data.map(function (q) {
            return <questionText qText={q.qText} />;
        });
        return (
            <div>
                {thisData}
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

var questionInputButton = React.createClass({
    render: function() {
        return(
            <div>
                <button type="button">Ask Question</button>
            </div>
        );
    }
});

var questionTextArea = React.createClass({
    handleKeyUp: function(e) {
        alert('User pressed: '+e);
    },
    render: function() {
        return(
            <div>
                <textarea 
                    placeholder="Enter a new question here" 
                    onkeyup={this.handleKeyUp}>
                    {this.props.currentQ}
                </textarea>
            </div>
        );
    }
});

var questionInputArea = React.createClass({
    getInitialState: function() {
        return {
            currentQ:''
        };
    },
    render: function() {
        return(
            <div>
                <questions data={otherData} />
                <questionTextArea 
                    currentQ={''}
                />
                <questionInputButton />
            </div>
        );
    }
});

React.renderComponent(
    <questionInputArea />,
    document.getElementById('questionArea')
);