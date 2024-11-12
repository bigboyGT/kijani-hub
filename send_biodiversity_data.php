<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data
    $location = htmlspecialchars($_POST['location']);
    $observation_description = htmlspecialchars($_POST['observation_description']);
    $observation_image = $_FILES['observation_image'];

    // You can upload the image or handle it as per your project needs
    if ($observation_image['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($observation_image['name']);
        move_uploaded_file($observation_image['tmp_name'], $uploadFile);
    }

    // Prepare the email
    $to = 'bogegeorge4@gmail.com'; // Change to your email
    $subject = 'New Biodiversity Observation';
    $message = "Location: $location\n\nDescription: $observation_description";

    // Send the email
    mail($to, $subject, $message);

    // Redirect back to the biodiversity form with a success message
    echo 'Biodiversity observation submitted successfully!';
}
?>
