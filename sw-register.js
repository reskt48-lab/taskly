// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// Install Prompt
let deferredPrompt;
const installPrompt = document.getElementById('install-prompt');
const installBtn = document.getElementById('install-btn');
const closeInstallBtn = document.getElementById('close-install');

// Capture the install prompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install prompt after 3 seconds
    setTimeout(() => {
        if (!localStorage.getItem('taskly_install_dismissed')) {
            installPrompt.style.display = 'block';
            setTimeout(() => {
                installPrompt.classList.add('show');
            }, 100);
        }
    }, 3000);
});

// Install button click
if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            alert('Aplikasi sudah terinstall atau browser tidak mendukung instalasi.');
            return;
        }
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        
        // Hide the install prompt
        installPrompt.classList.remove('show');
        setTimeout(() => {
            installPrompt.style.display = 'none';
        }, 300);
    });
}

// Close install prompt
if (closeInstallBtn) {
    closeInstallBtn.addEventListener('click', () => {
        installPrompt.classList.remove('show');
        setTimeout(() => {
            installPrompt.style.display = 'none';
        }, 300);
        localStorage.setItem('taskly_install_dismissed', 'true');
    });
}

// Track if app is installed
window.addEventListener('appinstalled', () => {
    console.log('✅ Taskly has been installed');
    installPrompt.style.display = 'none';
    
    // Show success message
    if (typeof showNotification === 'function') {
        showNotification('Aplikasi berhasil diinstall! 🎉');
    }
});

// Detect if running as PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
}

// Add PWA status to body class
if (isPWA()) {
    document.body.classList.add('pwa-mode');
    console.log('✅ Running as PWA');
} else {
    console.log('ℹ️ Running in browser');
}

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('✅ Back online');
    document.body.classList.remove('offline');
    if (typeof showNotification === 'function') {
        showNotification('Koneksi tersambung kembali');
    }
});

window.addEventListener('offline', () => {
    console.log('⚠️ Gone offline');
    document.body.classList.add('offline');
    if (typeof showNotification === 'function') {
        showNotification('Tidak ada koneksi internet');
    }
});
