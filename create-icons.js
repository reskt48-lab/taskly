const fs = require('fs');

// Create a simple PNG icon using data URL
// This is a base64 encoded purple icon with checkmark

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function createIconHTML(size) {
    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0">
<canvas id="c" width="${size}" height="${size}"></canvas>
<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');
const size = ${size};

// Background with rounded corners
ctx.fillStyle = '#6C5CE7';
ctx.beginPath();
ctx.moveTo(size * 0.2, 0);
ctx.lineTo(size * 0.8, 0);
ctx.quadraticCurveTo(size, 0, size, size * 0.2);
ctx.lineTo(size, size * 0.8);
ctx.quadraticCurveTo(size, size, size * 0.8, size);
ctx.lineTo(size * 0.2, size);
ctx.quadraticCurveTo(0, size, 0, size * 0.8);
ctx.lineTo(0, size * 0.2);
ctx.quadraticCurveTo(0, 0, size * 0.2, 0);
ctx.closePath();
ctx.fill();

// Circle
ctx.strokeStyle = 'white';
ctx.lineWidth = size * 0.04;
ctx.beginPath();
ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
ctx.stroke();

// Checkmark
ctx.strokeStyle = 'white';
ctx.lineWidth = size * 0.05;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.beginPath();
ctx.moveTo(size * 0.39, size * 0.5);
ctx.lineTo(size * 0.47, size * 0.58);
ctx.lineTo(size * 0.625, size * 0.42);
ctx.stroke();

// Text
ctx.fillStyle = 'white';
ctx.font = 'bold ' + (size * 0.12) + 'px Arial, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Taskly', size / 2, size * 0.82);

// Download
setTimeout(() => {
    c.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'icon-${size}.png';
        a.click();
    });
}, 100);
</script>
</body>
</html>`;
}

sizes.forEach(size => {
    const html = createIconHTML(size);
    fs.writeFileSync(\`icon-gen-\${size}.html\`, html);
});

console.log('✅ Icon generator files created!');
console.log('Buka setiap file icon-gen-*.html di browser untuk download icon.');
