document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';

    try {
        const res = await fetch('/api/account', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();

        if (!res.ok) {
            localStorage.removeItem('token');
            return window.location.href = '/login';
        }

        document.getElementById('username').textContent = data.username;
        document.getElementById('email').textContent = data.email;
        document.getElementById('words-count').textContent = data.guessed_words_count;
    } catch (err) {
        console.error('Account fetch failed:', err);
        window.location.href = '/login';
    }
});