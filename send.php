<?php 

$to="inbox@vrvsolutions.info"; // заменить на свою почту
$headers = "Content-type: text/html; charset=utf-8 \r\n";
$headers.= "From: ".$_SERVER['SERVER_NAME']." \r\n";
$subject="Запрос на бесплатную консультацию ".$_SERVER['SERVER_NAME'];


if (isset($_POST['uName'])){
	$name=$_POST['uName'];
}
if (isset($_POST['uEmail'])){
	$email=$_POST['uEmail'];
}
if (isset($_POST['uPhone'])){
	$phone=$_POST['uPhone'];
}
if (isset($_POST['uTxt'])){
	$message=$_POST['uTxt'];
}
// if (isset($_POST['formName'])){
// 	$formName=$_POST['formName'];
// }


$mailMessage = "<html><body>";
$mailMessage .= "<h3>Запрос на бесплатную консультацию с сайта: ". $_SERVER['SERVER_NAME'] . "</h3>"."<p>Имя: ".$name."</p><p>Email: ".$email. "</p><p>Телефон: ".$phone."</p><p>Сообщение: ".$message."</p></body></html>";
			
$tmp = mail($to, $subject, $mailMessage, $headers);
if ($tmp) {
	echo true;
} else {
	echo false;
}
?>