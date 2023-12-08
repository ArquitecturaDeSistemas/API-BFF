/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, 'src/grpc/proto');
const destDir = path.join(__dirname, 'dist/grpc/proto');

fs.copy(srcDir, destDir, function (err) {
  if (err) {
    console.error('Error al copiar archivos proto:', err);
  } else {
    console.log('Archivos proto copiados a dist/grpc/proto');
  }
});
