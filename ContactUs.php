<?php
	/*	Written by Tyler Raborn
	 *	
	 *	This script uses the PHPMailer library to send an email when requested by a user 
     *	via the 'Contact Us' modal form.
	 */

	error_reporting(E_ALL);
	require_once 'Logger.php';
	$filename = preg_replace('/\.php$/', '', __FILE__);
	$log = new Logger($filename); 
	$log->info("Entering ContactUs.php");

	//target address:
	$toAddress = "insomniac34@gmail.com";

	//get data from client:
	$data = json_decode(file_get_contents("php://input"));
	$log->info("JSON has been received: ".print_r($data));
	
	if (!empty($data->address) && 
		!empty($data->subject) && 
		!empty($data->body))
	{
		$mailpath = '/usr/share/libphp-phpmailer';
		$incpath = '/var/www/html/v6';

		// Add the new path items to the previous PHP path
		$path = get_include_path();
		set_include_path($path . PATH_SEPARATOR . $mailpath . PATH_SEPARATOR . $incpath);
		require '/usr/share/php/libphp-phpmailer/PHPMailerAutoload.php';

		$mail = new PHPMailer();

		$mail->IsSMTP(); // telling the class to use SMTP
		$mail->SMTPAuth = true; // enable SMTP authentication
		$mail->SMTPSecure = "tls"; // sets tls authentication
		$mail->Host = "smtp.gmail.com"; // sets Pitt as the SMTP server
		$mail->Port = 587; // set the SMTP port for the Pitt server
		$mail->Username = "insomniac34@gmail.com"; // Pitt username
		$mail->Password = ""; // Pitt password

		$sender = strip_tags($data->address);
		//$receiver = $toAddress;
		$subj = strip_tags($data->subject);
		$msg = strip_tags($data->body);

		// Put information into the message
		$mail->addAddress($toAddress);
		$mail->SetFrom($sender);
		$mail->Subject = $subj;
		$mail->Body = $msg;

		$log->info("Sending email message $msg to $toAddress");

		// echo 'Everything ok so far' . var_dump($mail);
		if(!$mail->Send()) {
			$err = 'Mailer Error: ' . $mail->ErrorInfo;
			$log->info($err);
		} 
		else {
			$log->info('Message has been sent'); 
		}
	}

?>
