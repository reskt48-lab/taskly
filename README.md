# Taskly - Aplikasi Manajemen Tugas

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Kivy](https://img.shields.io/badge/Kivy-2.3.0-green.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

## 📱 Tentang Aplikasi

**Taskly** adalah aplikasi manajemen tugas (task management) yang dibangun menggunakan **Python** dan framework **Kivy**. Aplikasi ini memiliki antarmuka yang intuitif dan mudah digunakan untuk membantu mengelola tugas harian Anda.

## ✨ Fitur Utama

### 🏠 Halaman Beranda
- Dashboard tugas harian
- Daftar tugas yang belum selesai
- Quick access untuk menambah tugas
- Checkbox untuk menandai tugas selesai

### ➕ Tambah Tugas
- Form lengkap untuk membuat tugas baru
- Input judul dan deskripsi tugas
- Set tanggal dan waktu
- Pilihan kategori (Target, Waktu, Belajar, Pribadi, Kerja, Olahraga)

### 📊 Statistik
- Total tugas dan status penyelesaian
- Jumlah tugas selesai dan berlanjut
- Persentase penyelesaian
- Statistik berdasarkan kategori

### 👤 Profil
- Informasi pengguna
- Menu pengaturan
- Tentang aplikasi
- Tombol logout

## 🚀 Cara Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd opencode
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Jalankan Aplikasi
```bash
python main.py
```

## 📦 Dependencies

- **Python 3.8+**
- **Kivy 2.3.0** - Framework untuk membuat aplikasi multi-touch
- **Pillow** - Library untuk pemrosesan gambar

## 🎨 Desain

- **Framework**: Kivy (Python)
- **Warna Utama**: Purple (#6C5CE7)
- **UI/UX**: Modern dan user-friendly
- **Responsif**: Ukuran window disesuaikan untuk pengalaman mobile

## 💾 Penyimpanan Data

Data disimpan menggunakan **JSON file** lokal (`taskly_data.json`), sehingga:
- ✅ Data tetap tersimpan setelah aplikasi ditutup
- ✅ Tidak perlu server atau database eksternal
- ✅ Privacy terjaga (data hanya di device Anda)
- ✅ Mudah untuk backup dan restore

## 🎯 Kategori Tugas

1. **Target** - Tugas dengan target tertentu
2. **Waktu** - Tugas berbasis waktu
3. **Belajar** - Tugas akademik/belajar
4. **Pribadi** - Tugas personal
5. **Kerja** - Tugas pekerjaan
6. **Olahraga** - Aktivitas olahraga

## 📁 Struktur Project

```
opencode/
├── main.py              # File utama aplikasi
├── requirements.txt     # Dependencies
├── README.md           # Dokumentasi
├── taskly_data.json    # Data storage (auto-generated)
└── .gitignore          # Git ignore file
```

## 🔧 Teknologi

- **Python** - Bahasa pemrograman
- **Kivy** - Framework UI/UX untuk aplikasi multi-platform
- **JSON** - Format penyimpanan data

## 🚀 Pengembangan Selanjutnya

### Fitur yang Akan Datang
- [ ] Edit tugas yang sudah ada
- [ ] Delete tugas individual
- [ ] Filter tugas berdasarkan kategori
- [ ] Pencarian tugas
- [ ] Notifikasi pengingat
- [ ] Dark mode
- [ ] Export/Import data
- [ ] Recurring tasks (tugas berulang)
- [ ] Priority levels
- [ ] Kalender view

## 📝 Catatan Pengembangan

### Commit History
Setiap penambahan fitur atau perubahan akan didokumentasikan dengan commit yang jelas:
- `Initial commit` - Setup project awal
- `Add feature: Tambah UI Beranda` - Menambahkan halaman beranda
- `Add feature: Form tambah tugas` - Implementasi form tambah tugas
- Dan seterusnya...

## 👨‍💻 Developer

**Nama**: Resa Fakra  
**Kelas**: [Isi kelas Anda]  
**Sekolah**: [Isi nama sekolah]

## 📝 Lisensi

© 2026 Taskly. All rights reserved.

---

## 🎯 Cara Penggunaan

### 1. Menambah Tugas
- Klik tombol "➕ Tambah" di bottom navigation
- Isi form dengan detail tugas
- Pilih kategori yang sesuai
- Klik "Tambah Tugas"

### 2. Menandai Tugas Selesai
- Di halaman beranda, klik checkbox di sebelah kiri tugas
- Tugas akan ditandai sebagai selesai

### 3. Melihat Statistik
- Klik menu "📊 Statistik" di bottom navigation
- Lihat ringkasan total tugas, selesai, berlanjut, dan persentase

### 4. Profil & Pengaturan
- Klik menu "👤 Profil" di bottom navigation
- Akses pengaturan dan informasi aplikasi

## 🆘 Troubleshooting

### Aplikasi tidak bisa dijalankan?
- Pastikan Python 3.8+ sudah terinstall
- Install ulang dependencies: `pip install -r requirements.txt`
- Cek apakah ada error di terminal

### Data hilang?
- Cek file `taskly_data.json` di folder project
- Jangan hapus file tersebut
- Backup file JSON secara berkala

---

**Selamat menggunakan Taskly! 🎉**
