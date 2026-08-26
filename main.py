"""
Taskly - Aplikasi Manajemen Tugas
Dibuat dengan Python dan Kivy
"""

from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.scrollview import ScrollView
from kivy.uix.checkbox import CheckBox
from kivy.uix.popup import Popup
from kivy.graphics import Color, RoundedRectangle
from kivy.metrics import dp
from kivy.core.window import Window
import json
from datetime import datetime, timedelta
import os

# Set window size for mobile-like experience
Window.size = (360, 640)

class TaskCard(BoxLayout):
    """Widget untuk menampilkan card tugas"""
    def __init__(self, task, callback=None, **kwargs):
        super().__init__(**kwargs)
        self.orientation = 'horizontal'
        self.size_hint_y = None
        self.height = dp(80)
        self.padding = dp(10)
        self.spacing = dp(10)
        self.task = task
        self.callback = callback
        
        # Background dengan warna
        with self.canvas.before:
            Color(1, 1, 1, 1)
            self.rect = RoundedRectangle(pos=self.pos, size=self.size, radius=[10])
        self.bind(pos=self.update_rect, size=self.update_rect)
        
        # Checkbox
        checkbox = CheckBox(
            active=task.get('completed', False),
            size_hint_x=0.15
        )
        checkbox.bind(active=self.on_checkbox_active)
        self.add_widget(checkbox)
        
        # Info tugas
        info_layout = BoxLayout(orientation='vertical', spacing=dp(5))
        
        title = Label(
            text=task.get('title', ''),
            color=(0.2, 0.2, 0.2, 1),
            font_size='16sp',
            bold=True,
            halign='left',
            valign='middle',
            text_size=(None, None)
        )
        title.bind(size=title.setter('text_size'))
        
        # Meta info
        meta_text = ''
        if task.get('date'):
            meta_text += f"📅 {task['date']}"
        if task.get('time'):
            meta_text += f"  🕐 {task['time']}"
        
        meta = Label(
            text=meta_text,
            color=(0.5, 0.5, 0.5, 1),
            font_size='12sp',
            halign='left',
            valign='middle',
            text_size=(None, None)
        )
        meta.bind(size=meta.setter('text_size'))
        
        # Category badge
        if task.get('category'):
            category = Label(
                text=task['category'],
                color=(0.42, 0.36, 0.9, 1),
                font_size='11sp',
                halign='left',
                valign='middle',
                text_size=(None, None)
            )
            category.bind(size=category.setter('text_size'))
            info_layout.add_widget(category)
        
        info_layout.add_widget(title)
        info_layout.add_widget(meta)
        
        self.add_widget(info_layout)
    
    def update_rect(self, *args):
        self.rect.pos = self.pos
        self.rect.size = self.size
    
    def on_checkbox_active(self, checkbox, value):
        if self.callback:
            self.callback(self.task['id'], value)

class HomeScreen(Screen):
    """Halaman utama/beranda"""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = 'home'
        
    def on_enter(self):
        self.clear_widgets()
        layout = BoxLayout(orientation='vertical', padding=dp(10), spacing=dp(10))
        
        # Header
        header = BoxLayout(size_hint_y=0.15, padding=dp(10))
        header_label = Label(
            text='Taskly - Tugas Saya',
            font_size='24sp',
            bold=True,
            color=(0.42, 0.36, 0.9, 1)
        )
        header.add_widget(header_label)
        layout.add_widget(header)
        
        # Greeting
        greeting = BoxLayout(orientation='vertical', size_hint_y=0.15, padding=dp(10))
        greeting.add_widget(Label(
            text='Halo, Resa! 👋',
            font_size='20sp',
            bold=True,
            color=(0.2, 0.2, 0.2, 1),
            halign='left'
        ))
        greeting.add_widget(Label(
            text='Semangat, jelaskan apa yang ingin kamu lakukan!',
            font_size='14sp',
            color=(0.5, 0.5, 0.5, 1),
            halign='left'
        ))
        layout.add_widget(greeting)
        
        # Tasks ScrollView
        scroll = ScrollView(size_hint_y=0.6)
        tasks_layout = BoxLayout(orientation='vertical', spacing=dp(10), size_hint_y=None)
        tasks_layout.bind(minimum_height=tasks_layout.setter('height'))
        
        # Load tasks
        app = App.get_running_app()
        tasks = app.load_tasks()
        
        if tasks:
            for task in tasks:
                if not task.get('completed', False):
                    card = TaskCard(task, callback=app.toggle_task)
                    card.size_hint_y = None
                    card.height = dp(80)
                    tasks_layout.add_widget(card)
        else:
            empty = Label(
                text='Belum ada tugas\nTambahkan tugas pertamamu!',
                font_size='16sp',
                color=(0.5, 0.5, 0.5, 1),
                halign='center'
            )
            tasks_layout.add_widget(empty)
        
        scroll.add_widget(tasks_layout)
        layout.add_widget(scroll)
        
        # Bottom navigation
        nav = BoxLayout(size_hint_y=0.1, spacing=dp(5), padding=dp(5))
        
        btn_home = Button(text='🏠\nBeranda', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_home.bind(on_press=lambda x: self.manager.current_screen.on_enter())
        
        btn_add = Button(text='➕\nTambah', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_add.bind(on_press=lambda x: self.manager.get_screen('add').on_enter())
        
        btn_stats = Button(text='📊\nStatistik', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_stats.bind(on_press=lambda x: self.manager.get_screen('stats').on_enter())
        
        btn_profile = Button(text='👤\nProfil', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_profile.bind(on_press=lambda x: self.manager.get_screen('profile').on_enter())
        
        nav.add_widget(btn_home)
        nav.add_widget(btn_add)
        nav.add_widget(btn_stats)
        nav.add_widget(btn_profile)
        
        layout.add_widget(nav)
        self.add_widget(layout)

class AddTaskScreen(Screen):
    """Halaman tambah tugas"""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = 'add'
        self.selected_category = None
        
    def on_enter(self):
        self.clear_widgets()
        layout = BoxLayout(orientation='vertical', padding=dp(10), spacing=dp(10))
        
        # Header
        header = BoxLayout(size_hint_y=0.1)
        back_btn = Button(text='← Kembali', size_hint_x=0.3, background_color=(0.42, 0.36, 0.9, 1))
        back_btn.bind(on_press=lambda x: setattr(self.manager, 'current', 'home'))
        header_label = Label(text='Tambah Tugas', font_size='20sp', bold=True)
        header.add_widget(back_btn)
        header.add_widget(header_label)
        layout.add_widget(header)
        
        # Form
        scroll = ScrollView(size_hint_y=0.8)
        form_layout = BoxLayout(orientation='vertical', spacing=dp(15), size_hint_y=None, padding=dp(10))
        form_layout.bind(minimum_height=form_layout.setter('height'))
        
        # Title
        form_layout.add_widget(Label(text='Judul Tugas', size_hint_y=None, height=dp(30), halign='left'))
        self.title_input = TextInput(
            hint_text='Masukkan judul tugas',
            multiline=False,
            size_hint_y=None,
            height=dp(40)
        )
        form_layout.add_widget(self.title_input)
        
        # Description
        form_layout.add_widget(Label(text='Deskripsi', size_hint_y=None, height=dp(30), halign='left'))
        self.desc_input = TextInput(
            hint_text='Deskripsi tugas (opsional)',
            multiline=True,
            size_hint_y=None,
            height=dp(80)
        )
        form_layout.add_widget(self.desc_input)
        
        # Date
        form_layout.add_widget(Label(text='Tanggal', size_hint_y=None, height=dp(30), halign='left'))
        self.date_input = TextInput(
            hint_text='YYYY-MM-DD',
            multiline=False,
            size_hint_y=None,
            height=dp(40)
        )
        form_layout.add_widget(self.date_input)
        
        # Time
        form_layout.add_widget(Label(text='Waktu', size_hint_y=None, height=dp(30), halign='left'))
        self.time_input = TextInput(
            hint_text='HH:MM',
            multiline=False,
            size_hint_y=None,
            height=dp(40)
        )
        form_layout.add_widget(self.time_input)
        
        # Category
        form_layout.add_widget(Label(text='Kategori', size_hint_y=None, height=dp(30), halign='left'))
        
        categories = ['Target', 'Waktu', 'Belajar', 'Pribadi', 'Kerja', 'Olahraga']
        cat_grid = GridLayout(cols=3, spacing=dp(10), size_hint_y=None, height=dp(100))
        
        for cat in categories:
            btn = Button(text=cat, background_color=(0.8, 0.8, 0.8, 1))
            btn.bind(on_press=self.select_category)
            cat_grid.add_widget(btn)
        
        form_layout.add_widget(cat_grid)
        
        # Submit button
        submit_btn = Button(
            text='Tambah Tugas',
            size_hint_y=None,
            height=dp(50),
            background_color=(0.42, 0.36, 0.9, 1)
        )
        submit_btn.bind(on_press=self.submit_task)
        form_layout.add_widget(submit_btn)
        
        scroll.add_widget(form_layout)
        layout.add_widget(scroll)
        
        # Bottom nav
        nav = self.create_bottom_nav()
        layout.add_widget(nav)
        
        self.add_widget(layout)
    
    def select_category(self, button):
        self.selected_category = button.text
        button.background_color = (0.42, 0.36, 0.9, 1)
    
    def submit_task(self, button):
        app = App.get_running_app()
        
        task = {
            'id': str(datetime.now().timestamp()),
            'title': self.title_input.text,
            'description': self.desc_input.text,
            'date': self.date_input.text,
            'time': self.time_input.text,
            'category': self.selected_category or 'Pribadi',
            'completed': False
        }
        
        if task['title']:
            app.add_task(task)
            self.manager.current = 'home'
        else:
            popup = Popup(
                title='Error',
                content=Label(text='Judul tugas harus diisi!'),
                size_hint=(0.8, 0.3)
            )
            popup.open()
    
    def create_bottom_nav(self):
        nav = BoxLayout(size_hint_y=0.1, spacing=dp(5), padding=dp(5))
        
        btn_home = Button(text='🏠\nBeranda', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_home.bind(on_press=lambda x: setattr(self.manager, 'current', 'home'))
        
        btn_add = Button(text='➕\nTambah', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        
        btn_stats = Button(text='📊\nStatistik', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_stats.bind(on_press=lambda x: setattr(self.manager, 'current', 'stats'))
        
        btn_profile = Button(text='👤\nProfil', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_profile.bind(on_press=lambda x: setattr(self.manager, 'current', 'profile'))
        
        nav.add_widget(btn_home)
        nav.add_widget(btn_add)
        nav.add_widget(btn_stats)
        nav.add_widget(btn_profile)
        
        return nav

class StatsScreen(Screen):
    """Halaman statistik"""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = 'stats'
        
    def on_enter(self):
        self.clear_widgets()
        layout = BoxLayout(orientation='vertical', padding=dp(10), spacing=dp(10))
        
        # Header
        header = BoxLayout(size_hint_y=0.1)
        back_btn = Button(text='← Kembali', size_hint_x=0.3, background_color=(0.42, 0.36, 0.9, 1))
        back_btn.bind(on_press=lambda x: setattr(self.manager, 'current', 'home'))
        header_label = Label(text='Statistik', font_size='20sp', bold=True)
        header.add_widget(back_btn)
        header.add_widget(header_label)
        layout.add_widget(header)
        
        # Stats content
        app = App.get_running_app()
        tasks = app.load_tasks()
        
        total = len(tasks)
        completed = len([t for t in tasks if t.get('completed', False)])
        incomplete = total - completed
        percentage = int((completed / total * 100)) if total > 0 else 0
        
        stats_layout = BoxLayout(orientation='vertical', spacing=dp(15), padding=dp(20))
        
        # Summary cards
        summary = GridLayout(cols=2, spacing=dp(10), size_hint_y=0.3)
        
        summary.add_widget(self.create_stat_card('Total Tugas', str(total)))
        summary.add_widget(self.create_stat_card('Selesai', str(completed)))
        summary.add_widget(self.create_stat_card('Berlanjut', str(incomplete)))
        summary.add_widget(self.create_stat_card('Penyelesaian', f'{percentage}%'))
        
        stats_layout.add_widget(summary)
        
        # Category stats
        cat_stats = Label(
            text='Statistik berdasarkan kategori\nakan ditampilkan di sini',
            font_size='14sp',
            color=(0.5, 0.5, 0.5, 1)
        )
        stats_layout.add_widget(cat_stats)
        
        layout.add_widget(stats_layout)
        
        # Bottom nav
        nav = self.create_bottom_nav()
        layout.add_widget(nav)
        
        self.add_widget(layout)
    
    def create_stat_card(self, label, value):
        card = BoxLayout(orientation='vertical', padding=dp(15))
        with card.canvas.before:
            Color(0.42, 0.36, 0.9, 0.2)
            self.rect = RoundedRectangle(pos=card.pos, size=card.size, radius=[10])
        card.bind(pos=lambda *args: setattr(self.rect, 'pos', card.pos))
        card.bind(size=lambda *args: setattr(self.rect, 'size', card.size))
        
        card.add_widget(Label(text=value, font_size='28sp', bold=True, color=(0.42, 0.36, 0.9, 1)))
        card.add_widget(Label(text=label, font_size='14sp', color=(0.3, 0.3, 0.3, 1)))
        
        return card
    
    def create_bottom_nav(self):
        nav = BoxLayout(size_hint_y=0.1, spacing=dp(5), padding=dp(5))
        
        btn_home = Button(text='🏠\nBeranda', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_home.bind(on_press=lambda x: setattr(self.manager, 'current', 'home'))
        
        btn_add = Button(text='➕\nTambah', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_add.bind(on_press=lambda x: setattr(self.manager, 'current', 'add'))
        
        btn_stats = Button(text='📊\nStatistik', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        
        btn_profile = Button(text='👤\nProfil', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_profile.bind(on_press=lambda x: setattr(self.manager, 'current', 'profile'))
        
        nav.add_widget(btn_home)
        nav.add_widget(btn_add)
        nav.add_widget(btn_stats)
        nav.add_widget(btn_profile)
        
        return nav

class ProfileScreen(Screen):
    """Halaman profil"""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = 'profile'
        
    def on_enter(self):
        self.clear_widgets()
        layout = BoxLayout(orientation='vertical', padding=dp(10), spacing=dp(10))
        
        # Header
        header = BoxLayout(size_hint_y=0.1)
        back_btn = Button(text='← Kembali', size_hint_x=0.3, background_color=(0.42, 0.36, 0.9, 1))
        back_btn.bind(on_press=lambda x: setattr(self.manager, 'current', 'home'))
        header_label = Label(text='Profil', font_size='20sp', bold=True)
        header.add_widget(back_btn)
        header.add_widget(header_label)
        layout.add_widget(header)
        
        # Profile content
        profile_layout = BoxLayout(orientation='vertical', spacing=dp(20), padding=dp(20))
        
        # Avatar
        avatar = Label(text='👤', font_size='80sp')
        profile_layout.add_widget(avatar)
        
        # Name
        name = Label(text='Resa Fakra', font_size='24sp', bold=True)
        profile_layout.add_widget(name)
        
        # Email
        email = Label(text='resa@gmail.com', font_size='16sp', color=(0.5, 0.5, 0.5, 1))
        profile_layout.add_widget(email)
        
        # Menu items
        menu = BoxLayout(orientation='vertical', spacing=dp(10), padding=dp(20))
        
        settings_btn = Button(
            text='⚙️ Pengaturan',
            size_hint_y=None,
            height=dp(50),
            background_color=(0.9, 0.9, 0.9, 1),
            color=(0.2, 0.2, 0.2, 1)
        )
        
        about_btn = Button(
            text='ℹ️ Tentang Aplikasi',
            size_hint_y=None,
            height=dp(50),
            background_color=(0.9, 0.9, 0.9, 1),
            color=(0.2, 0.2, 0.2, 1)
        )
        about_btn.bind(on_press=self.show_about)
        
        logout_btn = Button(
            text='🚪 Keluar',
            size_hint_y=None,
            height=dp(50),
            background_color=(1, 0.3, 0.3, 1)
        )
        logout_btn.bind(on_press=self.logout)
        
        menu.add_widget(settings_btn)
        menu.add_widget(about_btn)
        menu.add_widget(logout_btn)
        
        profile_layout.add_widget(menu)
        layout.add_widget(profile_layout)
        
        # Bottom nav
        nav = self.create_bottom_nav()
        layout.add_widget(nav)
        
        self.add_widget(layout)
    
    def show_about(self, button):
        popup = Popup(
            title='Tentang Taskly',
            content=Label(text='Taskly v1.0.0\nAplikasi Manajemen Tugas\nDibuat dengan Python & Kivy\n\n© 2026 Taskly'),
            size_hint=(0.8, 0.5)
        )
        popup.open()
    
    def logout(self, button):
        popup = Popup(
            title='Keluar',
            content=Label(text='Terima kasih telah menggunakan Taskly!'),
            size_hint=(0.8, 0.3)
        )
        popup.open()
    
    def create_bottom_nav(self):
        nav = BoxLayout(size_hint_y=0.1, spacing=dp(5), padding=dp(5))
        
        btn_home = Button(text='🏠\nBeranda', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_home.bind(on_press=lambda x: setattr(self.manager, 'current', 'home'))
        
        btn_add = Button(text='➕\nTambah', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_add.bind(on_press=lambda x: setattr(self.manager, 'current', 'add'))
        
        btn_stats = Button(text='📊\nStatistik', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        btn_stats.bind(on_press=lambda x: setattr(self.manager, 'current', 'stats'))
        
        btn_profile = Button(text='👤\nProfil', font_size='12sp', background_color=(0.42, 0.36, 0.9, 1))
        
        nav.add_widget(btn_home)
        nav.add_widget(btn_add)
        nav.add_widget(btn_stats)
        nav.add_widget(btn_profile)
        
        return nav

class TasklyApp(App):
    """Main Application"""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.data_file = 'taskly_data.json'
    
    def build(self):
        sm = ScreenManager()
        sm.add_widget(HomeScreen())
        sm.add_widget(AddTaskScreen())
        sm.add_widget(StatsScreen())
        sm.add_widget(ProfileScreen())
        return sm
    
    def load_tasks(self):
        """Load tasks from JSON file"""
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                return self.get_sample_tasks()
        return self.get_sample_tasks()
    
    def save_tasks(self, tasks):
        """Save tasks to JSON file"""
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(tasks, f, ensure_ascii=False, indent=2)
    
    def add_task(self, task):
        """Add new task"""
        tasks = self.load_tasks()
        tasks.append(task)
        self.save_tasks(tasks)
    
    def toggle_task(self, task_id, completed):
        """Toggle task completion status"""
        tasks = self.load_tasks()
        for task in tasks:
            if task['id'] == task_id:
                task['completed'] = completed
                break
        self.save_tasks(tasks)
    
    def get_sample_tasks(self):
        """Sample tasks for demo"""
        today = datetime.now().strftime('%Y-%m-%d')
        return [
            {
                'id': '1',
                'title': 'Menyelesaikan tugas matematika',
                'description': 'Bab 5 halaman 45-50',
                'date': today,
                'time': '14:00',
                'category': 'Belajar',
                'completed': False
            },
            {
                'id': '2',
                'title': 'Membaca buku pemrograman',
                'description': 'Chapter tentang Kivy',
                'date': today,
                'time': '16:00',
                'category': 'Belajar',
                'completed': False
            },
            {
                'id': '3',
                'title': 'Olahraga sore',
                'description': 'Jogging 30 menit',
                'date': today,
                'time': '17:00',
                'category': 'Olahraga',
                'completed': False
            }
        ]

if __name__ == '__main__':
    TasklyApp().run()
