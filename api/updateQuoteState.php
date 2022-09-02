<?php session_start(); 
    $simpleTemplate = file_get_contents("media/quotesimpletemplate.html");
    require('sendgrid-php/sendgrid-php.php');
	include('config.php');
    include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "POST":
            if (isset($_SESSION['session_useruuid'])) {
                if ($_SESSION['session_userrole'] === 'admin') {
                    $data = json_decode(file_get_contents('php://input'));
                    $id = $data->quoteId;
                    $state = $data->quoteState;
                    
                    try {
                        $sql = "UPDATE emails SET state = :state WHERE id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(":state", $state, PDO::PARAM_STR);
                        $stmt->bindParam(":id", $id, PDO::PARAM_STR);
                        $stmt->execute();
                    } catch(PDOException $e) {
                        http_response_code(500);
                        $response['message'] = 'Si è verificato un errore durante la modifica dello stato del preventivo nel database';
                        echo json_encode($response);
                        exit;
                    }
                    http_response_code(200);
                    $response['message'] = 'Stato modificato correttamente.';
                    echo json_encode($response);
                    break;
                } else {
                    http_response_code(401);
                    $response['message'] = 'Errore: non hai i permessi per eseguire questa azione.';
                    echo json_encode($response);
                    break;
                }
            } else {
                http_response_code(401);
                $response['message'] = 'Errore: non hai i permessi per eseguire questa azione.';
                echo json_encode($response);
            }
            break;
    }
?>