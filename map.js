// Image dimensions: 1152x648
const locations = {
    "Entrance": { x: (150 / 1152) * 100, y: (100 / 648) * 100 },
    "Office": { x: (700 / 1152) * 100, y: (300 / 648) * 100 },
    "Classroom": { x: (850 / 1152) * 100, y: (250 / 648) * 100 },
    "Canteen": { x: (500 / 1152) * 100, y: (450 / 648) * 100 },
    "Playground": { x: (900 / 1152) * 100, y: (550 / 648) * 100 }
};

// Get URL Parameters
const params = new URLSearchParams(window.location.search);
const source = params.get("source");
const destination = params.get("destination");

// Elements
const map = document.getElementById("map-image");
const sourceMarker = document.getElementById("source-marker");
const destinationMarker = document.getElementById("destination-marker");
const canvas = document.getElementById("map-canvas");
const arrow = document.getElementById("arrow");

// Function to place markers and draw route
function drawRoute() {
    if (!locations[source] || !locations[destination]) return;

    // Get map dimensions
    const mapWidth = map.clientWidth;
    const mapHeight = map.clientHeight;

    // Convert percentage coordinates to pixel values
    const sourceX = (locations[source].x / 100) * mapWidth;
    const sourceY = (locations[source].y / 100) * mapHeight;
    const destinationX = (locations[destination].x / 100) * mapWidth;
    const destinationY = (locations[destination].y / 100) * mapHeight;

    // Position markers
    sourceMarker.style.left = sourceX + "px";
    sourceMarker.style.top = sourceY + "px";
    sourceMarker.style.display = "block";

    destinationMarker.style.left = destinationX + "px";
    destinationMarker.style.top = destinationY + "px";
    destinationMarker.style.display = "block";

    // Draw dotted line
    const ctx = canvas.getContext("2d");
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(destinationX, destinationY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Position and rotate arrow
    arrow.style.left = destinationX + "px";
    arrow.style.top = destinationY + "px";
    arrow.style.display = "block";
}

// Adjust on window resize
window.addEventListener("resize", drawRoute);
window.onload = drawRoute;
