<script>
// Open Modal
document.getElementById("ai-scanner-link").onclick = function(event) {
    event.preventDefault();
    document.getElementById("aiImageScannerModal").style.display = "block";
};

// Close Modal
document.querySelector(".close").onclick = function() {
    document.getElementById("aiImageScannerModal").style.display = "none";
};

// Close Modal if Click Outside
window.onclick = function(event) {
    if (event.target == document.getElementById("aiImageScannerModal")) {
        document.getElementById("aiImageScannerModal").style.display = "none";
    }
};

// Handle Form Submission
document.getElementById("uploadForm").onsubmit = function(event) {
    event.preventDefault();

    let formData = new FormData();
    let imageFile = document.getElementById("imageFile").files[0];
    formData.append("file", imageFile);

    // Make AJAX request to the AI Image Scanner API
    fetch('https://your-ai-image-scanner-api.com/scan', { // Replace with actual API URL
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Display result in the modal
        document.getElementById("scanResult").innerText = `Scan Result: ${data.result}`;
    })
    .catch(error => {
        document.getElementById("scanResult").innerText = `Error: ${error.message}`;
    });
};
</script>
