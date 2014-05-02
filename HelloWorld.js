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
    {"id":"thing2", "qText":"This will be another question."},
    {"id":"thing3", "qText":"This will be the third thing."}
];

var q1Answers = [
    {"id":"answer1", "aText":"This is the first answer to question 1."},
    {"id":"answer2", "aText":"This is the second answer to question 1."}
];

var q2Answers = [
    {"id":"answer1", "aText":"This is the first answer to question 2."},
    {"id":"answer2", "aText":"This is the second answer to question 2."}
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

var answers = React.createClass({
    render: function() {
        var thisData = this.props.data.map(function (a){
            return (<answer aText={a.aText}/> );
        });
        return (
            <div>
            {thisData}
            </div>
        );
    }
});

var answer = React.createClass({
    render: function(){
        return(
            <div class="answers">
                {this.props.aText}
            </div>
        );
    }
});

var questions = React.createClass({
    getInitialState: function() {
        return {
            qList : this.props.data
        };
    },
    render: function () {
        var thisData = this.state.qList.map(function (q) {
            return (<questionText qText={q.qText} />);
        });
        return (
            <div>
                {thisData}
            </div>
        );
    }
});

var questionText = React.createClass({
    onclick: function(e) {
        alert(this+' was pressed');
    },
    render: function() {
        return(
            <div
                onClick={this.onclick}>
                {this.props.qText}
            </div>
        );
    }
});

var questionInputButton = React.createClass({
    getInitialState: function() {
        return {};
    },
    onClickHandler: function(e) {
        alert('New question button was pressed.');
    },
    render: function() {
        return(
            <div onclick={this.onClickHandler}>
                <button type="button" onClick={this.onClickHandler}>Ask Question</button>
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
                    onKeyUp={this.handleKeyUp}>
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
                <questions data={this.props.initialData} />
                <questionTextArea 
                    currentQ={''}
                />
                <questionInputButton />
            </div>
        );
    }
});

React.renderComponent(
    <questionInputArea initialData={otherData}/>,
    document.getElementById('questionArea')
);
        
/*React.renderComponent(
    <answers data={q1Answers} />,
    document.getElementById('answerArea')
);*/