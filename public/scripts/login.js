document.addEventListener('DOMContentLoaded', () => {
    // UI Animation
    const authContainer = document.getElementById("auth-container");

    setTimeout(() => {
        requestAnimationFrame(() => {
            if (authContainer) authContainer.classList.add('visible');
        });
    }, 300);

    // REGISTER LOGIC
    const formRegister = document.getElementById('form-register');
    const feedbackRegister = document.getElementById('feedback-register');

    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Capture inputs
        const username = document.getElementById('input-register-username').value.trim();
        const email = document.getElementById('input-register-email').value.trim();
        const verifyEmail = document.getElementById('input-register-verify-email').value.trim();
        const password = document.getElementById('input-register-password').value.trim();
        const verifyPassword = document.getElementById('input-register-verify-password').value.trim();

        // Client-side validation
        if (email !== verifyEmail) {
            return updateFeedback(feedbackRegister, "Emails don't match!", true);
        }
        if (password !== verifyPassword) {
            return updateFeedback(feedbackRegister, "Passwords don't match!", true);
        }

        // API request
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            // Handle Response
            if (!res.ok) {
                // Extract error message from server response
                const msg = data.errors?.[0]?.msg || data.message || 'Registration failed!';
                return updateFeedback(feedbackRegister, msg, true);
            }

            // Success
            updateFeedback(feedbackRegister, 'Registration successful!', false);
            formRegister.reset();
        } catch (err) {
            console.error("Registration error:", err);
            updateFeedback(feedbackRegister, 'Server error! Try again later.', true);
        }
    });

    const formLogin = document.getElementById('form-login');
    const feedbackLogin = document.getElementById('feedback-login');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Capture inputs
        const email = document.getElementById('input-login-email').value.trim();
        const password = document.getElementById('input-login-password').value.trim();

        // API request
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            // Handle error
            if (!res.ok) {
                const msg = data.errors?.[0]?.msg || data.message || 'Login failed!';
                return updateFeedback(feedbackLogin, msg, true);
            }

            // Handle success - redirect
            window.location.href = '/account';

        } catch (err) {
            console.error("Login error:", err);
            updateFeedback(feedbackLogin, 'Server error! Try again later.', true);
        }
    });

    // Utility to update the status text element with a message and color
    function updateFeedback(element, text, isError = false) {
        element.textContent = text;
        element.classList.remove('hidden');
        element.style.color = isError ? 'darkred' : 'darkgreen';
    }
});