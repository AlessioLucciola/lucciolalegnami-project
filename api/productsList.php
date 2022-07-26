<?php
    include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
      case "GET":
        try {
          $sql = "SELECT * FROM products WHERE showed=1";
          $stmt = $conn->prepare($sql);
          $response = [];
          $data = [];
          if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {          
                $data[] = $row; 
            };
            $response['status'] = 200;
            $response['message'] = 'OK';
          } else {
            $response['status'] = 500;
            $response['message'] = 'Errore interno al server: impossibile recuperare la lista dei prodotti.';
          }
          $response['products'] =  $data;
          echo json_encode($response);
        } catch(PDOException $e) {
          echo "Error: " . $e->getMessage();
        }
    }
?>