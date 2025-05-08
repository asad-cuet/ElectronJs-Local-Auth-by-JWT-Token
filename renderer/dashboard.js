document.getElementById('logout-btn').addEventListener('click', () => {
    window.authAPI.logout(); 
    window.location.href = 'login.html'; // Redirect to login page
});

async function loadUserInfo() {
    const user = await window.authAPI.user(); 
    if (user) {
        try {
            document.getElementById('user-email').textContent = `Email: ${user.email}`;
            document.getElementById('user-id').textContent = `User ID: ${user.id}`;
        } catch (error) {
            console.error('Error fetching user info:', error);
            window.location.href = 'login.html'; // Redirect on error
        }
    } else {
        window.location.href = 'login.html'; // Redirect to login if no token
    }
}

// Call the async function when the page is loaded
window.addEventListener('DOMContentLoaded', loadUserInfo);
