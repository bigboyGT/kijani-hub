document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map
    const map = L.map('map').setView([0.0, 0.0], 2);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Add a marker layer for geotagging
    let marker;

    // Get current location
    document.getElementById("getLocation").addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Update form fields
                document.getElementById("latitude").value = lat;
                document.getElementById("longitude").value = lng;

                // Update map and add marker
                if (marker) {
                    map.removeLayer(marker);
                }
                map.setView([lat, lng], 13);
                marker = L.marker([lat, lng]).addTo(map).bindPopup("Observation Location").openPopup();
            }, (error) => {
                alert("Error fetching location: " + error.message);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // Handle form submission
    document.getElementById("biodiversityForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const speciesName = document.getElementById("speciesName").value;
        const observationDetails = document.getElementById("observationDetails").value;
        const latitude = document.getElementById("latitude").value;
        const longitude = document.getElementById("longitude").value;
        const imageFile = document.getElementById("imageUpload").files[0];

        if (!latitude || !longitude) {
            alert("Please get the location before submitting the form.");
            return;
        }

        if (!imageFile) {
            alert("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("speciesName", speciesName);
        formData.append("observationDetails", observationDetails);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("image", imageFile);

        console.log({
            speciesName,
            observationDetails,
            location: { latitude, longitude },
            imageName: imageFile.name,
        });

        alert("Observation submitted successfully!");
    });
});
