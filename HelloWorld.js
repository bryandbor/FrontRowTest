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

/*function pageLoaded() {
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
}*/

var xmlHttp = createXMLHttpRequest();

var answers = React.createClass({
    clickHandler:function(a) {
        alert('An answer was selected. '+a);
    },
    render: function() {
        var aCounter = 0;
        return (
            <div>
                {this.props.data.map(function(answer, i){
                    return(
                        <div onClick={this.clickHandler.bind(this, i)} key={aCounter++} className="answer">{answer.aText}</div>
                    );
                }, this)}
            </div>
        );
    }
});

var questions = React.createClass({
    handleQuestionSelect: function(key) {
        alert('Question '+ key +' was selected.');
        this.props.onSelectQ(key);
    },
    render: function () {
        var qCounter = 0;
        return (
            <div>
            {this.props.data.map(function(question, i) {
                return(
                    <div onClick={this.handleQuestionSelect.bind(this, i)} key={qCounter++} className="question">{question.qText}</div>
                );
            }, this)}
            </div>
        );
    }
});
        
var qAndA = React.createClass({
    getInitialState: function() {
        return{
            newQ: '',
            allQs:[{"id":"q2", "qText":"The questions are loading..."}],
            allAs:[{"id":"a1", "aText":"Select a question to view its answers."}]
        }
    },
    loadQuestions: function() {
        alert('Questions loading');
        if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
            xmlHttp.open("POST", "serverAccess.php", true);
            xmlHttp.onreadystatechange = function(allQs) {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resultData = JSON.parse(xmlHttp.responseText);
                    this.setState({ allQs: resultData });
                } else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
                    alert('Error retrieving the questions. Error code: '+xmlHttp.status);
                }
            }.bind(this);
            xmlHttp.send(null);
            for (var obj in this.state.allQs) {
                alert('allQs outside: '+resultData[obj].qText);
            }
        }
    },
    componentDidMount: function(){
        this.loadQuestions();
    },
    addQuestion: function() {
        alert('A new question.'+this.state.newQ);
        if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
            xmlHttp.open("POST", "serverAccess.php", true);
            xmlHttp.setRequestHeader('Content-type', 'application/json');
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    alert(xmlHttp.responseText);
                }
                this.loadQuestions;
            };
            xmlHttp.send("newQ=test");
        }
    },
    updateInfo:function(){
        
    },
    handleNewQ: function(event){
        this.setState({
            newQ: event.target.value
        });
    },
    render: function() {
        return(
            <div>
                <questions data={this.state.allQs} />
                <textarea placeholder="Enter a new question here..." ref="neqQuest" className="qInput" onChange={this.handleNewQ}>{this.state.newQ}</textarea>
                <button onClick={this.addQuestion} className="qButton">Add Question</button>
                <answers data={this.state.allAs} />
            </div>
        );
    }
});
        
React.renderComponent(
    <qAndA className=""/>,
    document.getElementById('questionArea')
);