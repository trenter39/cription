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
        await setLevelCount(levelData);
        document.getElementById('guessed-words').textContent = `${data.guessed_words}/${total_count}`;
        // document.getElementById('failed-attempts').textContent = `${data.failed_attempts}`;
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
        return;
    }
    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
    return [
        ...data1, ...data2
    ];
}

async function setLevelCount(data) {
    data.forEach(levelObj => {
        const level = levelObj.level;
        const guessed = levelObj.guessed_count;
        const total = levelObj.total_count;
        if (isNaN(total)) return;
        total_count += Number(total);
        const countElement = document.getElementById(`${level}WordsCount`);
        if (countElement) {
            countElement.textContent = `${guessed}/${total}`;
        }
    });
}