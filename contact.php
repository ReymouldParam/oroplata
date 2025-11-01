<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect data safely
    $name = htmlspecialchars($_POST['name']);
    $number = htmlspecialchars($_POST['number']);
    $email = htmlspecialchars($_POST['email']);
    $budget = htmlspecialchars($_POST['budget']);
    $projectDetails = htmlspecialchars($_POST['projectDetails']);

    // Recipient email(s)
    $to = "naresh.narnapati@reymould.com";

    // Subject and message
    $subject = "New Project Enquiry from oroplata";
    $body = "You have received a new project enquiry:\n\n"
        . "Name: $name\n"
        . "Email: $email\n"
        . "Phone: $number\n"
        . "Budget Range: $budget\n\n"
        . "Project Details:\n$projectDetails\n";

    // Headers
    $headers = "From: noreply@shekarandco.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    $emailSent = mail($to, $subject, $body, $headers);

    // Redirect based on status
    if ($emailSent) {
        header("Location: thankyou.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>
