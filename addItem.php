<?php

require 'db_connect.php';

$userid = $_POST['userid'];
$todo = $_POST['todo'];
$completed = $_POST['completed'];

$conn = db_connect();
$query = "insert into items(value, complete, userid) values ('".$todo."', '".$completed."', '".$userid."')";
$result = $conn->query($query);

$query = "select * from items where userid = '".$userid."'";
$data = $conn->query($query);

if(!$result) {
    echo 0;
    exit();
}

if($data->num_rows > 0) {
    $jsonData = array();
    $i=0;
    while($row = $data->fetch_assoc()) {
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
}
