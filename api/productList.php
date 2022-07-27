<?php
  //Remember to remove the first two lines in final release
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  
  include 'dbConnect.php';
  $objDb = new DbConnect;
  $conn = $objDb->connect();

  $method = $_SERVER['REQUEST_METHOD'];
  switch($method) {
    case "GET":
      $url_components = parse_url($_SERVER['REQUEST_URI']);
      parse_str($url_components['query'], $params);
      $productCategory = $params['product'];
      $response = [];
  
      try {
            $sql = "SELECT name, longdescription FROM productcategories WHERE shortname=:product";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":product", $productCategory, PDO::PARAM_STR);
            if ($stmt->execute()) {
              $row = $stmt->fetch(PDO::FETCH_ASSOC);
              $response['categoryInfo'] = $row;
            } else {
              http_response_code(500);
              $response['message'] = 'Errore interno al server: impossibile recuperare la lista dei prodotti.';
              break;
            }
        
            $sql = "SELECT * FROM productlist WHERE tag=:product";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":product", $productCategory, PDO::PARAM_STR);
            $data = [];
            if ($stmt->execute()) {
              while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {          
                  $data[] = $row; 
              };
            $response['products'] =  $data;
            } else {
              http_response_code(500);
              $response['message'] = 'Errore interno al server: impossibile recuperare la lista dei prodotti.';
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