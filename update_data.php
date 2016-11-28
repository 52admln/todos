<?php

require 'db_connect.php';

$updateType = $_POST['type'];

switch ($updateType) {
    case 'single':
        update_single($_POST['delId'],$_POST['userid']);
        break;
    case 'all':
        update_all($_POST['userid']);
        break;
    default:
        # code...
        break;
}


function update_single ($id,$userid) {
    $conn = db_connect();

    $sel_query = "select * from items where itemid = '".$id."'";

    $is_complete = $conn->query($sel_query);
    $row = $is_complete->fetch_assoc();
    if($row['complete'] == 0) {
        $upd_query = "update items SET complete='1' where itemid='".$id."' and userid='".$userid."'";
    } else {
        $upd_query = "update items SET complete='0' where itemid='".$id."' and userid='".$userid."'";
    }
    echo $row['complete'];
    $result = $conn->query($upd_query);


    if(!$result) {
        echo 0;
        exit();
    }
}

function update_all($userid) {
    $conn = db_connect();
    $query = "select complete from items where userid='".$userid."' and complete = 0";

    $result = $conn->query($query);


    if($result->num_rows > 0) {
        $query = "update items SET complete='1' where userid='".$userid."'";
    } else {
        $query = "update items SET complete='0' where userid='".$userid."'";
    }

    $result = $conn->query($query);

    if(!$result) {
        echo 0;
        exit();
    }
}
