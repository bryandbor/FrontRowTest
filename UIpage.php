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
						Testing if this is working.
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