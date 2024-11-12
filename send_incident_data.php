<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data and check if the 'location' key exists
    $incident_location = isset($_POST['location']) ? htmlspecialchars($_POST['location']) : 'Location not provided';
    $incident_description = isset($_POST['incident_description']) ? htmlspecialchars($_POST['incident_description']) : 'Description not provided';
    
    // Handle file upload
    if (isset($_FILES['incident_image']) && $_FILES['incident_image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        
        // Ensure the uploads directory exists
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true); // Create directory if it doesn't exist
        }
        
        $uploadFile = $uploadDir . basename($_FILES['incident_image']['name']);
        
        // Attempt to move the uploaded file
        if (move_uploaded_file($_FILES['incident_image']['tmp_name'], $uploadFile)) {
            echo "File uploaded successfully.\n";
        } else {
            echo "Failed to upload file.\n";
        }
    } else {
        echo "No file uploaded or file upload error occurred.\n";
    }

    // Prepare the email
    $to = 'bogegeorge4@gmail.com'; // Change to your email
    $subject = 'New Environmental Incident Report';
    $message = "Location: $incident_location\n\nDescription: $incident_description";

    // Use ini_set for email configuration, if necessary
    ini_set("SMTP", "smtp.gmail.com");
    ini_set("smtp_port", "587");
    ini_set("sendmail_from", "your-email@gmail.com"); // Replace with your email

    // Attempt to send the email
    if (mail($to, $subject, $message)) {
        echo "Incident report submitted successfully!\n";
    } else {
        echo "Failed to send email. Please check your mail server settings.\n";
    }
}
?>
