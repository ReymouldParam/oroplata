<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Collect data
    $name = trim($_POST['name']);
    $number = trim($_POST['number']);
    $email = trim($_POST['email']);
    $projectDetails = trim($_POST['projectDetails']);
    $budget = trim($_POST['budget']);
    $message = trim($_POST['message']);

    // Recipient
    $to = "oroplata.hyderabad@gmail.com";

    // Subject
    $subject = "New Enquiry from OROPLATA";

    // Body
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $number\n";
    $body .= "Budget Range: $budget\n\n";
    $body .= "Project Details:\n$projectDetails\n\n";
    $body .= "Message:\n$message";

    // Send email (no headers)
    $emailSent = mail($to, $subject, $body);

    // Redirect
    if ($emailSent) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>