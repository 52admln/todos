<?php 
function filled_out($form_vars) {
  // test that each variable has a value
  foreach ($form_vars as $key => $value) {
     if ((!isset($key)) || ($value == '')) {
        return false;
     }
  }
  return true;
}

function valid_username($username) {
  // check an email address is possibly valid
  if (ereg('^[a-zA-z][a-zA-Z0-9_]{1,17}$', $username)) {
    return true;
  } else {
    return false;
  }
}
