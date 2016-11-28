<?php

require 'db_connect.php';

$userid = $_POST['userid'];
$itemid = $_POST['itemid'];
$value = $_POST['value'];

$conn = db_connect();

$query = "update items SET value='".$value."' where itemid='".$itemid."' and userid='".$userid."'";

$result = $conn->query($query);

if(!$result) {
    echo 0;
    exit();
}
