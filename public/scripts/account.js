document.addEventListener('DOMContentLoaded', async () => {
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
        let accountArea = document.getElementById('account-area');
        let signOutLabel = document.getElementById('signOutLabel');
        setTimeout(() => {
            requestAnimationFrame(() => {
                accountArea.classList.add('visible');
                signOutLabel.classList.add('visible');
            });
        }, 300);
        const levelData = await getProgress(token);
        document.getElementById('username').textContent = data.username;
        setLevelCount(levelData);
        document.getElementById('words-count').textContent = `${data.guessed_words_count}/${total_count}`;
        document.getElementById('signOutLabel').addEventListener('click', function () {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });
    } catch (err) {
        console.error('Account fetch failed:', err);
        window.location.href = '/login';
    }
});

let total_count = 0;
let totalGuessed_count = 0;

async function getProgress(token) {
    const res = await fetch('/api/progress', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) {
        console.error('Failed to fetch progress.');
        return;
    }
    const data = await res.json();
    return data;
}

function setLevelCount(data) {
    data.forEach(levelObj => {
        const level = levelObj.level;
        const guessed = levelObj.guessed_count;
        const total = levelObj.total_count;
        total_count += Number(total);
        const countElement = document.getElementById(`${level}WordsCount`);
        if (countElement) {
            countElement.textContent = `${guessed}/${total}`;
        }
    });
}