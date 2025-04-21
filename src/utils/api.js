const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  // Helper untuk fetch dengan otorisasi (token)
  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // Simpan access token ke localStorage
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  // Ambil access token dari localStorage
  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Register user baru
  // Parameter: { name, email, password }
  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
  }

  // Login user
  // Parameter: { email, password }
  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;
    return token;
  }

  // Mendapatkan profil user sendiri
  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
  }

  // Mendapatkan semua user
  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;
    return users;
  }

  // Membuat thread baru
  // Parameter: { title, body, category (opsional) }
  async function createThread({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;
    return thread;
  }

  // Mendapatkan semua thread
  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;
    return threads;
  }

  // Mendapatkan detail thread berdasarkan threadId
  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;
    return detailThread;
  }

  // Membuat komentar pada thread tertentu
  // Parameter: { threadId, content }
  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;
    return comment;
  }

  // Fungsi untuk voting pada thread
  async function voteThread({ threadId, voteType }) {
    let endpoint = '';
    if (voteType === 1) {
      endpoint = 'up-vote';
    } else if (voteType === -1) {
      endpoint = 'down-vote';
    } else if (voteType === 0) {
      endpoint = 'neutral-vote';
    } else {
      throw new Error('voteType tidak valid');
    }

    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/${endpoint}`,
      {
        method: 'POST',
      }
    );
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  // Fungsi untuk voting pada komentar
  async function voteComment({ threadId, commentId, voteType }) {
    let endpoint = '';
    if (voteType === 1) {
      endpoint = 'up-vote';
    } else if (voteType === -1) {
      endpoint = 'down-vote';
    } else if (voteType === 0) {
      endpoint = 'neutral-vote';
    } else {
      throw new Error('voteType tidak valid');
    }

    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${endpoint}`,
      {
        method: 'POST',
      }
    );
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  // Mendapatkan leaderboard user
  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;
    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    voteThread,
    voteComment,
    getLeaderboards,
  };
})();

export default api;
