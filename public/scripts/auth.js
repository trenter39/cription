document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerOutput = document.getElementById('registerOutput');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('registerUsernameInput').value.trim();
        const email = document.getElementById('registerEmailInput').value.trim();
        const verifyEmail = document.getElementById('registerVerifyEmailInput').value.trim();
        const password = document.getElementById('registerPasswordInput').value.trim();
        const verifyPassword = document.getElementById('registerVerifyPasswordInput').value.trim();

        if (email !== verifyEmail) {
            return showMessage(registerOutput, "Emails don't match!", true);
        }
        if (password !== verifyPassword) {
            return showMessage(registerOutput, "Passwords don't match!", true);
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                const msg = data.errors?.[0]?.msg || data.message || 'Registration failed!';
                return showMessage(registerOutput, msg, true);
            }

            showMessage(registerOutput, 'Registration successful!', false);
            registerForm.reset();
        } catch (err) {
            console.error(err);
            showMessage(registerOutput, 'Server error! Try again later.', true);
        }
    });

    const loginForm = document.getElementById('loginForm');
    const loginOutput = document.getElementById('loginOutput');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmailInput').value.trim();
        const password = document.getElementById('loginPasswordInput').value.trim();

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                const msg = data.errors?.[0]?.msg || data.message || 'Login failed!';
                return showMessage(loginOutput, msg, true);
            }

            // showMessage(loginOutput, 'Login successful!', false); // debug functionality
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = '/account';
        } catch (err) {
            console.error(err);
            showMessage(loginOutput, 'Server error! Try again later.', true);
        }
    });

    function showMessage(el, text, isError = false) {
        el.textContent = text;
        el.classList.remove('hidden');
        el.style.color = isError ? 'darkred' : 'darkgreen';
    }
});