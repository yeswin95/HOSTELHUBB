// Simple API helper functions for calling the HostelHub backend.
// Update API_BASE_URL if your backend runs on a different host/port.

const API_BASE_URL = 'http://localhost:5000';

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  console.log('[API] Request', { url, options });
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const mergedOptions = {
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

async function apiUpdateProfile(token, payload) {
  return apiRequest('/api/users/updateProfile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

async function apiAdminCreateRoom(token, payload) {
  return apiRequest('/api/admin/rooms', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}

async function apiAdminGetRooms(token) {
  return apiRequest('/api/admin/rooms', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function apiAdminAssignRoom(token, payload) {
  return apiRequest('/api/admin/assign-room', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}

async function apiStudentRoom(token, studentId) {
  return apiRequest(`/api/student/room/${studentId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function apiStudentAttendance(token, studentId) {
  return apiRequest(`/api/student/attendance/${studentId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function apiAdminGetStudents(token) {
  return apiRequest('/api/admin/students', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}

