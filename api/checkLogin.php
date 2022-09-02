<?php session_start();
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $response = [];
            if (isset($_SESSION['session_useruuid'])) {
                http_response_code(200);
                $response['logged'] = true;
                $response['username'] = $_SESSION['session_username'];
                $response['uuid'] = $_SESSION['session_useruuid'];
                $response['role'] = $_SESSION['session_userrole'];
                echo json_encode($response);
            } else {
                echo  $_SESSION['session_useruuid'];
                http_response_code(200);
                $response['logged'] = false;
                echo json_encode($response);
            }
    }
?>