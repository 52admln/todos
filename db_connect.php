<?php
/**
 * @return mysqli 数据库连接
 */
function db_connect() {
    $result = new mysqli('127.0.0.1', 'demo', 'aabbcc123', 'demo');
    if(!$result) {
        echo '不能连接到数据库';
        exit();
    } else {
        return $result;
    }
}
