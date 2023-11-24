const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const imagePath = path.resolve(target, image);

  sharp(imagePath)
    .resize(1200)
    .toFile(path.resolve(destination, `${path.parse(image).name}-desktop.jpg`), (err) => {
      if (err) console.error(`Error resizing image ${image}: ${err}`);
    });

  sharp(imagePath)
    .resize(648)
    .toFile(path.resolve(destination, `${path.parse(image).name}-mobile.jpg`), (err) => {
      if (err) console.error(`Error resizing image ${image}: ${err}`);
    });
});
