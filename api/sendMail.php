<?php 
	require('sendgrid-php/sendgrid-php.php');
	include('config.php');

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

	if($_SERVER['REQUEST_METHOD'] === 'POST')
	{
		$data = json_decode(file_get_contents('php://input'));
		$name = $data->name;
		$surname = $data->surname;
		$email  = $data->email;
		$phone  = $data->phone;
		$request = $data->request;
		$captcha = $data->captcha;
		
		if(empty($captcha)) {
			http_response_code(401);
			echo 'Completa il CAPTCHA per continuare.';
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
			$newEmail->addContent("text/html", "<h3><strong>Hai ricevuto una richiesta di preventivo:</strong></h3><br>Nome: " . $name . "<br>Cognome: " . $surname . "<br>Email: " . $email . "<br>Telefono: " . $phone . "<br>Richiesta: " . $request . "<br><hr>Per rispondere a questa email, clicca su rispondi.");

			$sendgrid = new \SendGrid($sendgridApiKey);
			try {
				$response = $sendgrid->send($newEmail);
				if($response->statusCode() == 202 || $response->statusCode() == 200) {
					http_response_code(200);
				}
				else {
					http_response_code(500);
					echo 'Si è verificato un errore. Riprova più tardi.';
				}
			} catch (SendGridException $e) {
				http_response_code(500);
				echo 'Caught exception: '. $e->getMessage() ."\n";
			}
		}
		else
		{
			http_response_code(401);
			echo 'Autenticazione non andata a buon fine. Se non sei un robot, ricarica la pagina e riprova.';
		}
	}
	else
	{
		http_response_code(401);
	}
?>