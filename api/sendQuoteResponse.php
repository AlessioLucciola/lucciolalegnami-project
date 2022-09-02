<?php session_start();
    $simpleTemplate = file_get_contents("media/quotesimpletemplate.html");
    $simpleTemplateCopy = file_get_contents("media/quotesimpletemplatecopy.html");
    $structuredHeaderTemplate = file_get_contents("media/quotestructuredheadertemplate.html");
    $structuredHeaderTemplateCopy = file_get_contents("media/quotestructuredheadertemplatecopy.html");
    $structuredProductsTemplate = file_get_contents("media/quotestructuredproductstemplate.html");
    $structuredPriceTemplate = file_get_contents("media/quotestructuredpricetemplate.html");
    $structuredTransportTemplate = file_get_contents("media/quotestructuredtransporttemplate.html");
    $structuredNotesTemplate = file_get_contents("media/quotestructuredadditionalnotestemplate.html");
    $structuredFooterTemplate = file_get_contents("media/quotestructuredfootertemplate.html");
    $structuredFooterTemplateCopy = file_get_contents("media/quotestructuredfootertemplatecopy.html");
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
                    $response = [];
                    $data = json_decode(file_get_contents('php://input'));
                    $id = $data->quoteId;
                    $name = $data->quoteName;
                    $surname = $data->quoteSurname;
                    $email  = $data->quoteEmail;
                    $phone  = $data->quotePhone;
                    $request = $data->quoteRequest;
                    $quoteResponse = $data->quoteResponse;
                    $quoteTransport = $data->quoteTransport;
                    $quoteProductList = $data->quoteProductList;
                    $quoteTotalPrice = $data->quoteTotalPrice;
                    $responseType = $data->quoteResponseType;

                    $finalResponse = new stdClass();
                    $finalResponse->type = $responseType;
                    $finalResponse->response = $quoteResponse;
                    $finalResponse->transport = $quoteTransport;
                    $finalResponse->products = $quoteProductList;
                    $finalResponse->totalprice = $quoteTotalPrice;
                    $finalResponse = json_encode($finalResponse);

                    $newEmail = new \SendGrid\Mail\Mail(); 
                    $newEmail->setFrom($sentFromEmail, "LucciolaLegnami - Preventivi");
                    $newEmail->setSubject("Preventivo Lucciola Legnami");
                    $newEmail->addTo($email);
                    $newEmail->setReplyTo($sentToEmail);

                    $newEmailCopy = new \SendGrid\Mail\Mail(); 
                    $newEmailCopy->setFrom($sentFromEmail, "LucciolaLegnami - Preventivi");
                    $newEmailCopy->setSubject("Copia Preventivo " . $id . " Lucciola Legnami");
                    $newEmailCopy->addTo($sentToEmail);
                    $newEmailCopy->setReplyTo($email);
                    
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
                            $simpleTemplateCopy = str_replace('{{ '.$key.' }}', $value, $simpleTemplateCopy);
                        }

                        $newEmail->addContent("text/html", $simpleTemplate);
                        $newEmailCopy->addContent("text/html", $simpleTemplateCopy);
                    } else {
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
                            $structuredHeaderTemplateCopy = str_replace('{{ '.$key.' }}', $value, $structuredHeaderTemplateCopy);
                            $structuredPriceTemplate = str_replace('{{ '.$key.' }}', $value, $structuredPriceTemplate);
                            $structuredTransportTemplate = str_replace('{{ '.$key.' }}', $value, $structuredTransportTemplate);
                            $structuredNotesTemplate = str_replace('{{ '.$key.' }}', $value, $structuredNotesTemplate);
                            $structuredFooterTemplate = str_replace('{{ '.$key.' }}', $value, $structuredFooterTemplate);
                            $structuredFooterTemplateCopy = str_replace('{{ '.$key.' }}', $value, $structuredFooterTemplateCopy);
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
                        $finalHTMLPageCopy = "";
                        $finalHTMLPage = $finalHTMLPage . $structuredHeaderTemplate;
                        $finalHTMLPageCopy = $finalHTMLPageCopy . $structuredHeaderTemplateCopy;
                        foreach($productHTMLFields as $item)
                        {
                            $finalHTMLPage = $finalHTMLPage . $item;
                            $finalHTMLPageCopy = $finalHTMLPageCopy . $item;
                        }
                        $finalHTMLPage = $finalHTMLPage . $structuredPriceTemplate;
                        $finalHTMLPageCopy = $finalHTMLPageCopy . $structuredPriceTemplate;
                        if (!empty($quoteTransport)) {
                            $finalHTMLPage = $finalHTMLPage . $structuredTransportTemplate;
                            $finalHTMLPageCopy = $finalHTMLPageCopy . $structuredTransportTemplate;
                        }
                        if (!empty($quoteResponse)) {
                            $finalHTMLPage = $finalHTMLPage . $structuredNotesTemplate;
                            $finalHTMLPageCopy = $finalHTMLPageCopy . $structuredNotesTemplate;
                        }
                        $finalHTMLPage = $finalHTMLPage . $structuredFooterTemplate;
                        $finalHTMLPageCopy = $finalHTMLPageCopy . $structuredFooterTemplateCopy;

                        $newEmail->addContent("text/html", $finalHTMLPage);
                        $newEmailCopy->addContent("text/html", $finalHTMLPageCopy);
                    }
                    $sendgrid = new \SendGrid($sendgridApiKey);
                    try {
                        $SGresponse = $sendgrid->send($newEmail);
                        if($SGresponse->statusCode() == 200 || $SGresponse->statusCode() == 202) {
                            try {
                                $sql = "UPDATE emails SET response = :response, state = 1 WHERE id = :id";
                                $stmt = $conn->prepare($sql);
                                $stmt->bindParam(":response", $finalResponse, PDO::PARAM_STR);
                                $stmt->bindParam(":id", $id, PDO::PARAM_STR);
                                $stmt->execute();
                            } catch(PDOException $e) {
                                http_response_code(500);
                                $response['message'] = 'Si è verificato un errore durante la modifica della risposta nel database';
                                echo json_encode($response);
                            }
                            try {
                                $SGresponse = $sendgrid->send($newEmailCopy);
                            } catch (SendGridException $e) {
                                echo 'Caught exception: '. $e->getMessage() ."\n";
                            }
                            $response['message'] = 'Preventivo inviato correttamente';
                            http_response_code(200);
                            echo json_encode($response);
                            break;
                        } else {
                            http_response_code(500);
                            $response['message'] = 'Si è verificato un errore. Ti preghiamo di riprovare più tardi.';
                            echo json_encode($response);
                        }
                    } catch (SendGridException $e) {
                        http_response_code(500);
                        $response['message'] = 'Caught exception: '. $e->getMessage() ."\n";
                        echo json_encode($response);
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