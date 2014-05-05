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
        var thisData = this.props.data.map(function (a){
            return (<answer onClick={this.clickHandler} aText={a.aText} key={aCounter++}/> );
        });
        return (
            <div>
                {thisData}
            </div>
        );
    }
});

var answer = React.createClass({
    clickHandler: function() {
        this.props.onClick(this.props.key);
    },
    render: function(){
        return(
            <div class="answers" onClick={this.clickHandler}>
                {this.props.aText}
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
                    <div onClick={this.handleQuestionSelect.bind(this, i)} key={qCounter++}>{question.qText}</div>
                );
            }, this)}
            </div>
        );
    }
});
        
var qAndA = React.createClass({
    getInitialState: function() {
        return{
            allQs:[{"id":"q2", "qText":"The questions are loading..."}],
            allAs:[{"id":"a1", "aText":"Select a question to view its answers."}]
        }
    },
    loadQuestions: function() {
        if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
            xmlHttp.open("POST", "serverAccess.php", true);
            xmlHttp.onreadystatechange = function(allQs) {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resultData = JSON.parse(xmlHttp.responseText);
                    this.setState({ allQs: resultData });
                    /*for (var obj in this.state.allQs) {
                        alert('allQs: '+resultData[obj].qText);
                    }*/
                } else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
                    alert('Error retrieving the questions.');
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
        alert('Hello');
        /*if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
            xmlHttp.open("POST", "ideasbyb.com/FrontRowTest/serverAccess.php", true);
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    alert(xmlHttp.responseText);
                }
            };
            xmlHttp.send("newQuestion="+this.refs.newQuest.getDOMNode().value);
        }*/
    },
    updateInfo:function(){
        
    },
    render: function() {
        return(
            <div>
                <questions data={this.state.allQs} />
                <textarea placeholder="Enter a new question here..." ref="neqQuest"></textarea>
                <button onClick={this.addQuestion}>Add Question</button>
                <answers data={this.state.allAs} />
            </div>
        );
    }
});
        
React.renderComponent(
    <qAndA />,
    document.getElementById('questionArea')
);