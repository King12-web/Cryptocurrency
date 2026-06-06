document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================
    const openBtn = document.getElementById("openSidebar");
    const closeBtn = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const logoutBtn = document.getElementById("logoutBtn");

    // =========================
    // FUNCTIONS
    // =========================
    function openSidebar() {
        if (sidebar) sidebar.classList.add("show");
        if (overlay) overlay.classList.add("show");
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove("show");
        if (overlay) overlay.classList.remove("show");
    }

    // =========================
    // SIDEBAR EVENTS
    // =========================
    if (openBtn) {
        openBtn.addEventListener("click", openSidebar);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // =========================
    // LOGOUT
    // =========================
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {

            // Clear user session
            localStorage.removeItem("currentUser");

            // Redirect to login page
            window.location.href = "signup.html";
        });
    }

});