const API_URL = "https://backbreak.onrender.com"; 


async function getTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(task => {
        list.innerHTML += `
            <li>
                ${task.title}
                <button class="del-btn" onclick="deleteTask('${task._id}')">Eliminar</button>
            </li>
        `;
    });
}

async function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });
    input.value = '';
    getTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/id/${id}`, { method: 'DELETE' });
    getTasks();
}

getTasks();