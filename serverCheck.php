<?php
header("Content-Type: application/json");
$jsonToDo = '[
	{ "id":"td1", "name":"Shopping", "description":"Buy some groceries", "done":false},
	{ "id":"td2", "name":"School", "description":"Do your homework", "done":false},
	{ "id":"td3", "name":"Mommy", "description":"Buy mom a bday gift", "done":false},
	{ "id":"td4", "name":"Car", "description":"Get your car fixed", "done":false}
]';
echo $jsonToDo;
?>