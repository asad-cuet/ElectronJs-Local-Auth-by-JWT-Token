document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('jwt'); // Remove the JWT from localStorage
    window.location.href = 'login.html'; // Redirect to login page
});

async function loadUserInfo() {
    const token = localStorage.getItem('jwt');
    if (token) {
        try {
            // Use authAPI to get the user information
            const user = await window.authAPI.user(token);

            if (user) {
                document.getElementById('user-email').textContent = `Email: ${user.email}`;
                document.getElementById('user-id').textContent = `User ID: ${user.id}`;
            } else {
                window.location.href = 'login.html'; // Redirect if user info is not found
            }
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
