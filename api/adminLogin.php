<?php
    include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
	switch($method) {
		case "POST":
			$response = [];
			$data = json_decode(file_get_contents('php://input'));
			$username = $data->username;
			$password = $data->password;
			
			if(empty($username) || empty($password)) {
				http_response_code(401);
				$response['message'] = 'Credenziali non valide';
				echo json_encode($response);
                exit();
			} else {
                try {
                    /*$sql = "INSERT INTO users VALUES (0, :username, :password, :role)";
                    $password_hash = password_hash($password, PASSWORD_BCRYPT);
                    $role = "admin";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
                    $stmt->bindParam(':password', $password_hash, PDO::PARAM_STR);
                    $stmt->bindParam(':role', $role, PDO::PARAM_STR);
                    $stmt->execute();*/
                    
                    $sql = "SELECT uuid, username, password, role FROM users WHERE username = :username";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(":username", $username, PDO::PARAM_STR);
                    if ($stmt->execute()) {
                        $user = $stmt->fetch(PDO::FETCH_ASSOC);
                        if (password_verify($password, $user['password']) === false) {
                            http_response_code(401);
                            $response['message'] = 'Credenziali non valide.';
                            echo json_encode($response);
                            exit();
                        } else {
                            session_start();
                            $_SESSION['session_username'] = $user['username'];
                            $_SESSION['session_useruuid'] = $user['uuid'];
                            $_SESSION['session_userrole'] = $user['role'];
                            http_response_code(200);
                        }
                    }
                } catch(PDOException $e) {
                    http_response_code(500);
					$response['message'] = "Si è verificato un errore generico con codice: \"500\"";
					echo json_encode($response);
                    exit();
                }
            }
	}

?>