<?php
class mail
{
	function __construct()
	{
		require_once(neoan_path  . '/apps/plugins/phpmailer/PHPMailerAutoload.php');
		
	}
	static function core_mail($to,$core,$from = null,$subject = null,$attachment = null)
	{
		$mail = new PHPMailer();
		
		$mail->addAddress($to[0],$to[1]); 
		
		if(empty($from))
			$mail->setFrom(mail_from, path.'-NEOAN-SYSTEM');
		else
			$mail->setFrom($from[0],$from[1]);
		
		if(empty($subject))
			$mail->Subject = mail_subject;
		else
			$mail->Subject = $subject;
		
		if(empty($attachment))
		{
			if(is_array($attachment))
			{
				foreach($attachment as $file)
				{
					$mail->addAttachment($file);	
				}	
			}
			else
				$mail->addAttachment($attachment);	
		}
			
				
		$mail->msgHTML(file_get_contents($core), $_SERVER['DOCUMENT_ROOT'] . base);	
			
		if (!$mail->send()) 
		{
    		return "Mailer Error: " . $mail->ErrorInfo;
		} 
		else 
		{
		    return true;
		}	
	}
	static function mail()
	{
		$mail = new PHPMailer();
		return $mail;	
	}
}