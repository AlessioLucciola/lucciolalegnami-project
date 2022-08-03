<?php
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
      case "PUT":
		$input = json_decode(file_get_contents('php://input'));
		$cookieName = $input->cookieName;
        $cookieValue = $input->cookieValue;
        $cookieDuration = $input->cookieDuration;
		$response = [];

        if ($cookieName == '' || $cookieValue == '' || $cookieDuration == '') {
            http_response_code(400);
			$response['message'] = 'I parametri del cookie (nome, valore, durata) non possono essere vuoti';
        } else {
            try {  
                setcookie($cookieName, $cookieValue, time() + (int)$cookieDuration);
                http_response_code(200);
                $response['message'] = 'OK';
            } catch(PDOException $e) {
                http_response_code(500);
                $response['message'] = $e->getMessage();
            }
        }
        echo json_encode($response);
    }
?>