<?php

$result = array();
for ($i=0; $i < 5; $i++) {
    $result[$i] = array('id'=>$i,'value'=>'value','$completed'=>false);
}


echo json_encode($result);
