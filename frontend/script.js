// ================= Toast =================
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if(!toast) return;
    const div = document.createElement("div");
    div.className = `toast ${type}`;
    div.innerText = message;
    toast.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// ================= Get logged-in user =================
let userId = localStorage.getItem("userId");

// ================= Logout =================
function logout(){
    localStorage.removeItem("userId");
    showToast("Logged out successfully", "info");
    setTimeout(()=> window.location.href = "login.html", 1000);
}

// ================= Redirect if not logged in =================
if(!userId){
    showToast("Please login first", "error");
    setTimeout(()=> window.location.href = "login.html", 1000);
}

// ================= Add Expense =================
function addExpense(){
    const title = document.getElementById("title").value.trim();
    const amount = parseFloat(document.getElementById("amount").value.trim());
    const category = document.getElementById("category").value.trim();
    const date = document.getElementById("date").value.trim();

    if(!title || !amount || !category || !date){
        showToast("All fields are required", "error");
        return;
    }

    fetch("http://localhost:8050/api/expenses/add", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({title, amount, category, date, user:{id: parseInt(userId)}})
    })
    .then(res => {
        if(!res.ok) throw new Error("Failed to add expense");
        return res.json();
    })
    .then(data => {
        showToast("Expense added!", "success");
        document.getElementById("title").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("category").value = "";
        document.getElementById("date").value = "";
        loadExpenses();
    })
    .catch(err => showToast(err.message, "error"));
}

// ================= Load Expenses =================
function loadExpenses(){
    if(!userId) return; // safety check
    fetch(`http://localhost:8050/api/expenses/${userId}`)
    .then(res => {
        if(!res.ok) throw new Error("Failed to load expenses");
        return res.json();
    })
    .then(data => {
        const table = document.getElementById("expenseTable");
        table.innerHTML = `<tr>
            <th>Title</th><th>Amount</th><th>Category</th><th>Date</th><th>Actions</th>
        </tr>`;

        data.forEach(exp => {
            let row = table.insertRow();
            const formattedAmt = `₹ ${exp.amount.toFixed(2)}`
            row.insertCell(0).innerText = exp.title;
            row.insertCell(1).innerText = formattedAmt;
            row.insertCell(2).innerText = exp.category;
            row.insertCell(3).innerText = exp.date;
            row.insertCell(4).innerHTML = `<button onclick="deleteExpense(${exp.id})">Delete</button>`;
        });
    })
    .catch(err => showToast(err.message, "error"));
}

// ================= Delete Expense =================
function deleteExpense(id){
    fetch(`http://localhost:8050/api/expenses/delete/${id}`, {method:"DELETE"})
    .then(res => {
        if(!res.ok) throw new Error("Failed to delete expense");
        showToast("Expense deleted", "success");
        loadExpenses();
    })
    .catch(err => showToast(err.message, "error"));
}

// ================= On page load =================
window.onload = function(){
    userId = localStorage.getItem("userId");
    if(!userId){
        showToast("Please login first", "error");
        setTimeout(()=> window.location.href="login.html", 1000);
    } else {
        loadExpenses();
    }
};
