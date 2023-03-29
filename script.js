// Get the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the image
const img = new Image();
img.crossOrigin = "anonymous"; // This line allows the image to be loaded from another domain
img.onload = function () {
  // Draw the image on the canvas
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Get the image data
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Define the amount of glitch
  const glitchAmount = 100;

  // Create an animation loop
  const loop = function () {
    // Sort the pixels in each row of the image
    for (let y = 0; y < imageData.height; y++) {
      // Create an array of pixel data for this row
      const row = new Uint32Array(imageData.data.buffer, y * imageData.width * 4, imageData.width);

      // Sort the pixels in the row
      row.sort(() => Math.random() - 0.5);

      // Glitch some pixels in the row
      for (let i = 0; i < glitchAmount; i++) {
        // Choose a random pixel index
        const index = Math.floor(Math.random() * row.length);

        // Choose a random color value
        const color = Math.floor(Math.random() * 256);

        // Set the color value for this pixel
        row[index] = (row[index] & 0xff000000) | (color << 16) | (color << 8) | color;
      }
    }

    // Draw the glitched image on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Call the loop function recursively
    window.requestAnimationFrame(loop);
  };

  // Call the loop function initially
  loop();
};

// Set the image source
img.src = "https://i.seadn.io/gae/4NiJOumIEiFZ4pySe34ermUxAHPKn2IVZLVy0pjB1quIMeCVlCS2UB-rIYTZCDF59Vsckf6NHuLxlvoWXPnbtgOQychAr6KHRArt9Lg?auto=format&w=1000";
