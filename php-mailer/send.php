<?php
//Файлы phpmailer
require 'class.phpmailer.php';
require 'class.smtp.php';

$params = json_decode($_POST["param"]);
$name = $params->name;
$phone = $params->phone;
$email = $params->email;
$textarea = $params->textarea;
 
// Настройки
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->isSMTP(); 
$mail->Host = 'ssl://smtp.yandex.ru';  
$mail->SMTPAuth = true;                      
$mail->Username = 'n.n.shuvalov'; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
$mail->Password = '***'; // Ваш пароль
$mail->SMTPSecure = 'ssl';                            
$mail->Port = 465;
$mail->setFrom('n.n.shuvalov@yandex.ru'); // Ваш Email отправителя
$mail->addAddress('buhvin@mail.ru'); // Email получателя
                                 
// Письмо
$mail->isHTML(true); 
$mail->Subject = "$name"; // Заголовок письма
$mail->Body = "Имя: $name;Телефон: $phone; Сообщение - $textarea; почта - $email "; // Текст письма

//Результат
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'ok';
}
?>