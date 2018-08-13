<?php
include './connection.php';
$ftrain = json_decode(file_get_contents('php://input'));
$username = $ftrain->username;
$ftrainData = json_encode($ftrain->ftrain);
$query = "UPDATE `students` SET `ftrain`='$ftrainData' WHERE `username` = '$username'";
if (execute($db, $query)) {
    echo 'updated';
} else {
    echo execute($db, $query);
};