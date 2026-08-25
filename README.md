# Taskly - Catat Tugasmu

![Taskly Logo](https://img.shields.io/badge/Taskly-v1.0.0-6C5CE7?style=for-the-badge)
![Progressive Web App](https://img.shields.io/badge/PWA-Enabled-00D2D3?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-00B894?style=for-the-badge)

## 📱 Tentang Aplikasi

**Taskly** adalah aplikasi manajemen tugas (task management) yang modern, responsif, dan mudah digunakan. Dirancang dengan antarmuka yang intuitif dan dapat diakses dari berbagai perangkat (desktop, tablet, dan mobile).

## ✨ Fitur Utama

### 🏠 Halaman Beranda
- Dashboard tugas harian
- Daftar tugas sekolah
- Tugas mendatang
- Quick add task dengan FAB button

### 📅 Kalender
- Tampilan kalender bulanan
- Indikator hari dengan tugas
- Agenda harian
- Navigasi antar bulan

### 📊 Statistik
- Total tugas dan penyelesaian
- Grafik pie kategori tugas
- Grafik line progress mingguan
- Persentase penyelesaian

### 👤 Profil
- Informasi pengguna
- Pengaturan aplikasi
- Kelola kategori
- Tema aplikasi
- Logout

### ➕ Tambah Tugas
- Form lengkap untuk membuat tugas
- Pilihan kategori (Target, Waktu, Belajar, Pribadi, Kerja, Olahraga)
- Set tanggal dan waktu
- Deskripsi tugas

### 🔐 Autentikasi
- Login dengan email/username
- Registrasi akun baru
- Login dengan Google (coming soon)
- Lupa password

### ⚙️ Pengaturan
- Notifikasi pengingat tugas
- Push notification
- Ubah password
- Backup & restore data
- Hapus akun

## 🎨 Desain

- **UI/UX**: Modern, clean, dan user-friendly
- **Warna Utama**: Purple (#6C5CE7)
- **Tipografi**: System fonts untuk performa optimal
- **Ikon**: Font Awesome 6
- **Animasi**: Smooth transitions dan interactions

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
Buka file `index.html` di browser modern (Chrome, Firefox, Safari, Edge)

### 2. Login/Register
- Untuk demo, Anda bisa langsung login dengan kredensial apa saja
- Atau buat akun baru melalui halaman registrasi

### 3. Tambah Tugas
- Klik tombol FAB (+) di kanan bawah
- Atau klik menu "Tambah" di bottom navigation
- Isi form dan pilih kategori
- Klik "Tambah Tugas"

### 4. Kelola Tugas
- Klik checkbox untuk menandai selesai
- Klik card tugas untuk melihat detail
- Edit atau hapus tugas dari halaman detail

### 5. Lihat Statistik
- Klik menu "Statistik" untuk melihat progress
- Grafik pie menampilkan distribusi kategori
- Grafik line menampilkan progress mingguan

## 📱 Fitur PWA

Aplikasi ini adalah Progressive Web App yang bisa:
- Diinstall di home screen
- Bekerja offline (dengan service worker)
- Memberikan notifikasi push
- Memiliki splash screen

## 💾 Penyimpanan Data

Data disimpan menggunakan **localStorage** browser, sehingga:
- ✅ Data tetap tersimpan setelah browser ditutup
- ✅ Tidak perlu server atau database
- ✅ Privacy terjaga (data hanya di device Anda)
- ⚠️ Data akan hilang jika cache browser dibersihkan

## 🎯 Kategori Tugas

1. **Target** - Tugas dengan target tertentu
2. **Waktu** - Tugas berbasis waktu
3. **Belajar** - Tugas akademik/belajar
4. **Pribadi** - Tugas personal
5. **Kerja** - Tugas pekerjaan
6. **Olahraga** - Aktivitas olahraga

## 🌐 Kompatibilitas

### Browser yang Didukung
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Opera

### Perangkat
- ✅ Desktop/Laptop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android Tablet)
- ✅ Smartphone (iOS, Android)

## 📂 Struktur File

```
taskly/
├── index.html          # Halaman utama
├── style.css           # Stylesheet
├── app.js              # JavaScript logic
├── manifest.json       # PWA manifest
└── README.md          # Dokumentasi
```

## 🔧 Teknologi

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling & animations
- **JavaScript (Vanilla)** - Logic & interactivity
- **LocalStorage** - Data persistence
- **Font Awesome** - Icons
- **PWA** - Progressive Web App features

## 🎨 Palet Warna

```css
Primary: #6C5CE7 (Purple)
Secondary: #00D2D3 (Cyan)
Success: #00B894 (Green)
Warning: #FDCB6E (Yellow)
Danger: #FF7675 (Red)
Dark: #2D3436
Gray: #636E72
Light Gray: #DFE6E9
Background: #F5F6FA
White: #FFFFFF
```

## 🚀 Pengembangan Selanjutnya

### Fitur yang Akan Datang
- [ ] Service Worker untuk offline support
- [ ] Push notifications
- [ ] Sync dengan cloud (Firebase/Supabase)
- [ ] Kolaborasi tim
- [ ] Reminder & alarm
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Export/Import data
- [ ] Recurring tasks
- [ ] Subtasks
- [ ] Attachments
- [ ] Priority levels
- [ ] Tags & labels

## 📝 Lisensi

© 2026 Taskly. All rights reserved.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk mengelola tugas dengan lebih mudah dan efisien.

---

## 🎯 Tips Penggunaan

1. **Gunakan Kategori**: Kategorikan tugas untuk analisis yang lebih baik
2. **Set Deadline**: Selalu tambahkan tanggal dan waktu
3. **Review Statistik**: Lihat progress mingguan Anda
4. **Hapus Selesai**: Bersihkan tugas yang sudah selesai secara berkala
5. **Backup Data**: Export data secara berkala (fitur segera hadir)

## 🆘 Troubleshooting

### Data Hilang?
- Pastikan tidak membersihkan cache browser
- Data disimpan di localStorage
- Gunakan fitur backup (segera hadir)

### Tidak Bisa Login?
- Untuk demo, kredensial apa saja bisa digunakan
- Pastikan JavaScript diaktifkan

### Tampilan Tidak Responsif?
- Clear cache browser
- Refresh halaman (Ctrl+F5)
- Gunakan browser modern

---

**Selamat menggunakan Taskly! 🎉**
