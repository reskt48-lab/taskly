// App State
const AppState = {
    currentPage: 'home',
    currentUser: null,
    tasks: [],
    isAuthenticated: false
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        initApp();
    }, 2500);
});

function initApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('taskly_user');
    if (savedUser) {
        AppState.currentUser = JSON.parse(savedUser);
        AppState.isAuthenticated = true;
        loadTasks();
        renderPage('home');
    } else {
        renderPage('login');
    }

    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            if (page === 'add') {
                showAddTaskModal();
            } else {
                renderPage(page);
            }
        });
    });

    // FAB button
    document.getElementById('fab-btn').addEventListener('click', () => {
        showAddTaskModal();
    });

    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
        if (AppState.currentPage !== 'home') {
            renderPage('home');
        }
    });

    // Search button
    document.getElementById('search-btn').addEventListener('click', () => {
        showSearchModal();
    });

    // More button
    document.getElementById('more-btn').addEventListener('click', () => {
        showMoreMenu();
    });
}

// Render Page
function renderPage(page) {
    AppState.currentPage = page;
    const content = document.getElementById('main-content');
    const headerTitle = document.getElementById('header-title');
    const backBtn = document.getElementById('back-btn');
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });

    // Show/hide back button
    backBtn.classList.toggle('hidden', page === 'home' || page === 'login' || page === 'register');

    // Render content based on page
    switch(page) {
        case 'home':
            headerTitle.textContent = 'Tugas Saya';
            content.innerHTML = renderHomePage();
            setupHomeListeners();
            break;
        case 'calendar':
            headerTitle.textContent = 'Kalender';
            content.innerHTML = renderCalendarPage();
            setupCalendarListeners();
            break;
        case 'stats':
            headerTitle.textContent = 'Statistik';
            content.innerHTML = renderStatsPage();
            setupStatsListeners();
            break;
        case 'profile':
            headerTitle.textContent = 'Profil';
            content.innerHTML = renderProfilePage();
            setupProfileListeners();
            break;
        case 'login':
            headerTitle.textContent = 'Masuk';
            content.innerHTML = renderLoginPage();
            setupAuthListeners();
            document.querySelector('.bottom-nav').style.display = 'none';
            document.querySelector('.fab').style.display = 'none';
            break;
        case 'register':
            headerTitle.textContent = 'Daftar';
            content.innerHTML = renderRegisterPage();
            setupAuthListeners();
            document.querySelector('.bottom-nav').style.display = 'none';
            document.querySelector('.fab').style.display = 'none';
            break;
        case 'settings':
            headerTitle.textContent = 'Pengaturan';
            content.innerHTML = renderSettingsPage();
            setupSettingsListeners();
            break;
        case 'add-assignment':
            headerTitle.textContent = 'Tambah Tugas';
            content.innerHTML = renderAddAssignmentPage();
            setupAddAssignmentListeners();
            break;
    }
}

// Home Page
function renderHomePage() {
    const incompleteTasks = AppState.tasks.filter(t => !t.completed);
    const todayTasks = getTodayTasks();
    const upcomingTasks = getUpcomingTasks();

    return `
        <div class="home-page">
            <div class="greeting">
                <h2>Halo, ${AppState.currentUser?.name || 'Resa'}! 👋</h2>
                <p>Semangat, jelaskan apa yang ingin kamu lakukan!</p>
            </div>

            ${todayTasks.length > 0 ? `
            <div class="task-section">
                <div class="section-header">
                    <h3>Hari Ini</h3>
                    <button class="btn-link" onclick="viewAllTasks('today')">Lihat Semua</button>
                </div>
                ${todayTasks.map(task => renderTaskCard(task)).join('')}
            </div>
            ` : ''}

            <div class="task-section">
                <div class="section-header">
                    <h3>Keperluan Tugas Sekolah</h3>
                    <button class="btn-link" onclick="viewAllTasks('school')">Lihat Semua</button>
                </div>
                ${incompleteTasks.length > 0 ? incompleteTasks.slice(0, 3).map(task => renderTaskCard(task)).join('') : `
                    <div class="empty-state">
                        <i class="far fa-clipboard"></i>
                        <h3>Belum ada tugas</h3>
                        <p>Tambahkan tugas pertamamu!</p>
                    </div>
                `}
            </div>

            ${upcomingTasks.length > 0 ? `
            <div class="task-section">
                <div class="section-header">
                    <h3>Mendatang</h3>
                </div>
                ${upcomingTasks.slice(0, 2).map(task => renderTaskCard(task)).join('')}
            </div>
            ` : ''}
        </div>
    `;
}

function renderTaskCard(task) {
    const categoryClass = task.category ? `category-${task.category.toLowerCase().replace(/\s/g, '-')}` : 'category-pribadi';
    return `
        <div class="task-card ${task.completed ? 'completed-task' : ''}" data-task-id="${task.id}">
            <div class="task-header">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask('${task.id}')"></div>
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                        ${task.date ? `<span><i class="far fa-clock"></i>${formatDate(task.date)}</span>` : ''}
                        ${task.time ? `<span><i class="far fa-clock"></i>${task.time}</span>` : ''}
                    </div>
                    ${task.category ? `<span class="task-category ${categoryClass}">${task.category}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function setupHomeListeners() {
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('task-checkbox')) {
                const taskId = card.dataset.taskId;
                showTaskDetail(taskId);
            }
        });
    });
}

// Calendar Page
function renderCalendarPage() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    let calendarDays = '';
    
    // Previous month days
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        calendarDays += `<div class="day-cell other-month">${prevMonthDays - i}</div>`;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === currentDate.getDate();
        const hasTask = hasTaskOnDate(new Date(currentYear, currentMonth, day));
        calendarDays += `<div class="day-cell ${isToday ? 'today' : ''} ${hasTask ? 'has-task' : ''}" data-date="${currentYear}-${currentMonth + 1}-${day}">${day}</div>`;
    }
    
    const todayTasks = getTodayTasks();

    return `
        <div class="calendar-page">
            <div class="calendar-header">
                <h3>${monthNames[currentMonth]} ${currentYear}</h3>
                <div class="calendar-nav">
                    <button class="btn-icon" onclick="changeMonth(-1)"><i class="fas fa-chevron-left"></i></button>
                    <button class="btn-icon" onclick="changeMonth(1)"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            
            <div class="calendar-grid">
                <div class="calendar-days">
                    <div class="day-label">Min</div>
                    <div class="day-label">Sen</div>
                    <div class="day-label">Sel</div>
                    <div class="day-label">Rab</div>
                    <div class="day-label">Kam</div>
                    <div class="day-label">Jum</div>
                    <div class="day-label">Sab</div>
                    ${calendarDays}
                </div>
            </div>

            <div class="agenda-list">
                <h4>Agenda Hari Ini</h4>
                ${todayTasks.length > 0 ? todayTasks.map(task => renderTaskCard(task)).join('') : `
                    <div class="empty-state">
                        <i class="far fa-calendar-check"></i>
                        <h3>Tidak ada agenda</h3>
                        <p>Hari ini bebas tugas!</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function setupCalendarListeners() {
    document.querySelectorAll('.day-cell').forEach(cell => {
        cell.addEventListener('click', (e) => {
            const date = e.target.dataset.date;
            if (date) {
                showTasksForDate(date);
            }
        });
    });
}

// Stats Page
function renderStatsPage() {
    const totalTasks = AppState.tasks.length;
    const completedTasks = AppState.tasks.filter(t => t.completed).length;
    const incompleteTasks = totalTasks - completedTasks;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const categoryStats = getCategoryStats();

    return `
        <div class="stats-page">
            <div class="stats-summary">
                <div class="stat-card">
                    <div class="stat-value">${totalTasks}</div>
                    <div class="stat-label">Total Tugas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${completedTasks}</div>
                    <div class="stat-label">Selesai</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${incompleteTasks}</div>
                    <div class="stat-label">Berlanjut</div>
                </div>
                <div class="stat-card">
                    <div class="stat-percentage">${percentage}%</div>
                    <div class="stat-label">Penyelesaian</div>
                </div>
            </div>

            <div class="chart-container">
                <h3>Kategori Tugas</h3>
                <canvas id="pieChart" class="pie-chart"></canvas>
                <div class="chart-legend">
                    ${categoryStats.map(cat => `
                        <div class="legend-item">
                            <div class="legend-label">
                                <div class="legend-color" style="background: ${cat.color}"></div>
                                <span>${cat.name}</span>
                            </div>
                            <span class="legend-percentage">${cat.percentage}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="chart-container">
                <h3>Progres Mingguan</h3>
                <canvas id="lineChart" class="line-chart"></canvas>
            </div>
        </div>
    `;
}

function setupStatsListeners() {
    // Draw charts
    drawPieChart();
    drawLineChart();
}

function drawPieChart() {
    const canvas = document.getElementById('pieChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    const categoryStats = getCategoryStats();
    let currentAngle = -Math.PI / 2;
    
    categoryStats.forEach(cat => {
        const sliceAngle = (cat.percentage / 100) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.arc(100, 100, 80, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(100, 100);
        ctx.fillStyle = cat.color;
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
    
    // Center circle
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
}

function drawLineChart() {
    const canvas = document.getElementById('lineChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    const weekData = getWeeklyStats();
    const maxValue = Math.max(...weekData.map(d => d.completed), 10);
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    // Draw grid
    ctx.strokeStyle = '#DFE6E9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#6C5CE7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    weekData.forEach((data, index) => {
        const x = padding + (width / (weekData.length - 1)) * index;
        const y = padding + height - (data.completed / maxValue) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#6C5CE7';
    weekData.forEach((data, index) => {
        const x = padding + (width / (weekData.length - 1)) * index;
        const y = padding + height - (data.completed / maxValue) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#636E72';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    weekData.forEach((data, index) => {
        const x = padding + (width / (weekData.length - 1)) * index;
        ctx.fillText(data.label, x, canvas.height - 10);
    });
}

// Profile Page
function renderProfilePage() {
    const user = AppState.currentUser || { name: 'Resa Fakra', email: 'resa@gmail.com' };
    
    return `
        <div class="profile-page">
            <div class="profile-header">
                <div class="profile-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="profile-name">${user.name}</div>
                <div class="profile-email">${user.email}</div>
            </div>

            <div class="profile-menu">
                <div class="menu-item" onclick="renderPage('settings')">
                    <i class="fas fa-cog"></i>
                    <div class="menu-item-content">
                        <div class="menu-item-title">Pengaturan</div>
                        <div class="menu-item-subtitle">Notifikasi, tema, bahasa</div>
                    </div>
                    <i class="fas fa-chevron-right menu-item-arrow"></i>
                </div>
                <div class="menu-item" onclick="showCategories()">
                    <i class="fas fa-tags"></i>
                    <div class="menu-item-content">
                        <div class="menu-item-title">Kategori</div>
                        <div class="menu-item-subtitle">Kelola kategori tugas</div>
                    </div>
                    <i class="fas fa-chevron-right menu-item-arrow"></i>
                </div>
                <div class="menu-item" onclick="showThemes()">
                    <i class="fas fa-palette"></i>
                    <div class="menu-item-content">
                        <div class="menu-item-title">Tema</div>
                        <div class="menu-item-subtitle">Terang</div>
                    </div>
                    <i class="fas fa-chevron-right menu-item-arrow"></i>
                </div>
            </div>

            <div class="profile-menu">
                <div class="menu-item" onclick="showHelp()">
                    <i class="fas fa-question-circle"></i>
                    <div class="menu-item-content">
                        <div class="menu-item-title">Bantuan & Dukungan</div>
                    </div>
                    <i class="fas fa-chevron-right menu-item-arrow"></i>
                </div>
                <div class="menu-item" onclick="showAbout()">
                    <i class="fas fa-info-circle"></i>
                    <div class="menu-item-content">
                        <div class="menu-item-title">Tentang</div>
                    </div>
                    <i class="fas fa-chevron-right menu-item-arrow"></i>
                </div>
            </div>

            <div class="profile-menu">
                <div class="menu-item danger" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                    <div class="menu-item-content">
                        <div class="menu-item-title">Keluar</div>
                    </div>
                    <i class="fas fa-chevron-right menu-item-arrow"></i>
                </div>
            </div>
        </div>
    `;
}

function setupProfileListeners() {
    // Listeners are inline in the HTML
}

// Settings Page
function renderSettingsPage() {
    const settings = getSettings();
    
    return `
        <div class="settings-page">
            <div class="settings-section">
                <h3>Notifikasi</h3>
                <div class="profile-menu">
                    <div class="menu-item">
                        <i class="fas fa-bell"></i>
                        <div class="menu-item-content">
                            <div class="menu-item-title">Pengingat Tugas</div>
                        </div>
                        <div class="toggle-switch ${settings.taskReminder ? 'active' : ''}" onclick="toggleSetting('taskReminder')"></div>
                    </div>
                    <div class="menu-item">
                        <i class="fas fa-envelope"></i>
                        <div class="menu-item-content">
                            <div class="menu-item-title">Notifikasi Push</div>
                        </div>
                        <div class="toggle-switch ${settings.pushNotif ? 'active' : ''}" onclick="toggleSetting('pushNotif')"></div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>Privasi</h3>
                <div class="profile-menu">
                    <div class="menu-item" onclick="changePassword()">
                        <i class="fas fa-lock"></i>
                        <div class="menu-item-content">
                            <div class="menu-item-title">Ubat Password</div>
                        </div>
                        <i class="fas fa-chevron-right menu-item-arrow"></i>
                    </div>
                    <div class="menu-item" onclick="showBackupRestore()">
                        <i class="fas fa-database"></i>
                        <div class="menu-item-content">
                            <div class="menu-item-title">Backup & Restore</div>
                        </div>
                        <i class="fas fa-chevron-right menu-item-arrow"></i>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>Lainnya</h3>
                <div class="profile-menu">
                    <div class="menu-item" onclick="deleteAccount()">
                        <i class="fas fa-trash"></i>
                        <div class="menu-item-content">
                            <div class="menu-item-title">Hapus Akun</div>
                        </div>
                        <i class="fas fa-chevron-right menu-item-arrow"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupSettingsListeners() {
    // Listeners are inline
}

// Auth Pages
function renderLoginPage() {
    return `
        <div class="auth-page">
            <div class="auth-logo">
                <i class="fas fa-check-circle"></i>
                <h1>Taskly</h1>
                <p>Catat Tugasmu</p>
            </div>

            <form id="login-form" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>Email atau Username</label>
                    <input type="text" class="form-input" placeholder="Nama Lengkap" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <div class="password-input">
                        <input type="password" class="form-input" id="login-password" placeholder="Password" required>
                        <button type="button" class="password-toggle" onclick="togglePassword('login-password')">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>

                <button type="button" class="btn-link" style="margin-bottom: 20px;" onclick="forgotPassword()">Lupa Password?</button>

                <button type="submit" class="btn-primary">Login</button>
            </form>

            <div class="divider">Atau punya akun?</div>

            <button class="btn-google" onclick="loginWithGoogle()">
                <i class="fab fa-google"></i>
                Login dengan Google
            </button>

            <div class="auth-footer">
                Sudah punya akun? <button onclick="renderPage('register')">Daftar</button>
            </div>
        </div>
    `;
}

function renderRegisterPage() {
    return `
        <div class="auth-page">
            <div class="auth-logo">
                <i class="fas fa-check-circle"></i>
                <h1>Buat Akun</h1>
                <p>Mulai catat tugasmu!</p>
            </div>

            <form id="register-form" onsubmit="handleRegister(event)">
                <div class="form-group">
                    <label>Nama Lengkap</label>
                    <input type="text" class="form-input" placeholder="Nama Lengkap" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" placeholder="Email" required>
                </div>

                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-input" placeholder="Username" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <div class="password-input">
                        <input type="password" class="form-input" id="register-password" placeholder="Password" required>
                        <button type="button" class="password-toggle" onclick="togglePassword('register-password')">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label>Konfirmasi Password</label>
                    <div class="password-input">
                        <input type="password" class="form-input" id="confirm-password" placeholder="Konfirmasi Password" required>
                        <button type="button" class="password-toggle" onclick="togglePassword('confirm-password')">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>

                <button type="submit" class="btn-primary">Daftar</button>
            </form>

            <div class="divider">Atau punya akun?</div>

            <button class="btn-google" onclick="loginWithGoogle()">
                <i class="fab fa-google"></i>
                Login dengan Google
            </button>

            <div class="auth-footer">
                Sudah punya akun? <button onclick="renderPage('login')">Login</button>
            </div>
        </div>
    `;
}

function setupAuthListeners() {
    // Forms handle their own submit events
}

// Add Task Modal
function showAddTaskModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Tambah Tugas</h2>
                <button class="btn-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
            </div>
            
            <form id="add-task-form" onsubmit="handleAddTask(event)">
                <div class="form-group">
                    <label>Judul Tugas</label>
                    <input type="text" class="form-input" name="title" placeholder="Masukkan judul tugas" required>
                </div>

                <div class="form-group">
                    <label>Deskripsi</label>
                    <textarea class="form-input" name="description" placeholder="Deskripsi tugas (opsional)"></textarea>
                </div>

                <div class="form-group">
                    <label>Tanggal</label>
                    <input type="date" class="form-input" name="date">
                </div>

                <div class="form-group">
                    <label>Waktu</label>
                    <input type="time" class="form-input" name="time">
                </div>

                <div class="form-group">
                    <label>Kategori</label>
                    <div class="category-grid">
                        <div class="category-option" data-category="Target">
                            <i class="fas fa-bullseye"></i>
                            <div>Target</div>
                        </div>
                        <div class="category-option" data-category="Waktu">
                            <i class="fas fa-clock"></i>
                            <div>Waktu</div>
                        </div>
                        <div class="category-option" data-category="Belajar">
                            <i class="fas fa-book"></i>
                            <div>Belajar</div>
                        </div>
                        <div class="category-option" data-category="Pribadi">
                            <i class="fas fa-user"></i>
                            <div>Pribadi</div>
                        </div>
                        <div class="category-option" data-category="Kerja">
                            <i class="fas fa-briefcase"></i>
                            <div>Kerja</div>
                        </div>
                        <div class="category-option" data-category="Olahraga">
                            <i class="fas fa-dumbbell"></i>
                            <div>Olahraga</div>
                        </div>
                    </div>
                    <input type="hidden" name="category" id="selected-category">
                </div>

                <button type="submit" class="btn-primary">Tambah Tugas</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Batal</button>
            </form>
        </div>
    `;
    
    document.getElementById('modal-container').appendChild(modal);
    
    // Category selection
    document.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', (e) => {
            document.querySelectorAll('.category-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            document.getElementById('selected-category').value = option.dataset.category;
        });
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Task Detail Modal
function showTaskDetail(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Detail Tugas</h2>
                <button class="btn-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
            </div>
            
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 16px;">${task.title}</h3>
                ${task.description ? `<p style="color: var(--gray); margin-bottom: 20px;">${task.description}</p>` : ''}
                
                <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                    ${task.date ? `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <i class="far fa-calendar" style="color: var(--primary); width: 24px;"></i>
                            <span>${formatDate(task.date)}</span>
                        </div>
                    ` : ''}
                    ${task.time ? `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <i class="far fa-clock" style="color: var(--primary); width: 24px;"></i>
                            <span>${task.time}</span>
                        </div>
                    ` : ''}
                    ${task.category ? `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <i class="fas fa-tag" style="color: var(--primary); width: 24px;"></i>
                            <span>${task.category}</span>
                        </div>
                    ` : ''}
                </div>

                <button class="btn-primary" onclick="toggleTask('${task.id}'); closeModal();">
                    ${task.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                </button>
                <button class="btn-secondary" onclick="editTask('${task.id}')">Edit Tugas</button>
                <button class="btn-secondary" onclick="deleteTask('${task.id}')" style="border-color: var(--danger); color: var(--danger);">
                    Hapus Tugas
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('modal-container').appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const container = document.getElementById('modal-container');
    container.innerHTML = '';
}

// Helper Functions
function loadTasks() {
    const savedTasks = localStorage.getItem('taskly_tasks');
    if (savedTasks) {
        AppState.tasks = JSON.parse(savedTasks);
    } else {
        // Sample tasks
        AppState.tasks = [
            {
                id: '1',
                title: 'Target',
                description: 'Menyelesaikan tugas matematika',
                date: new Date().toISOString().split('T')[0],
                time: '22 Mar 2025',
                category: 'Target',
                completed: false
            },
            {
                id: '2',
                title: 'Waktu',
                description: 'Membaca buku pemrograman',
                date: new Date().toISOString().split('T')[0],
                time: '14:00',
                category: 'Waktu',
                completed: false
            },
            {
                id: '3',
                title: 'Belajar',
                description: 'Belajar bahasa Inggris',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                time: 'Sekolah',
                category: 'Belajar',
                completed: false
            },
            {
                id: '4',
                title: 'Kegiatan',
                description: 'Olahraga sore',
                date: new Date().toISOString().split('T')[0],
                time: '10 menit sebelumnya',
                category: 'Pribadi',
                completed: false
            },
            {
                id: '5',
                title: 'Penugasan',
                description: 'Mengerjakan tugas sekolah',
                date: new Date().toISOString().split('T')[0],
                time: '10 menit sebelumnya',
                category: 'Belajar',
                completed: false
            }
        ];
        saveTasks();
    }
}

function saveTasks() {
    localStorage.setItem('taskly_tasks', JSON.stringify(AppState.tasks));
}

function toggleTask(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderPage(AppState.currentPage);
    }
}

function handleAddTask(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const newTask = {
        id: Date.now().toString(),
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        time: formData.get('time'),
        category: formData.get('category'),
        completed: false
    };
    
    AppState.tasks.push(newTask);
    saveTasks();
    closeModal();
    renderPage('home');
}

function deleteTask(taskId) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
        saveTasks();
        closeModal();
        renderPage(AppState.currentPage);
    }
}

function editTask(taskId) {
    // Implementation for edit task
    closeModal();
    alert('Fitur edit akan segera hadir!');
}

function getTodayTasks() {
    const today = new Date().toISOString().split('T')[0];
    return AppState.tasks.filter(t => t.date === today && !t.completed);
}

function getUpcomingTasks() {
    const today = new Date().toISOString().split('T')[0];
    return AppState.tasks.filter(t => t.date > today && !t.completed);
}

function hasTaskOnDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    return AppState.tasks.some(t => t.date === dateStr);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getCategoryStats() {
    const categories = {
        'Target': { count: 0, color: '#FF7675' },
        'Waktu': { count: 0, color: '#0984E3' },
        'Belajar': { count: 0, color: '#FDCB6E' },
        'Pribadi': { count: 0, color: '#6C5CE7' },
        'Kerja': { count: 0, color: '#00B894' },
        'Olahraga': { count: 0, color: '#00D2D3' }
    };
    
    AppState.tasks.forEach(task => {
        if (task.category && categories[task.category]) {
            categories[task.category].count++;
        }
    });
    
    const total = AppState.tasks.length || 1;
    
    return Object.entries(categories).map(([name, data]) => ({
        name,
        count: data.count,
        percentage: Math.round((data.count / total) * 100),
        color: data.color
    })).filter(cat => cat.count > 0);
}

function getWeeklyStats() {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const today = new Date();
    const stats = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const completed = AppState.tasks.filter(t => t.date === dateStr && t.completed).length;
        
        stats.push({
            label: days[date.getDay()],
            completed
        });
    }
    
    return stats;
}

function getSettings() {
    const saved = localStorage.getItem('taskly_settings');
    return saved ? JSON.parse(saved) : {
        taskReminder: true,
        pushNotif: true
    };
}

function toggleSetting(key) {
    const settings = getSettings();
    settings[key] = !settings[key];
    localStorage.setItem('taskly_settings', JSON.stringify(settings));
    renderPage('settings');
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate login
    AppState.currentUser = {
        name: 'Resa Fakra',
        email: formData.get('email') || 'resa@gmail.com'
    };
    AppState.isAuthenticated = true;
    
    localStorage.setItem('taskly_user', JSON.stringify(AppState.currentUser));
    
    document.querySelector('.bottom-nav').style.display = 'flex';
    document.querySelector('.fab').style.display = 'flex';
    
    renderPage('home');
}

function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const password = formData.get('password');
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
    }
    
    // Simulate registration
    AppState.currentUser = {
        name: formData.get('name') || 'User',
        email: formData.get('email')
    };
    AppState.isAuthenticated = true;
    
    localStorage.setItem('taskly_user', JSON.stringify(AppState.currentUser));
    
    document.querySelector('.bottom-nav').style.display = 'flex';
    document.querySelector('.fab').style.display = 'flex';
    
    renderPage('home');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function loginWithGoogle() {
    alert('Login dengan Google akan segera tersedia!');
}

function forgotPassword() {
    alert('Fitur lupa password akan segera tersedia!');
}

function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('taskly_user');
        AppState.currentUser = null;
        AppState.isAuthenticated = false;
        renderPage('login');
    }
}

function showSearchModal() {
    alert('Fitur pencarian akan segera tersedia!');
}

function showMoreMenu() {
    alert('Menu lainnya akan segera tersedia!');
}

function viewAllTasks(type) {
    alert(`Menampilkan semua tugas ${type}`);
}

function changeMonth(direction) {
    alert('Fitur navigasi bulan akan segera tersedia!');
}

function showTasksForDate(date) {
    alert(`Menampilkan tugas untuk tanggal ${date}`);
}

function showCategories() {
    alert('Fitur kelola kategori akan segera tersedia!');
}

function showThemes() {
    alert('Fitur tema akan segera tersedia!');
}

function showHelp() {
    alert('Bantuan: Hubungi support@taskly.com');
}

function showAbout() {
    alert('Taskly v1.0.0\nAplikasi manajemen tugas yang mudah dan powerful');
}

function changePassword() {
    alert('Fitur ubah password akan segera tersedia!');
}

function showBackupRestore() {
    alert('Fitur backup & restore akan segera tersedia!');
}

function deleteAccount() {
    if (confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan!')) {
        localStorage.clear();
        location.reload();
    }
}
