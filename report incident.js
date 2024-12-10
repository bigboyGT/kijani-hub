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
                marker = L.marker([lat, lng]).addTo(map).bindPopup("Incident Location").openPopup();
            }, (error) => {
                alert("Error fetching location: " + error.message);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // Update intensity value display
    window.updateIntensityValue = (value) => {
        document.getElementById("intensityValue").textContent = value;
    };

    // Handle form submission
    document.getElementById("incidentForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const incidentType = document.getElementById("incidentType").value;
        const incidentDetails = document.getElementById("incidentDetails").value;
        const latitude = document.getElementById("latitude").value;
        const longitude = document.getElementById("longitude").value;
        const intensity = document.getElementById("intensity").value;
        const imageFile = document.getElementById("imageUpload").files[0];

        if (!latitude || !longitude) {
            alert("Please get the location before submitting the form.");
            return;
        }

        const formData = new FormData();
        formData.append("incidentType", incidentType);
        formData.append("incidentDetails", incidentDetails);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("intensity", intensity);
        formData.append("image", imageFile);

        console.log({
            incidentType,
            incidentDetails,
            location: { latitude, longitude },
            intensity,
            imageName: imageFile.name,
        });

        alert("Incident reported successfully!");
    });
});
