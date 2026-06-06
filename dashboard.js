// Get logged-in user
const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
);

// Protect dashboard
if (!currentUser) {
    window.location.href = 'signin.html';
}

// Display user information
const userName = document.getElementById('userName');
const fullName = document.getElementById('fullName');
const userEmail = document.getElementById('userEmail');
const userBalance = document.getElementById('userBalance');

if (userName) {
    userName.textContent = currentUser.firstName;
}

if (fullName) {
    fullName.textContent =
        `${currentUser.firstName} ${currentUser.lastName}`;
}

if (userEmail) {
    userEmail.textContent = currentUser.email;
}

// Default balance for new users
if (userBalance) {
    userBalance.textContent = '$0.00';
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {

        localStorage.removeItem('currentUser');

        window.location.href = 'signin.html';
    });
}
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
);

if (!currentUser) {
    window.location.href = 'signin.html';
}

document.getElementById('userName').textContent =
    currentUser.firstName + ' ' + currentUser.lastName;

document.getElementById('userEmail').textContent =
    currentUser.email;

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', (e) => {

    e.preventDefault();

    localStorage.removeItem('currentUser');

    window.location.href = 'signin.html';
});