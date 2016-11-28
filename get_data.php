<?php

require 'db_connect.php';

$userid = $_POST['userid'];
$conn = db_connect();

$query = "select * from items where userid = '".$userid."'";
$result = $conn->query($query);

if(!$result) {
    echo 0;
    exit();
}

if($result->num_rows > 0) {
    $jsonData = array();
    $i=0;
    while($row = $result->fetch_assoc()) {
        if($row['complete'] == 0) {
            $completed = false;
        } else {
            $completed = true;
        }
        $jsonData[$i] = array('id'=>$row['itemid'],'value'=>$row['value'],'completed'=>$completed);
        // var_dump($jsonData);
        $i++;
    }
    echo json_encode($jsonData);
} else {
    echo 0;
}
