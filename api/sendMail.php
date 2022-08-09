<?php 
	require('sendgrid-php/sendgrid-php.php');
    $template = file_get_contents("media/emailtemplate.html");
	include('config.php');
	include 'dbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

	function curlRequest($url)
	{
		$ch = curl_init();
		$getUrl = $url;
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_URL, $getUrl);
		curl_setopt($ch, CURLOPT_TIMEOUT, 80);
		$response = curl_exec($ch);
		return $response;
		curl_close($ch);
	}

	$method = $_SERVER['REQUEST_METHOD'];
	switch($method) {
		case "POST":
			$response = [];
			$data = json_decode(file_get_contents('php://input'));
			$name = $data->name;
			$surname = $data->surname;
			$email  = $data->email;
			$phone  = $data->phone;
			$request = $data->request;
			$captcha = $data->captcha;
			
			if(empty($captcha)) {
				http_response_code(401);
				$response['message'] = 'Completa il CAPTCHA per continuare.';
				echo $response;
				exit;
			}

			$createGoogleUrl = 'https://www.google.com/recaptcha/api/siteverify?secret='.$captchaSecretKey.'&response='.$captcha;
			$verifyRecaptcha = curlRequest($createGoogleUrl);
			$decodeGoogleResponse = json_decode($verifyRecaptcha,true);

			if($decodeGoogleResponse['success'] == 1)
			{
				$newEmail = new \SendGrid\Mail\Mail(); 
				$newEmail->setFrom($sentFromEmail, "LucciolaLegnami - Preventivi");
				$newEmail->setSubject("Richiesta Preventivo - " . $name . " " . $surname);
				$newEmail->addTo($sentToEmail, "LucciolaLegnami");
				$newEmail->setReplyTo($email);
                
                $variables = array();
                $variables['name'] = $name;
                $variables['surname'] = $surname;
                $variables['phone'] = $phone;
                $variables['email'] = $email;
                $variables['request'] = $request;
                
                foreach($variables as $key => $value)
                {
                    $template = str_replace('{{ '.$key.' }}', $value, $template);
                }
                
				$newEmail->addContent("text/html", $template);

				$sendgrid = new \SendGrid($sendgridApiKey);
				try {
					$SGresponse = $sendgrid->send($newEmail);
					if($SGresponse->statusCode() == 200 || $SGresponse->statusCode() == 202) {
						try {
							$sql = "INSERT INTO emails (name, surname, email, phone, request) VALUES (:name,:surname,:email,:phone,:request)";
							$conn->beginTransaction();
							$stmt = $conn->prepare($sql);
							$stmt->bindParam(":name", $name, PDO::PARAM_STR);
							$stmt->bindParam(":surname", $surname, PDO::PARAM_STR);
							$stmt->bindParam(":email", $email, PDO::PARAM_STR);
							$stmt->bindParam(":phone", $phone, PDO::PARAM_STR);
							$stmt->bindParam(":request", $request, PDO::PARAM_STR);
							$stmt->execute();
						} catch(PDOException $e) {
							$conn->rollback();
						}
						http_response_code(200);
						$response['message'] = 'Riceverai una email entro 48 ore lavorative.';
						echo json_encode($response);
					} else {
						http_response_code(500);
						$response['message'] = 'Si è verificato un errore durante invio mail. Ti preghiamo di riprovare più tardi.';
						echo json_encode($response);
					}
				} catch (SendGridException $e) {
					http_response_code(500);
					$response['message'] = 'Caught exception: '. $e->getMessage() ."\n";
					echo json_encode($response);
				}
			} else {
				http_response_code(401);
				$response['message'] = 'Autenticazione non andata a buon fine. Se non sei un robot, ricarica la pagina e riprova.';
				echo json_encode($response);
			}
	}
?>