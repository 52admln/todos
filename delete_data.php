<?php

require 'db_connect.php';


if($_POST['type'] == "delComplete") {
    $delArr = implode(",", $_POST['delArr']);
    $conn = db_connect();
    $userId = $_POST['userid'];
    $query = "delete from items where itemid in(".$delArr.") and userid = ".$userId."";

    $result = $conn->query($query);

    if(!$result) {
        echo 0;
        exit();
    }
}
if($_POST['type'] == "delSingle") {
    $delId = $_POST['itemid'];
    $userId = $_POST['userid'];
    $conn = db_connect();

    $query = "delete from items where itemid = ".$delId." and userid = ".$userId."";
    echo $query;
    $result = $conn->query($query);

    if(!$result) {
        echo 0;
        exit();
    }
}
