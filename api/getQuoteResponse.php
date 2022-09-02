<?php
    $simpleTemplate = file_get_contents("media/quotesimpletemplate.html");
    $structuredHeaderTemplate = file_get_contents("media/quotestructuredheadertemplate.html");
    $structuredProductsTemplate = file_get_contents("media/quotestructuredproductstemplate.html");
    $structuredPriceTemplate = file_get_contents("media/quotestructuredpricetemplate.html");
    $structuredTransportTemplate = file_get_contents("media/quotestructuredtransporttemplate.html");
    $structuredNotesTemplate = file_get_contents("media/quotestructuredadditionalnotestemplate.html");
    $structuredFooterTemplate = file_get_contents("media/quotestructuredfootertemplate.html");
    include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $url_components = parse_url($_SERVER['REQUEST_URI']);
            parse_str($url_components['query'], $params);
            $id = $params['id'];
            $email = $params['email'];
            
            $data = [];
            try {
                $sql = "SELECT * FROM emails WHERE id=:id AND email=:email";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":id", $id, PDO::PARAM_STR);
                $stmt->bindParam(":email", $email, PDO::PARAM_STR);
                if ($stmt->execute()) {
                    $data = $stmt->fetch(PDO::FETCH_ASSOC);
                } else {
                    http_response_code(500);
                    echo 'Impossibile recuperare il tuo preventivo. Contattaci telefonicamente per risolvere il problema.';
                    exit();
                }
            } catch(PDOException $e) {
                http_response_code(500);
                echo $e;
                echo 'Impossibile recuperare il tuo preventivo. Contattaci telefonicamente per risolvere il problema.';
            }

            $name = $data['name'];
            $surname = $data['surname'];
            $phone = $data['phone'];
            $request = $data['request'];
            $response = json_decode($data['response']);
            $responseType = $response->type;
            $quoteResponse = $response->response;
            $quoteTransport = $response->transport;
            $quoteTotalPrice = $response->totalprice;
            $quoteProductList = $response->products;
            
            if($responseType === 'simpleResponse') {
                $variables = array();
                $variables['id'] = $id;
                $variables['name'] = $name;
                $variables['surname'] = $surname;
                $variables['phone'] = $phone;
                $variables['email'] = $email;
                $variables['request'] = $request;
                $variables['response'] = $quoteResponse;

                foreach($variables as $key => $value)
                {
                    $simpleTemplate = str_replace('{{ '.$key.' }}', $value, $simpleTemplate);
                }
                echo $simpleTemplate;
            } elseif ($responseType === 'structuredResponse'){
                $variables = array();
                $variables['id'] = $id;
                $variables['name'] = $name;
                $variables['surname'] = $surname;
                $variables['phone'] = $phone;
                $variables['email'] = $email;
                $variables['request'] = $request;
                $variables['response'] = $quoteResponse;
                $variables['totalprice'] = $quoteTotalPrice;
                $variables['transport'] = $quoteTransport;

                foreach($variables as $key => $value)
                {
                    $structuredHeaderTemplate = str_replace('{{ '.$key.' }}', $value, $structuredHeaderTemplate);
                    $structuredPriceTemplate = str_replace('{{ '.$key.' }}', $value, $structuredPriceTemplate);
                    $structuredTransportTemplate = str_replace('{{ '.$key.' }}', $value, $structuredTransportTemplate);
                    $structuredNotesTemplate = str_replace('{{ '.$key.' }}', $value, $structuredNotesTemplate);
                    $structuredFooterTemplate = str_replace('{{ '.$key.' }}', $value, $structuredFooterTemplate);
                }

                $productHTMLFields = array();
                for ($i = 0; $i <= count($quoteProductList)-1; $i++) {
                    $product = $quoteProductList[$i];
                    $productHTML = $structuredProductsTemplate;
                    $productDescription = $product->product;
                    $productQuantity = $product->quantity;
                    $productPrice = $product->price;
                    $productTotalPrice = $productQuantity*$productPrice;
                    $productVariables = array();
                    $productVariables['itemid'] = $i+1;
                    $productVariables['description'] = $productDescription;
                    $productVariables['quantity'] = $productQuantity;
                    $productVariables['price'] = $productPrice;
                    $productVariables['totalprice'] = $productTotalPrice;
                    foreach($productVariables as $key => $value)
                    {
                        $productHTML = str_replace('{{ '.$key.' }}', $value, $productHTML);
                    }
                    array_push($productHTMLFields, $productHTML);
                }

                $finalHTMLPage = "";
                $finalHTMLPage = $finalHTMLPage . $structuredHeaderTemplate;
                foreach($productHTMLFields as $item)
                {
                    $finalHTMLPage = $finalHTMLPage . $item;
                }
                $finalHTMLPage = $finalHTMLPage . $structuredPriceTemplate;
                if (!empty($quoteTransport)) {
                    $finalHTMLPage = $finalHTMLPage . $structuredTransportTemplate;
                }
                if (!empty($quoteResponse)) {
                    $finalHTMLPage = $finalHTMLPage . $structuredNotesTemplate;
                }
                $finalHTMLPage = $finalHTMLPage . $structuredFooterTemplate;
                echo $finalHTMLPage;
            } else {
                echo 'Impossibile recuperare il tuo preventivo. Contattaci telefonicamente per risolvere il problema.';
            }
            break;
    }
?>