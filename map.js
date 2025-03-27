/*
// Image dimensions: 1152x648
const locations = {
    "Entrance": { x: (926 / 1152) * 100, y: (322/ 648) * 100 },
    "Office": { x: (730/ 1152) * 100, y: (377 / 648) * 100 },
    "Classroom": { x: (728/ 1152) * 100, y: (270 / 648) * 100 },
    "Canteen": { x: (359 / 1152) * 100, y: (384 / 648) * 100 },
    "Playground": { x: (364 / 1152) * 100, y: (268 / 648) * 100 }
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
*/

// Select elements
const mapContainer = document.getElementById("map-container");
const mapImage = document.getElementById("map-image");
const sourceMarker = document.getElementById("source-marker");
const destinationMarker = document.getElementById("destination-marker");
const canvas = document.getElementById("map-canvas");
const ctx = canvas.getContext("2d");

let sourcePosition = null;
let destinationPosition = null;

// Adjust canvas size dynamically
function resizeCanvas() {
    canvas.width = mapImage.clientWidth;
    canvas.height = mapImage.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Function to place a marker at a clicked position
function placeMarker(event, markerType) {
    const rect = mapContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (markerType === "source") {
        sourceMarker.style.left = `${x}px`;
        sourceMarker.style.top = `${y}px`;
        sourceMarker.style.display = "block";
        sourcePosition = { x, y };
    } else {
        destinationMarker.style.left = `${x}px`;
        destinationMarker.style.top = `${y}px`;
        destinationMarker.style.display = "block";
        destinationPosition = { x, y };
    }

    if (sourcePosition && destinationPosition) {
        drawDottedLine();
    }
}

// Function to draw the dotted line between source and destination
function drawDottedLine() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous lines

    let markerOffset = 10; // Half of triangle base to connect to midpoint
    let startX = sourcePosition.x;
    let startY = sourcePosition.y + markerOffset; // Adjusting to base midpoint

    let endX = destinationPosition.x;
    let endY = destinationPosition.y + markerOffset; // Adjusting to base midpoint

    ctx.setLineDash([5, 5]); // Dotted pattern
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Listen for clicks on the map
mapContainer.addEventListener("click", (event) => {
    if (!sourcePosition) {
        placeMarker(event, "source");
    } else if (!destinationPosition) {
        placeMarker(event, "destination");
    } else {
        // Reset markers if both are already placed
        sourceMarker.style.display = "none";
        destinationMarker.style.display = "none";
        sourcePosition = null;
        destinationPosition = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});
