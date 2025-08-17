// ================= Toast Function =================
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if(!toast) return; 
    const div = document.createElement("div");
    div.className = `toast ${type}`;
    div.innerText = message;
    toast.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// ================= User Authentication =================
let userId = localStorage.getItem("userId"); 

// Redirect if already logged in
if(userId) {
    showToast("Already logged in!", "info");
    setTimeout(() => window.location.href = "expenses.html", 1000);
}

// ================= Register =================
function register() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!username || !email || !password){
        showToast("All fields are required", "error");
        return;
    }

    fetch("http://localhost:8050/api/users/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, email, password})
    })
    .then(async res => {
        if(res.status === 409){ 
            const msg = await res.text();
            throw new Error(msg || "Email already exists");
        }
        if(!res.ok) throw new Error("Registration failed");
        return res.json();
    })
    .then(data => {
        showToast("Registered successfully! Please login", "success");
        setTimeout(() => window.location.href = "login.html", 1500);
    })
    .catch(err => showToast(err.message, "error"));
}
// ================= Toast Function =================
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if(!toast) return; // toast container must exist
    const div = document.createElement("div");
    div.className = `toast ${type}`;
    div.innerText = message;
    toast.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// ================= User Authentication =================

// Redirect if already logged in
if(userId) {
    showToast("Already logged in!", "info");
    setTimeout(() => window.location.href = "expenses.html", 1000);
}

// ================= Login =================
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if(!email || !password){
        showToast("All fields are required", "error");
        return;
    }

    fetch("http://localhost:8050/api/users/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email, password})
    })
    .then(async res => {
        if(res.status === 401){
            const msg = await res.text();
            throw new Error(msg || "Invalid credentials");
        }
        if(!res.ok) throw new Error("Login failed");
        return res.json();
    })
    .then(data => {
        if(data && data.id){
            localStorage.setItem("userId", data.id);
            showToast("Logged in successfully!", "success");
            setTimeout(() => window.location.href = "expenses.html", 1000);
        } else throw new Error("Login failed");
    })
    .catch(err => showToast(err.message, "error"));
}
