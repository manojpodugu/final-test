function navigateToMap() {
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;

    if (!source || !destination) {
        alert("Please select both source and destination.");
        return;
    }

    // Redirect to map page with query parameters
    window.location.href = `map.html?source=${source}&destination=${destination}`;
}
