<?php
require 'vendor/autoload.php';
$email_data = json_decode(file_get_contents('php://input'));
// $email_data = json_decode('{"firstname":"Godwin","email":"alfa.godwin.omega@gmail.com","activationCode":"ABC123456"}');
$firstname = $email_data->firstname;
$user_email = $email_data->email;
$user_question = $email_data->question;

$Email = new PHPMailer;$Email->CharSet = 'UTF-8';

$Email->isSMTP();

$Email->SMTPAuth = true;

//$Email -> SMTPDebug = 2;
$Email->Host = 'mail.gdbase.be';

$Email->Username = 'training@gdbase.be';

$Email->Password = 'NMHjZbAQh12fyr';

$Email->SMTPSecure = 'ssl';

$Email->Port = '465';

$Email->From = "training@gdbase.be";

$Email->FromName = "GDBase";

$Email->addReplyTo($user_email, 'GDBase');

$Email->AddAddress('training@gdbase.be', 'GDBase');

$Email->Subject = ". $firstname . a posé une question || Free Training";

$Email->Body = '<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#DDDDDD" style="width: 100%; background: #DDDDDD;"><tr><td><table border="0" cellspacing="0" cellpadding="0" align="center" width="550" style="width: 100%; padding: 10px;"><tr><td><div style="direction:ltr; max-width: 600px; margin: 0 auto;"><table border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="width: 100%; background-color: #fff; text-align: left; margin: 0 auto; max-width: 1024px; min-width: 320px;"><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0" height="8" style="width: 100%; background-repeat: repeat-x; background-color: #ff6600; height: 8px;"><tr><td></td></tr></table><table style="width: 100%;" width="100%" border="0" cellspacing="0" cellpadding="20" bgcolor="#ffffff"><tr><td valign="top" style="padding: 20px;"><h1 style=\'font-family: "Helvetica Neue";\'>' . $firstname . ' a demandé,</h1><h3 style=\'font-family: "Helvetica Neue";\'> Email: '. $user_email .'</h3><p style=\'direction:ltr; font-size: 14px; line-height: 1.4em; color: #444444; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; margin: 0 0 1em 0; margin: 0 0 20px 0;\'>'. $user_question .'</p><a href="mailto:'.$user_email.'" style="text-decoration:none;"><p style=\'direction:ltr; font-size: 14px; line-height: 1.4em; color: #444444; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; margin: 0 0 1em 0; margin: 0 0 5px 0;\'><span style="text-decoration: underline; color: #ce5b0e; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; border: 1px solid #ce5b0e; text-decoration: none; color: #fff; text-shadow: 0 1px 0 #9a3e00; background-color: #ff6600; padding: 5px 15px; font-size: 16px; line-height: 1.4em; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-weight: normal;"><b style="font-size:16px; letter-spacing:1px;">Répondre</b></span></p></a></td><td></td></tr><tr></tr></table></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0" height="3" style="width: 100%; background-repeat: repeat-x; background-color: #ff893a; height: 3px;"><tr><td></td></tr></table></div></td></tr></table></td></tr></table>';

$Email->AltBody = $user_question;

//echo !extension_loaded('openssl')?"Not Available <br/>":"Available <br/>";

if ($Email->send()) {
    echo 'MailDelivered';
} else {
    echo $Email->ErrorInfo;
}
