
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

    /*// ✅ NEW: Adjust Y position to connect to the midpoint of the triangle's base
    const markerBaseOffset = 10; // Adjust this value based on marker size
    const adjustedSourceY = sourceY + markerBaseOffset;
    const adjustedDestinationY = destinationY + markerBaseOffset;*/

    const markerSize = 20; // Adjust this based on actual marker size
    const midpointX = destinationX - (markerSize / 2) * Math.cos((angle + 90) * Math.PI / 180);
    const midpointY = destinationY - (markerSize / 2) * Math.sin((angle + 90) * Math.PI / 180);

    // ✅ NEW: Calculate the angle for triangle rotation
    const angle = Math.atan2(destinationY - sourceY, destinationX - sourceX) * (180 / Math.PI);

    // Position markers
    sourceMarker.style.left = sourceX + "px";
    sourceMarker.style.top = sourceY + "px";
    sourceMarker.style.display = "block";

    destinationMarker.style.left = destinationX + "px";
    destinationMarker.style.top = destinationY + "px";
    destinationMarker.style.display = "block";

    // ✅ NEW: Rotate the triangle to point towards the destination
    destinationMarker.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;


    // Draw dotted line
    const ctx = canvas.getContext("2d");
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    //intial 2 lines
    //ctx.moveTo(sourceX, sourceY);
   // ctx.lineTo(destinationX, destinationY);
    //next 2 lines
    //ctx.moveTo(sourceX, adjustedSourceY); // ✅ NEW: Connect to the base midpoint
    //ctx.lineTo(destinationX, adjustedDestinationY); // ✅ NEW: Connect to the base midpoint
    //lastest 2 lines

    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(midpointX, midpointY); // ✅ Connect to the base midpoint
    
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


