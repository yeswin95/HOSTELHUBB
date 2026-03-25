// ── Data Management Helpers ──────────────────────

function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
        return [];
    }
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ── Initialize Dummy Data ────────────────────────
const initialStudents = [
    { id: 1, name: "Arjun Kumar", email: "arjun@example.com", roomNo: "101", feesStatus: "Paid", attendance: 95, phone: "9876543210", course: "B.Tech CSE" },
    { id: 2, name: "Sneha Reddy", email: "sneha@example.com", roomNo: "202", feesStatus: "Pending", attendance: 88, phone: "9876543211", course: "MBA" },
    { id: 3, name: "Rahul Verma", email: "rahul@example.com", roomNo: "101", feesStatus: "Paid", attendance: 92, phone: "9876543212", course: "B.Arch" }
];

const initialRooms = [
    { roomNo: "101", capacity: 2, occupied: 2, type: "AC", status: "Full" },
    { roomNo: "202", capacity: 2, occupied: 1, type: "Non-AC", status: "Available" },
    { roomNo: "303", capacity: 3, occupied: 0, type: "AC", status: "Available" }
];

const initialComplaints = [
    { id: 1, studentName: "Arjun Kumar", category: "Electrical", message: "AC is leaking water", status: "Pending", date: "2026-01-20" },
    { id: 2, studentName: "Sneha Reddy", category: "Internet", message: "WiFi signal weak in room 202", status: "Resolved", date: "2026-01-18" }
];

const initialMenu = [
    { day: "Monday", breakfast: "Bread, Jam", lunch: "Rice, curry, Dal, chutney, Curd", snacks: "Samosa", dinner: "Rice, Sambar, Chutney, Curry" },
    { day: "Tuesday", breakfast: "Eggs, Fruit", lunch: "Salad", snacks: "Fruit", dinner: "Soup" },
    { day: "Wednesday", breakfast: "Poha, Sev", lunch: "Jeera Rice, Dal Tadka", snacks: "Tea, Pakora", dinner: "Dosa, Coconut Chutney" },
    { day: "Thursday", breakfast: "Upma, Pickle", lunch: "Lemon Rice, Curd", snacks: "Milk, Fruit", dinner: "Chapati, Mixed Veg" },
    { day: "Friday", breakfast: "Bread, Omelette", lunch: "Egg Curry, Rice", snacks: "Tea, Mirchi Bajji", dinner: "Chicken Biryani (Spl)" },
    { day: "Saturday", breakfast: "Masala Dosa", lunch: "Tomato Bath", snacks: "Coffee, Chips", dinner: "Roti, Dal" },
    { day: "Sunday", breakfast: "Aloo Paratha", lunch: "South Indian Thali", snacks: "Tea, Cake", dinner: "Pasta, Garlic Bread" }
];

const initialNotices = [
    { id: 1, title: "Grand Cultural Night", message: "Join us this Friday at 6 PM in the main hall.", date: "2026-01-22", priority: "normal" },
    { id: 2, title: "Emergency Water Cut", message: "Water supply will be suspended tomorrow 10AM-12PM.", date: "2026-01-23", priority: "urgent" }
];

if (!localStorage.getItem('students')) saveData('students', initialStudents);
if (!localStorage.getItem('rooms')) saveData('rooms', initialRooms);
if (!localStorage.getItem('complaints')) saveData('complaints', initialComplaints);
if (!localStorage.getItem('menu')) saveData('menu', initialMenu);
if (!localStorage.getItem('notices')) saveData('notices', initialNotices);

// ── Auth Helpers ─────────────────────────────────

function getCurrentUser() {
    const rawUser = localStorage.getItem('user');
    const role = (localStorage.getItem('userRole') || '').toLowerCase();

    if (!rawUser || !role) {
        return null;
    }

    try {
        const user = JSON.parse(rawUser);
        user.role = role;
        return user;
    } catch (e) {
        return null;
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUserId');
    localStorage.removeItem('currentUser'); // legacy cleanup
    console.log('[Auth] Logout successful');
    window.location.href = 'login.html';
}

// ── Navigation UI Helper ─────────────────────────

function renderSidebar(activePage, role) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const studentLinks = [
        { name: 'Dashboard', icon: 'bi-grid-1x2-fill', href: 'student-dashboard.html' },
        { name: 'My Profile', icon: 'bi-person-fill', href: 'student-profile.html' },
        { name: 'Room Details', icon: 'bi-door-closed-fill', href: 'student-room.html' },
        { name: 'Fees Status', icon: 'bi-credit-card-fill', href: 'student-fees.html' },
        { name: 'Attendance', icon: 'bi-calendar-check-fill', href: 'student-attendance.html' },
        { name: 'Complaints', icon: 'bi-chat-left-text-fill', href: 'student-complaints.html' },
        { name: 'Hostel Menu', icon: 'bi-egg-fried', href: 'student-menu.html' },
        { name: 'Notice Board', icon: 'bi-megaphone-fill', href: 'student-notices.html' }
    ];

    const adminLinks = [
        { name: 'Dashboard', icon: 'bi-grid-1x2-fill', href: 'admin-dashboard.html' },
        { name: 'Students', icon: 'bi-people-fill', href: 'admin-students.html' },
        { name: 'Rooms', icon: 'bi-door-open-fill', href: 'admin-rooms.html' },
        { name: 'Fees', icon: 'bi-cash-stack', href: 'admin-fees.html' },
        { name: 'Attendance', icon: 'bi-calendar-event', href: 'admin-attendance.html' },
        { name: 'Complaints', icon: 'bi-exclamation-triangle-fill', href: 'admin-complaints.html' },
        { name: 'Menu', icon: 'bi-list-ul', href: 'admin-menu.html' },
        { name: 'Notices', icon: 'bi-info-circle-fill', href: 'admin-notices.html' }
    ];

    const links = role === 'admin' ? adminLinks : studentLinks;

    let html = `
        <a href="#" id="logo" class="sidebar-brand">
            <i class="bi bi-building"></i>
            <span>HostelHub</span>
        </a>
        <nav class="nav flex-column">
    `;

    links.forEach(link => {
        const activeClass = activePage === link.name ? 'active' : '';
        html += `
            <a class="nav-link ${activeClass}" href="${link.href}">
                <i class="bi ${link.icon}"></i>
                <span>${link.name}</span>
            </a>
        `;
    });

    html += `
        </nav>
        <div class="sidebar-logout">
            <button id="logoutBtn" class="btn w-100">
                <i class="bi bi-box-arrow-right"></i>
                <span>Logout</span>
            </button>
        </div>
    `;

    sidebar.innerHTML = html;

    // Logo navigation based on stored role
    const logoEl = document.getElementById('logo');
    if (logoEl) {
        logoEl.addEventListener('click', (event) => {
            event.preventDefault();
            const roleFromStorage = (localStorage.getItem('userRole') || '').toLowerCase();
            if (roleFromStorage === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else if (roleFromStorage === 'student') {
                window.location.href = 'student-dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => logout());
    }
}

function renderTopNav(userName) {
    const mainWrapper = document.querySelector('.main-wrapper');
    if (!mainWrapper) return;

    const navHtml = `
        <header class="top-nav fade-in">
            <div class="d-flex align-items-center gap-3">
                <button class="btn d-lg-none p-0 border-0" onclick="document.querySelector('.sidebar').classList.toggle('show')">
                    <i class="bi bi-list fs-2"></i>
                </button>
                <h4 class="fw-bold mb-0">Welcome Back, ${userName}!</h4>
            </div>
            <div class="user-profile">
                <div class="user-avatar">${userName.charAt(0)}</div>
                <div class="d-none d-md-block">
                    <div class="fw-bold small">${userName}</div>
                    <div class="text-muted" style="font-size: 0.7rem;">Active Now</div>
                </div>
            </div>
        </header>
    `;

    mainWrapper.insertAdjacentHTML('afterbegin', navHtml);
}
