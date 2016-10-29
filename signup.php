<?php
session_start();

require 'db_connect.php';
require 'data_validate.php';

$username = $_POST['username'];
$password = $_POST['password'];
$password2 = $_POST['confirm_password'];


if(!filled_out($_POST)) {
    echo '未填写表单，请重新填写';
    exit();
}
if(!valid_username($username)) {
    echo '用户名不符合要求，请重新填写';
    exit();
}
if($password != $password2) {
    echo '两次输入的密码不匹配，请检查后重试';
    exit();
}
if((strlen($password) < 6) || (strlen($password) > 25)) {
    echo '密码长度不符合要求，请重新输入';
    exit();
}

register($username, $password);

/**
 * @param $username 用户名
 * @param $password 密码
 *
 */
function register($username, $password) {
    $conn = db_connect();
    $result =  $conn->query("select * from users where username='".$username."'");
    if(!$result) {
        echo '不能执行SQL语句';
        exit();
    }
    if ($result->num_rows>0) {
        echo '用户名已被注册，请输入其他用户名。';
        exit();
    }
    $result = $conn-> query("insert into users(username, password) values ('".$username."', sha1('".$password."'))");
    if(!$result) {
        echo '注册时发生错误。';
        exit();
    } else {
        $_SESSION['valid_user'] = $username;
        $conn->close();
        echo 0;
    }
}
