# 📱 Cara Install Taskly di HP

## ✅ Aplikasi Sudah Online!

**Repository:** https://github.com/reskt48-lab/taskly

**Live URL:** https://reskt48-lab.github.io/taskly

---

## 🚀 Langkah 1: Aktifkan GitHub Pages

Jika belum aktif, lakukan ini:

1. Buka: https://github.com/reskt48-lab/taskly/settings/pages
2. Di bagian **"Source"**:
   - Pilih: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
3. Klik **Save**
4. Tunggu 1-2 menit
5. Refresh halaman, akan muncul URL: `https://reskt48-lab.github.io/taskly`

---

## 📱 Langkah 2: Install di Android (Chrome/Edge)

### Metode A: Install Prompt Otomatis
1. Buka `https://reskt48-lab.github.io/taskly` di Chrome
2. Tunggu beberapa detik
3. Akan muncul banner **"Install Taskly"** di bawah layar
4. Klik tombol **"Install"**
5. ✅ Selesai! App muncul di home screen

### Metode B: Manual Install
1. Buka `https://reskt48-lab.github.io/taskly` di Chrome
2. Tap menu **⋮** (3 titik) di pojok kanan atas
3. Pilih **"Add to Home screen"** atau **"Install app"**
4. Ketik nama (biarkan: Taskly)
5. Tap **"Add"** atau **"Install"**
6. ✅ Icon muncul di home screen!

---

## 🍎 Langkah 3: Install di iPhone/iPad (Safari)

1. Buka `https://reskt48-lab.github.io/taskly` di **Safari**
2. Tap tombol **Share** 🔗 (di bawah layar, tengah)
3. Scroll ke bawah
4. Pilih **"Add to Home Screen"**
5. Ketik nama (biarkan: Taskly)
6. Tap **"Add"** di pojok kanan atas
7. ✅ Icon muncul di home screen!

**Note:** Di iOS, HARUS pakai Safari, tidak bisa di Chrome!

---

## 🎯 Fitur PWA yang Didapatkan

Setelah di-install, Taskly akan:

✅ **Tampil seperti app native** (tanpa address bar)  
✅ **Icon di home screen** dengan logo Taskly  
✅ **Splash screen** saat dibuka  
✅ **Bekerja offline** (setelah dibuka sekali)  
✅ **Install prompt** muncul otomatis  
✅ **Notifikasi** (jika diaktifkan)  
✅ **Cepat & smooth** seperti app native  

---

## 🔍 Troubleshooting

### ❓ Install button tidak muncul?
**Solusi:**
- Pastikan menggunakan **HTTPS** (GitHub Pages otomatis HTTPS)
- Gunakan Chrome/Edge di Android (minimal versi 80+)
- Gunakan Safari di iOS (minimal iOS 11.3+)
- Clear cache browser dan refresh

### ❓ GitHub Pages belum aktif?
**Cek:**
1. Buka: https://github.com/reskt48-lab/taskly/settings/pages
2. Pastikan sudah ada tulisan: "Your site is live at..."
3. Jika belum, tunggu 1-5 menit lalu refresh

### ❓ Aplikasi tidak bisa dibuka offline?
**Solusi:**
- Buka aplikasi minimal sekali dengan koneksi internet
- Service Worker akan cache semua file
- Setelah itu bisa dibuka offline

### ❓ Icon tidak muncul dengan benar?
**Solusi:**
- Buka: `icon-generator.html` di browser
- Download semua icon
- Commit & push ke GitHub:
  ```bash
  cd C:\Users\Resa\OneDrive\Desktop\taskly
  git add .
  git commit -m "Add PWA icons"
  git push
  ```
- Tunggu 1-2 menit, GitHub Pages akan update

---

## 🎨 Generate Icons (Opsional)

### Cara 1: Menggunakan icon-generator.html
1. Buka file `icon-generator.html` di browser
2. Klik **"Generate All Icons"**
3. Klik **"Download All Icons"**
4. Simpan semua file ke folder `taskly`
5. Push ke GitHub

### Cara 2: Online Generator
1. Buka: https://favicon.io/favicon-generator/
2. Settings:
   - Text: **T**
   - Background: **#6C5CE7**
   - Font: **Arial Black**
3. Download & extract
4. Rename file jadi: `icon-72.png`, `icon-96.png`, dst
5. Pindahkan ke folder taskly
6. Push ke GitHub

---

## 📊 Status Deployment

| Platform | Status | URL |
|----------|--------|-----|
| GitHub | ✅ Aktif | https://github.com/reskt48-lab/taskly |
| GitHub Pages | ⏳ Pending | https://reskt48-lab.github.io/taskly |
| PWA Support | ✅ Siap | Service Worker + Manifest |
| Icons | ⚠️ Generate | Pakai icon-generator.html |

---

## 🚀 Quick Deploy ke Netlify (Alternatif)

Jika ingin lebih cepat tanpa tunggu GitHub Pages:

1. Buka: https://app.netlify.com/drop
2. Drag folder `taskly` dari Desktop
3. ✅ Langsung live! (10 detik)
4. Dapat URL: `https://taskly-xxx.netlify.app`
5. Buka di HP → Install

**Keuntungan Netlify:**
- ⚡ Instant deployment (10 detik)
- 🔄 Auto-update saat file berubah
- 🌐 CDN global (lebih cepat)
- 🆓 Gratis selamanya

---

## 📝 Checklist

Sebelum install di HP, pastikan:

- [ ] GitHub Pages sudah aktif
- [ ] URL bisa dibuka di browser laptop
- [ ] Service Worker terdaftar (cek Console)
- [ ] Manifest.json valid (cek Network tab)
- [ ] Icon sudah di-generate (opsional)

---

## 💡 Tips

### Untuk Development:
```bash
cd C:\Users\Resa\OneDrive\Desktop\taskly
npx http-server -p 8000
# Akses: http://localhost:8000
```

### Untuk Update Aplikasi:
```bash
cd C:\Users\Resa\OneDrive\Desktop\taskly
git add .
git commit -m "Update features"
git push
# Tunggu 1-2 menit, GitHub Pages akan update
```

### Force Refresh di HP:
- **Android Chrome:** Settings → Clear cache → Hard refresh
- **iOS Safari:** Hold refresh button → Clear cache

---

## 🎉 Selamat!

Aplikasi Taskly siap digunakan di HP!

**Repository:** https://github.com/reskt48-lab/taskly  
**Live App:** https://reskt48-lab.github.io/taskly

Jika ada masalah, check troubleshooting di atas atau buka issue di GitHub.

---

**Happy Tasking! 📱✨**
