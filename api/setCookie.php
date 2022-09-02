<?php
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
      case "PUT":
		$url_components = parse_url($_SERVER['REQUEST_URI']);
		parse_str($url_components['query'], $params);
		$cookieName = $params['cookieName'];
        $cookieValue = $params['cookieValue'];
        $cookieDuration = $params['cookieDuration'];
		$response = [];

        if ($cookieName == '' $cookieValue == '' || $cookieDuration == '') {
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