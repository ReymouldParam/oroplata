<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize inputs
    $name = htmlspecialchars($_POST['name']);
    $number = htmlspecialchars($_POST['number']);
    $email = htmlspecialchars($_POST['email']);
    $projectDetails = htmlspecialchars($_POST['projectDetails']);
    $budget = htmlspecialchars($_POST['budget']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient(s)
    $to = "contact@shekarandco.com, shekar.sanda@shekarandco.com";

    // Subject & Body
    $subject = "New Enquiry from shekarandco.com";
    $body = "You have received a new enquiry from the website:\n\n"
        . "Name: $name\n"
        . "Phone: $number\n"
        . "Email: $email\n"
        . "Budget Range: $budget\n\n"
        . "Project Details:\n$projectDetails\n\n"
        . "Message:\n$message\n";

    // Headers
    $headers = "From: noreply@shekarandco.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send mail
    $emailSent = mail($to, $subject, $body, $headers);

    // Redirect
    if ($emailSent) {
        header("Location: thankyou.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>