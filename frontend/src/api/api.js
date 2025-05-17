const API_BASE = 'http://localhost:3000';

export const fetchWithAuth = (url, options={}) => {
    return fetch(`${API_BASE}${url}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
    });
}