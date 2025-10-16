const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3001;

// 1. Import Router Buku (Mengandung logika CRUD)
// Pastikan file 'books.js' ada di dalam folder 'routes'
const bookRoutes = require('./routes/books'); 

// --- MIDDLEWARE PENTING ---

// 1. CORS Middleware: Mengizinkan akses lintas-domain (untuk frontend)
app.use(cors());

// 2. Body Parser Middleware: Mengubah JSON payload menjadi objek req.body (Penting untuk POST/PUT)
app.use(express.json());

// 3. Logger Middleware: Mencatat setiap permintaan masuk
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next(); 
});

// --- DEFINISI ROUTE ---

// Route Dasar: Home Page API
app.get('/', (req, res) => {
    res.send('Home Page for API. Access CRUD endpoints at /api/books');
});

// 2. Pasang Router Buku (Mengaktifkan CRUD)
// Semua rute CRUD dari books.js sekarang diakses melalui /api/books
app.use('/api/books', bookRoutes); 

// --- MIDDLEWARE ERROR HANDLING (Dipasang di akhir) ---

// 1. 404 Handler: Menangani semua permintaan yang tidak cocok dengan rute di atas
app.use((req, res, next) => {
    // Membuat objek Error 404
    const error = new Error('Route not found');
    error.status = 404;
    next(error); 
});

// 2. Global Error Handler: Middleware terakhir untuk menangani semua error yang dilempar (404, 500, dll.)
app.use((err, req, res, next) => {
    // Mencatat detail error untuk debugging server
    console.error(err.stack); 
    
    // Mengirim respons error yang terstruktur ke klien
    res.status(err.status || 500).json({ 
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    });
});

// --- START SERVER ---

app.listen(PORT, () => {
    console.log(`✅ Express server running at http://localhost:${PORT}/`);
});