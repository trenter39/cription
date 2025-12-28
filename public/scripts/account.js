document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch main account data
        const res = await fetch('/api/account', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Handle invalid token/session
        if (!res.ok) {
            localStorage.removeItem('token');
            return window.location.href = '/login';
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

        // Load Progress Data
        const levelData = await getProgress(token);

        const userDisplay = document.getElementById('user-display');
        if (userDisplay) userDisplay.textContent = data.username;

        // Calculate and Display Levels
        await setLevelCount(levelData);

        const totalDisplay = document.getElementById('total-stat-display');
        if (totalDisplay) {
            totalDisplay.textContent = `${data.guessed_words}/${total_count}`;
        }

        signOutText.addEventListener('click', function () {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });
    } catch (err) {
        console.error('Account fetch failed:', err);
        window.location.href = '/login';
    }
});

// Global counters
let total_count = 0;
let totalGuessed_count = 0;

async function getProgress(token) {
    try {
        const [res1, res2] = await Promise.all([
            fetch('/api/progress', {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch('/api/progress/guess_attempts', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);
        if (!res1.ok || !res2.ok) {
            console.error('Failed to fetch progress.');
            return [];
        }
        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
        return [...data1, ...data2];
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function setLevelCount(data) {
    total_count = 0;

    data.forEach(levelObj => {
        const level = levelObj.level;
        const guessed = levelObj.guessed_count;
        const total = levelObj.total_count;
        if (isNaN(total)) return;
        total_count += Number(total);
        const countElement = document.getElementById(`stat-${level.toLowerCase()}`);
        if (countElement) {
            countElement.textContent = `${guessed}/${total}`;
        }
    });
}