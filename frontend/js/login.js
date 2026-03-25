document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value; // "student" or "admin"

    if (!email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      console.log('[Login] Submitting login request', { email, role });

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        console.error('[Login] Login failed', { status: response.status, data });
        throw new Error(data.message || 'Invalid email or password');
      }

      console.log('[Login] Login successful', data);

      const normalizedRole = ((data.user && data.user.role) || role || '').toLowerCase();

      if (data.token) {
        // Store token under multiple keys for existing code compatibility.
        localStorage.setItem('token', data.token);
        localStorage.setItem('authToken', data.token);
      }
      if (data.user) {
        const storedUser = { ...data.user, role: normalizedRole };
        localStorage.setItem('user', JSON.stringify(storedUser));
        localStorage.setItem('authUser', JSON.stringify(storedUser));
        localStorage.setItem('userRole', normalizedRole);
        if (data.user.id) {
          localStorage.setItem('authUserId', data.user.id);
        }
      }

      console.log('Stored user:', localStorage.getItem('user'));
      console.log('Stored role:', localStorage.getItem('userRole'));

      if (normalizedRole === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    } catch (err) {
      // Show an invalid credentials popup if available, otherwise fall back to alert.
      const modalElement = document.getElementById('invalidCredentialsModal');
      if (modalElement && window.bootstrap && window.bootstrap.Modal) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
      } else {
        alert(err.message || 'Login failed. Please try again.');
      }
    }
  });
});

