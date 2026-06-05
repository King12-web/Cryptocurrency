const users = JSON.parse(localStorage.getItem("moonUsers")) || [];

const tbody = document.querySelector("#usersTable tbody");

users.forEach(user => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
    `;

    tbody.appendChild(row);

});