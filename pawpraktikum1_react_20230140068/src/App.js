import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. Gunakan hook useState untuk menyimpan input nama
  const [nama, setNama] = useState('');

  // 2. Fungsi untuk menangani perubahan pada input field
  const handleInputChange = (event) => {
    // Memperbarui state 'nama' setiap kali input berubah
    setNama(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Input field untuk nama */}
        <p>
          Masukkan Nama Anda:
        </p>
        <input 
          type="text"
          value={nama}
          onChange={handleInputChange}
          placeholder="Tuliskan nama Anda di sini"
          style={{ padding: '10px', fontSize: '16px', margin: '10px 0', width: '300px' }}
        />
        
        {/* Pesan Selamat Datang */}
        <h1>
          {/* Tampilkan pesan: "Hello, [nama]!" */}
          Hello, {nama || '[nama]'}!
        </h1>
        
        {/* Tambahan pesan selamat datang dengan nama yang diinput */}
        {nama && (
          <p>
            Pesan Selamat Datang untuk: **{nama}**
          </p>
        )}
        
      </header>
    </div>
  );
}

export default App;