<?php session_start();
    include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $response = [];
            if (isset($_SESSION['session_useruuid'])) {
                if ($_SESSION['session_userrole'] === 'admin') {
                    try {
                        $sql = "SELECT * FROM emails";
                        $stmt = $conn->prepare($sql);       
                        $data = [];
                        if ($stmt->execute()) {
                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {          
                                $data[] = $row; 
                            };
                            $response['quotes'] =  $data;
                        } else {
                            http_response_code(500);
                            $response['message'] = 'Errore interno al server: impossibile recuperare la lista dei preventivi.';
                            echo json_encode($response);
                            exit();
                        }
                        http_response_code(200);
                        $response['message'] = 'OK';
                        echo json_encode($response);
                    } catch(PDOException $e) {
                        http_response_code(500);
                        $response['message'] = $e->getMessage();
                        echo json_encode($response);
                    }
                } else {
                    http_response_code(401);
                    $response['message'] = 'Errore: non hai i permessi necessari per eseguire questa azione.';
                    echo json_encode($response);
                }
            } else {
                http_response_code(401);
                $response['message'] = 'Errore: non hai i permessi necessari per eseguire questa azione.';
                echo json_encode($response);
            }
            break;
    }
?>