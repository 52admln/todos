<?php
session_start();

unset($_SESSION['valid_user']);
setcookie("userid", "", time()-3600);
echo "您已注销。";
