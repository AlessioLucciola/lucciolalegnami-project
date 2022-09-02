<?php session_start();
    include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            try {
                $sql = "SELECT * FROM news WHERE expiry >= CURRENT_DATE()";
                $stmt = $conn->prepare($sql);
                $response = [];
                $data = [];
                if ($stmt->execute()) {
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {          
                        if (!isset($_COOKIE['news'.$row['id']])) {
                            $row['read'] = '0';
                        } else {
                            $row['read'] = '1';
                        }
                        $data[] = $row;
                    };
                    $response['news'] = $data;
                } else {
                    http_response_code(500);
                    $response['message'] = 'Errore interno al server: impossibile recuperare le notizie';
                    break;
                }
                http_response_code(200);
                $response['message'] = 'OK';
                echo json_encode($response);
            } catch(PDOException $e) {
                http_response_code(500);
                $response['message'] = $e->getMessage();
                echo json_encode($response);
            }
        break;
        case "DELETE":
            if (isset($_SESSION['session_useruuid'])) {
                if ($_SESSION['session_userrole'] === 'admin') {
                    $data = json_decode(file_get_contents('php://input'));
                    $url_components = parse_url($_SERVER['REQUEST_URI']);
                    parse_str($url_components['query'], $params);
                    $id = $params['newsId'];

                    try {
                        $response = [];
                        $sql = "DELETE FROM news WHERE id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(":id", $id, PDO::PARAM_STR);
                        if ($stmt->execute()) {
                            http_response_code(200);
                            $response['message'] = 'OK';
                            echo json_encode($response);
                            exit();
                        } else {
                            http_response_code(500);
                            $response['message'] = 'Errore interno al server: impossibile eliminare la notizia.';
                            exit();
                        }
                    } catch(PDOException $e) {
                        http_response_code(500);
                        $response['message'] = $e->getMessage();
                        echo json_encode($response);
                        exit();
                    }
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
                break;
            }
        break;
        case "PUT":
            if (isset($_SESSION['session_useruuid'])) {
                if ($_SESSION['session_userrole'] === 'admin') {
                    $data = json_decode(file_get_contents('php://input'));
                    $id = $data->newsId;
                    $title = $data->newsTitle;
                    $text = $data->newsText;
                    $expiry = $data->newsExpiry;

                    try {
                        $response = [];
                        $sql = "INSERT INTO news (id, title, text, expiry) VALUES (DEFAULT, :title, :text, :expiry)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(":title", $title, PDO::PARAM_STR);
                        $stmt->bindParam(":text", $text, PDO::PARAM_STR);
                        $stmt->bindParam(":expiry", $expiry, PDO::PARAM_STR);

                        if ($stmt->execute()) {
                            http_response_code(200);
                            $response['message'] = 'OK';
                            echo json_encode($response);
                            exit();
                        } else {
                            http_response_code(500);
                            $response['message'] = 'Errore interno al server: impossibile eliminare la notizia.';
                            exit();
                        }
                    } catch(PDOException $e) {
                        http_response_code(500);
                        $response['message'] = $e->getMessage();
                        echo json_encode($response);
                        exit();
                    }
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
                break;
            }
        break;
    }
?>