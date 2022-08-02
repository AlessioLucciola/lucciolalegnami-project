<?php
    include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
      case "GET":
        try {
          $sql = "SELECT * FROM productcategories WHERE showed=1";
          $stmt = $conn->prepare($sql);
          $response = [];
          $data = [];
          if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {          
                $data[] = $row; 
            };
			    $response['products'] =  $data;
          } else {
            http_response_code(500);
            $response['message'] = 'Errore interno al server: impossibile recuperare la lista dei prodotti.';
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
    }
?>