document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  if (!form) return;

  const getApiBaseUrl = () => {
    if (window.location.protocol === 'file:' || window.location.origin === 'null') {
      return 'http://localhost:5000';
    }
    return window.location.origin;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const role = document.getElementById('role').value; // "student" or "admin"

    if (!name || !email || !password || !confirmPassword || !role || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      const payload = { name, email, phone, password, role };
      console.log('[Signup] Submitting signup request', payload);

      const response = await fetch(`${getApiBaseUrl()}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        console.error('[Signup] Signup failed', { status: response.status, data });
        throw new Error(data.message || 'Signup failed');
      }

      console.log('[Signup] Signup successful', data);

      // On success, redirect to login page
      window.location.href = 'login.html';
    } catch (err) {
      alert(err.message || 'Signup failed. Please try again.');
    }
  });
});

