<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['email'];


    $to = "oroplata.hyderabad@gmail.com";
    $subject = "Email enquiry from OROPLATA website";
    $body = "Email: $email";

    $emailSent = mail($to, $subject, $body);

    if ($emailSent) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>