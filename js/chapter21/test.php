<?php
    header("Content-Type: text/plain");
    echo <<<EOF
Name: {$_POST['username']}
Email: {$_POST['useremail']}
EOF;
?>