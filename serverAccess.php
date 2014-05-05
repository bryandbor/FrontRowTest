<?php
$connection = mysql_connect('127.0.0.1','root','@Greellow8') or die(mysql_error());
mysql_select_db('FrontRowTest', $connection) or die(mysql_error());
if (isset($_POST['newQuestion'])) {
    $qText = $_POST['newQuestion'];
    $query = "INSERT INTO FAQ (quest_text) VALUES ('"+$qText+"')";
    echo $query.'<br>';
    if (! $result = mysql_query($query, $connection)) {
        die('There was an error instering the new question.');
    }
} else {
    $query = 'SELECT * FROM FAQ';
    if (!$result = mysql_query($query, $connection)) {
        die('Unable to retrieve questions');
    } else {
        header('Content-Type: application/json');
        $jsonFAQ = '[ ';
        $qCounter = 0;
        while ($row = mysql_fetch_array($result)) {
            if ($qCounter != 0) {
                $jsonFAQ = $jsonFAQ.' , ';
            }
            $jsonFAQ = $jsonFAQ.'{ "id":"q'.$qCounter++.'", "qText":"'.$row['quest_text'].'"}';
        }
        $jsonFAQ = $jsonFAQ.' ]';
        echo $jsonFAQ;
    }
}
?>