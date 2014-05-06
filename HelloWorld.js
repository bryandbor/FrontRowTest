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

var resultData;

var xmlHttp = createXMLHttpRequest();
var newQHttp = createXMLHttpRequest();
var selectQHttp= createXMLHttpRequest();

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
        if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
            xmlHttp.open("POST", "serverAccess.php", true);
            xmlHttp.onreadystatechange = function() {
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
        alert('A new question: '+this.state.newQ);
        this.setState({
            newQ: ''
        });
        if (newQHttp.readyState == 0 || newQHttp.readyState == 4) {
            newQHttp.open("POST", "serverAccess.php", true);
            newQHttp.setRequestHeader('Content-type', 'application/json');
            newQHttp.onreadystatechange = function() {
                if (newQHttp.readyState == 4 && newQHttp.status == 200) {
                    alert(newQHttp.responseText);
                } else if (newQHttp.readyState == 4 && newQHttp.status != 200) {
                    alert('There was an error contacting the server');
                }
                this.loadQuestions;
            };
            var question = encodeURIComponent(this.state.newQ);
            newQHttp.send("newQ="+question);
        }
    },
    handleNewQ: function(event){
        this.setState({
            newQ: event.target.value
        });
    },
    selectQ: function(key){
        alert('Selected question: '+this.state.allQs[key].qText);
        if (selectQHttp.readyState == 0 || selectQHttp.readyState == 4) {
            selectQHttp.open("POST", "serverAccess.php", true);
            selectQHttp.onreadystatechange = function() {
                if (selectQHttp.readyState == 4 && selectQHttp.status == 200) {
                    alert(selectQHttp.responseText);
                } else if (selectQHttp.readyState == 4 && selectQHttp.status != 200) {
                    alert('There was an error retrieving the answers');
                }
            };
            var question = encodeURIComponent(this.state.allQs[key].qText);
            selectQHttp.send('answersForQuestion='+question);
        }
    },
    render: function() {
        return(
            <div>
                <questions data={this.state.allQs} onSelectQ={this.selectQ}/>
                <textarea placeholder="Enter a new question here..." ref="neqQuest" className="qInput" onChange={this.handleNewQ} value={this.state.newQ}></textarea>
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