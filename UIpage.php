<?php

?>
<html>
    <head>
		<script src="build/react.js"></script>
		<script src="build/JSXTransformer.js"></script>
		<script type="text/javascript" src="UIpage.js"></script>
        <link rel="stylesheet" type="text/css" href="UIpage.css">
    
    </head>
    
    <body onload="pageLoaded();">
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
    </body>
    
</html>