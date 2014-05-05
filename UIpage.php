<?php

?>
<html>
    <head>
<<<<<<< HEAD
		<script src="build/react.js"></script>
		<script src="build/JSXTransformer.js"></script>
		<script type="text/javascript" src="UIpage.js"></script>
=======
        <script src="build/react.js"></script>
        <script src="build/JSXTransformer.js"></script>
        <!--<script type="text/javascript" src="UIpage.js"></script>-->
        <script type="text/jsx" src="HelloWorld.js"></script>
>>>>>>> 30701c4d7787e733140b87e812bc921acf6b5335
        <link rel="stylesheet" type="text/css" href="UIpage.css">
    
    </head>
    
    <body onload="pageLoaded();">
<<<<<<< HEAD
        <h1>To Do List:</h1>
        <hr>
		<table id="replyArea">
		</table>
		<div id="listArea"></div>
		<script type="text/jsx">
			/*** @jsx React.DOM*/
			var HomeworkInfo = React.createClass({
				render: function() {
					return (
					<div>
						<h1>List of Homework</h1>
						<HomeworkList />
					</div>
					);
				}
			});
			
			var HomeworkList = React.createClass({
				render: function() {
					return(
						<div className="homeworkList">
							This will be a list of current homework.
						</div>
					);
				}
			});
			
			React.renderComponent(
				<HomeworkInfo />,
				document.getElementById("listArea")
			);
		</script>
=======
        <h1>Fequently Asked Questions</h1>
        <hr>
        <div id="questionArea"></div>
>>>>>>> 30701c4d7787e733140b87e812bc921acf6b5335
    </body>
    
</html>