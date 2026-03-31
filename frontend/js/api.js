// Simple API helper functions for calling the HostelHub backend.
// Resolve API base URL from a global runtime variable, build-time env var, or default.
const API_BASE_URL =
  window.API_BASE_URL ||
  (typeof process !== 'undefined' && process.env && (process.env.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL)) ||
  'https://hostelhubb-wfhb.onrender.com';

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  console.log('[API] Request', { url, options });
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const mergedOptions = {
    credentials: 'include',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, mergedOptions);
  let data = null;

  try {
    data = await response.json();
  } catch (e) {
    // Ignore JSON parse errors for empty responses.
  }

  console.log('[API] Response', { url, status: response.status, data });

  if (!response.ok) {
    const message = (data && data.message) || 'Request failed';
    throw new Error(message);
  }

  return data;
}

// Auth endpoints
async function apiLogin(email, password, role) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
}

async function apiRegister(payload) {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Hostel endpoints
async function apiGetHostels() {
  return apiRequest('/api/hostels', {
    method: 'GET',
  });
}

// Booking endpoints
async function apiCreateBooking(token, payload) {
  return apiRequest('/api/bookings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

async function apiGetBookings(token, userId) {
  return apiRequest(`/api/bookings/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

