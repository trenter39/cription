document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch main account data
        const res = await fetch('/api/account', {
            credentials: 'include'
        });

        // Handle invalid token
        if (res.status === 401) {
            return window.location.href = '/login';
        }

        if (!res.ok) {
            throw new Error('Failed to load account!');
        }

        const data = await res.json();

        // Fade in animation
        let accountContainer = document.getElementById('account-container');
        let signOutText = document.getElementById('sign-out-text');

        setTimeout(() => {
            requestAnimationFrame(() => {
                accountContainer.classList.add('visible');
                signOutText.classList.add('visible');
            });
        }, 300);

        // Display username
        const userDisplay = document.getElementById('user-display');
        if (userDisplay) userDisplay.textContent = data.username;

        // Load progress data
        const levelData = await getProgress();

        await setLevelCount(levelData);

        const totalDisplay = document.getElementById('total-stat-display');
        if (totalDisplay) {
            totalDisplay.textContent = `${totalGuessed_count}/${total_count}`;
        }

        signOutText.addEventListener('click', async () => {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
            window.location.href = '/login';
        });
    } catch (err) {
        console.error('Account load error:', err);
        window.location.href = '/login';
    }
});

// Global counters
let total_count = 0;
let totalGuessed_count = 0;

async function getProgress() {
    try {
        const res = await fetch('/api/progress', {
            credentials: 'include'
        });

        if (res.status === 401) {
            window.location.href = '/login';
            return [];
        }

        if (!res.ok) {
            console.error('Failed to fetch progress.');
            return [];
        }

        const data = await res.json();

        return data;
    } catch (err) {
        console.error('Progress fetch error:', err);
        return [];
    }
}

async function setLevelCount(data) {
    total_count = 0;
    totalGuessed_count = 0;

    data.forEach(levelObj => {
        const level = levelObj.level;
        const guessed = Number(levelObj.guessed_count || 0);
        const total = Number(levelObj.total_count || 0);

        if (isNaN(total)) return;

        total_count += Number(total);
        totalGuessed_count += guessed;

        const countElement = document.getElementById(`stat-${level.toLowerCase()}`);
        if (countElement) {
            countElement.textContent = `${guessed}/${total}`;
        }
    });
}