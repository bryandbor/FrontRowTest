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
    clickHandler:function() {
        alert('An answer was selected.');
    },
    render: function() {
        var thisData = this.props.initialData.map(function (a){
            return (<answer onClick={this.clickHandler} aText={a.aText}/> );
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
        this.props.onClick();
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
        alert('A question was pressed');
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
    render: function() {
        var onClickHandler = this.props.onClick;
        return(
            <div onClick={this.onClickHandler}>
                <button type="button" onClick={onClickHandler}>Ask Question</button>
            </div>
        );
    }
});

var questionTextArea = React.createClass({
    handleKeyUp: function(e) {
        //alert("New question is now: "+this.refs.newQuest.getDOMNode().value);
    },
    render: function() {
        return(
            <div>
                <textarea 
                    placeholder="Enter a new question here" 
                    ref="newQuest"
                    onChange={this.handleKeyUp}>
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
    clickHandler: function() {
        var q = this.refs.newQuest.getDOMNode().value;
        alert('New question should be: '+q);
    },
    render: function() {
        return(
            <div>
                <questions data={this.props.initialData} />
                <questionTextArea 
                    currentQ={''}
                />
                <questionInputButton onClick={this.clickHandler}/>
            </div>
        );
    }
});
        
var qAndA = React.createClass({
    getInitialState: function() {
        return{
            allQs:[{"id":"q2", "qText":"Just a test question"}],
            allAs:[]
        }
    },
    loadQuestions: function() {
        if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
            xmlHttp.open("POST", "serverAccess.php", true);
            
            xmlHttp.send(null);
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
            for (var obj in this.state.allQs) {
                alert('allQs outside: '+resultData[obj].qText);
            }
        }
    },
    componentDidMount: function(){
        this.loadQuestions();
    },
    updateInfo:function(){
        if (this.state.allAs == this.props.q1a) {
            this.setState({allAs:this.props.q2a});
        } else {
            this.setState({allAs:this.props.q1a});   
        }
    },
    handleClick: function(e) {
        alert('answers are being clicked');
    },
    render: function() {
        return(
            <div>
                <questionInputArea 
                    initialData={this.state.allQs}
                />
                <button onClick={this.updateInfo}>Update Info</button>
                <answers 
                    initialData={this.state.allAs}
                />
            </div>
        );
    }
});

React.renderComponent(
    <qAndA q1a = {q1Answers} q2a={q2Answers}/>,
    document.getElementById('questionArea')
);