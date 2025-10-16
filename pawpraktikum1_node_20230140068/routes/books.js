const express = require('express');
const router = express.Router();

// Data sementara (in-memory) yang akan dioperasikan oleh CRUD
let books = [
  { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
  { id: 2, title: 'A Song of Ice and Fire', author: 'George R.R. Martin' }
];

// 1. READ (GET All): Mendapatkan semua buku
router.get('/', (req, res) => {
  res.json(books);
});

// 2. READ (GET by ID): Mendapatkan buku berdasarkan ID
router.get('/:id', (req, res) => {
  // Mengkonversi ID dari parameter URL menjadi integer
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    // Jika buku tidak ditemukan, kirim respons 404
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// 3. CREATE (POST): Menambahkan buku baru
router.post('/', (req, res) => {
  // Ambil data dari req.body (berkat middleware express.json() di server.js)
  const { title, author } = req.body;
  
  // Validasi data
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  // Buat objek buku baru dengan ID unik
  const newBook = { 
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1, // Logika ID yang lebih aman
    title, 
    author 
  };
  
  books.push(newBook);
  res.status(201).json(newBook); // 201 Created
});

// 4. UPDATE (PUT): Memperbarui buku berdasarkan ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const index = books.findIndex(b => b.id === id); // Cari indeks buku di array

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  // Lakukan update data
  books[index].title = title;
  books[index].author = author;
  
  res.json(books[index]);
});

// 5. DELETE (DELETE): Menghapus buku berdasarkan ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Hapus satu elemen pada indeks yang ditemukan
  books.splice(index, 1);
  
  res.status(200).json({ message: 'Book deleted successfully' });
});

// Eksport router agar bisa diimpor oleh server.js
module.exports = router;