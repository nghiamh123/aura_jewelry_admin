const REACT_API_URL = 'http://localhost:8386/api';

const clientQuery = {
  get: async (endpoint, options = {}) => {
    return await request(endpoint, { method: 'GET', ...options });
  },

  post: async (endpoint, data, options = {}) => {
    return await request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  put: async (endpoint, data, options = {}) => {
    return await request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  delete: async (endpoint, options = {}) => {
    return await request(endpoint, { method: 'DELETE', ...options });
  },
};

async function request(endpoint, options) {
  try {
    const response = await fetch(`${REACT_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in API request:', error);
    throw error;
  }
}

export default clientQuery;
