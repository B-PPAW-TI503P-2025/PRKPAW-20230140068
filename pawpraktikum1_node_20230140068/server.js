// Mengimpor Express
const express = require('express');
const app = express();
const port = 5000; 

// Membuat satu endpoint GET di root path ('/')
app.get('/', (req, res) => {
  // Mengembalikan pesan dalam format JSON
  res.json({ 
    message: 'Hello from Server!' 
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server Node.js berjalan di http://localhost:${port}`);
  console.log('Endpoint GET / siap diakses');
});