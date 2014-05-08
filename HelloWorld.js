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
    render: function() {
        var aCounter = 0;
        return (
            <div>
                {this.props.data.map(function(answer, i){
                    return(
                        <div className="row">
                            <div className="col-md-12">
                                <div 
                                    key={aCounter++} 
                                    className="answer"
                                    onMouseOver={this.props.onMouseOver}
                                    onMouseOut={this.props.onMouseOut}>
                                        {answer.aText}
                                </div>
                            </div>
                        </div>
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
                    var classN="question"
                    var buttonC="btn btn-default"
                    if (qCounter == this.props.selectedQuestion) {
                        buttonC="btn btn-info"
                    }
                    return(
                        <div className="row separateQuestions">
                            <div className="col-sm-1 col-md-1">
                                <button 
                                    onClick={this.handleQuestionSelect.bind(this, i)} 
                                    key={qCounter++} 
                                    className={buttonC}>
                                        ASK
                                </button>
                            </div>
                            <div className="col-sm-11 col-md-11">
                                <span 
                                    className={classN}
                                    onMouseOver={this.props.onMouseOver}
                                    onMouseOut={this.props.onMouseOut}>
                                        {question.qText}
                                </span>
                            </div>
                        </div>
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
            allAs:[{"id":"a1", "aText":"Select a question to view its answers."}],
            selectedQuestion: -1,
            questionInfo: false,
            answerInfo:false,
            info:true,
            infoText: '',
            buttonState: 'disabled'
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
        }
    },
    componentDidMount: function(){
        this.loadQuestions();
    },
    addQuestion: function() {
        if (this.state.newQ != '') {
            var question = encodeURIComponent(this.state.newQ);
            var params = 'newQ='+question;
            this.setState({
                newQ: ''
            });
            if (newQHttp.readyState == 0 || newQHttp.readyState == 4) {
                newQHttp.open("POST", "serverAccess.php", true);
                newQHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                newQHttp.onreadystatechange = function() {
                    if (newQHttp.readyState == 4 && newQHttp.status == 200) {
                        if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
                            xmlHttp.open("POST", "serverAccess.php", true);
                            xmlHttp.onreadystatechange = function(){
                                resultData = JSON.parse(xmlHttp.responseText);
                                this.setState({ allQs:resultData});
                            }.bind(this);
                            xmlHttp.send(null);
                        }
                    } else if (newQHttp.readyState == 4 && newQHttp.status != 200) {
                        alert('There was an error contacting the server');
                    }
                    this.loadQuestions;
                }.bind(this);
                newQHttp.send(params);
            }
        } else {
            alert('Please input your question text and then retry.');
        }
    },
    handleNewQ: function(event){
        this.setState({
            newQ: event.target.value
        });
    },
    changeButton: function() {
        if (this.state.newQ != '') {
            this.setState({
                buttonState: ''
            });
        } else {
            this.setState({
                buttonState: 'disabled'
            });
        }
    },
    selectQ: function(key){
        this.setState({
            selectedQuestion: key
        });
        var question = encodeURIComponent(this.state.allQs[key].qText);
        var params = 'answersForQuestion='+question;
        if (selectQHttp.readyState == 0 || selectQHttp.readyState == 4) {
            selectQHttp.open("POST", "serverAccess.php", true);
            selectQHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            selectQHttp.onreadystatechange = function() {
                if (selectQHttp.readyState == 4 && selectQHttp.status == 200) {
                    var tempAnswers = JSON.parse(selectQHttp.responseText);
                    if (tempAnswers == '') {
                        var noAnswers = [{"id":"a0", "aText":"There are no answers to this question posted yet."}]
                        this.setState({ allAs: noAnswers});
                    } else {
                        this.setState({ allAs: tempAnswers });
                    }
                } else if (selectQHttp.readyState == 4 && selectQHttp.status != 200) {
                    alert('There was an error retrieving the answers');
                }
            }.bind(this);
            var question = encodeURIComponent(this.state.allQs[key].qText);
            selectQHttp.send(params);
        }
    },
    render: function() {
        var classString = '';
        if (this.state.info) {
            classString = 'info';
        } else if (this.state.questionInfo) {
            classString = 'questionInfo';
        } else if (this.state.answerInfo) {
            classString = 'answerInfo';
        }
        return(
            <div>
                <div className="row">
                    <div className="col-sm-8 col-md-8">
                        <h3 
                            onMouseOver={this.qHover}
                            onMouseOut={this.mouseAway}>
                                Questions
                        </h3>
                        <questions 
                            data={this.state.allQs} 
                            onSelectQ={this.selectQ} 
                            selectedQuestion={this.state.selectedQuestion}
                            onMouseOver={this.qHover}
                            onMouseOut={this.mouseAway}
                        />
                    </div>
                    <div className="col-sm-4">
                        <h3
                            onMouseOver={this.aHover}
                            onMouseOut={this.mouseAway}>
                                Answers
                        </h3>
                        <answers
                            data={this.state.allAs}
                            onMouseOver={this.aHover}
                            onMouseOut={this.mouseAway}
                        />
                    </div>
                </div>
                <div className="row newQuestion">
                    <div className="col-md-10 col-sm-9">
                        <textarea 
                            placeholder="Enter a new question here..." 
                            ref="neqQuest" 
                            className="qInput" 
                            onChange={this.handleNewQ} 
                            onKeyUp={this.changeButton}
                            value={this.state.newQ}>
                        </textarea>
                    </div>
                    <div className="col-md-2 col-sm-3">
                        <button 
                            onClick={this.addQuestion} 
                            className="btn-lg btn-success pull-right"
                            disabled={this.state.buttonState}>
                                Add Question
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});
        
React.renderComponent(
    <qAndA />,
    document.getElementById('questionArea')
);