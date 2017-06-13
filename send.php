<?php

/**
 * Seguridad ataques XSS
 */
function seguridad($text){
    $text = strip_tags($text);
    $text = stripslashes($text);
    $text = htmlentities($text, ENT_QUOTES, "UTF-8");

    return $text;
}

function validar ($text){
    if ( (trim($text) == '') || ($text == null) ){
        return false;
    }
}

function getRealIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
        return $_SERVER['HTTP_CLIENT_IP'];

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        return $_SERVER['HTTP_X_FORWARDED_FOR'];

    return $_SERVER['REMOTE_ADDR'];
}

if ($_POST){
    /* Validamos el formulario */
    validar($_POST['txtNombre']);
    validar($_POST['txtEmail']);
    if (!filter_var($_POST['txtEmail'], FILTER_VALIDATE_EMAIL)){
        return false;
    }
    validar($_POST['txtTelefono']);
    validar($_POST['txtMensaje']);

    /* Inicializamos variables para enviar el formulario */
    $mail = 'jjpeleato@gmail.com';
    $titulo = 'JJPELEATO - Formulario contacto';

    $header = 'From: ' . seguridad($_POST['txtEmail']) . " \r\n";
    $header .= "MIME-Version: 1.0" . "\r\n";
    $header .= "Content-type: text/html; charset=utf-8";

    $mensaje = "
		<html>
			<head>
				<title>Formulario contacto JJPELEATO.COM</title>
			</head>

			<body>
				<p>Este correo ha sido enviado desde el formulario de 'Contacto' de http://www.jjpeleato.com</p>
				IP: ". getRealIP() ."<br>
				Nombre: ". seguridad($_POST['txtNombre']) ."<br>
				Email: ". seguridad($_POST['txtEmail']) ."<br>
				Teléfono: ". seguridad($_POST['txtTelefono']) ."<br>
				Mensaje:
				<br><br>
					". seguridad($_POST['txtMensaje']) ."
				<br><br>
			</body>
		</html>
	";

    if (mail($mail, $titulo, $mensaje, $header, "-f".$mail)){
        return true;
    } else {
        return false;
    }
}