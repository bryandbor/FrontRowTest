<?php
$connection = mysql_connect("192.186.227.166", "ideas", "@Greellow8") or die(mysql_error());
mysql_select_db('FrontRowTest', $connection) or die(mysql_error());
if (isset($_POST['newQ'])) {
    header('Content-Type: application/json');
    $qText = $_POST['newQ'];
    $query = "INSERT INTO FAQ (quest_text) VALUES ('"+$qText+"')";
    if (! $result = mysql_query($query, $connection)) {
        die('There was an error instering the new question.');
    } else {
        echo 'Question successfully inserted';
    }
} else if (isset($_POST['answersForQuestion'])) {
    $answersForQuestion = $_POST['answersForQuestion'];
    $query = "SELECT * FROM Answers WHERE quest_num = (SELECT quest_num FROM FAQ WHERE quest_text = '".$answersForQuestion."')";
    if(! $result = mysql_query($query, $connection)) {
        die('There was an error retrieving answers for that question');
    } else {
        header('Content-Type: application/json');
        $jsonAnswers = '[ ';
        $aCounter = 0;
        if (empty($result)) {
            $jsonAnswers = $jsonAnswers.'{ "id":"a'.$aCounter++.'", "aText":"There are no answers for this question currently."}';
        } else {
            while ($row = mysql_fetch_array($result)) {
                if ($aCounter != 0) {
                    $jsonAnswers = $jsonAnswers.' , ';
                }
                $jsonAnswers = $jsonAnswers.'{ "id":"a'.$aCounter++.'", "aText":"'.$row['answer_text'].'"}';
            }
        }
        $jsonAnswers = $jsonAnswers.' ]';
        echo $jsonAnswers;
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