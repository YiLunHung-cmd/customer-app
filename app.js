const SUPABASE_URL = 'https://cvwgsnxpbtzzzyyjkkvf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2d2dzbnhwYnR6enp5eWpra3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTg3MDEsImV4cCI6MjA2NTk3NDcwMX0.V1VpE8hVM-7_3QU5olOnJyCdAjyYq-qBZBT96a17T0A'; // ← 請用你完整的 Key

// ✅ 正確初始化
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('customerForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const table = document.getElementById('customerTableBody');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await db.from('customers').insert([
    {
      name: name.value,
      email: email.value,
      phone: phone.value,
    },
  ]);
  form.reset();
  loadCustomers();
});

async function loadCustomers() {
  const { data, error } = await db.from('customers').select('*');
  if (error) {
    console.error('讀取資料錯誤：', error.message);
    return;
  }

  table.innerHTML = '';
  data.forEach((c) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td><button onclick="deleteCustomer('${c.id}')">刪除</button></td>
    `;
    table.appendChild(row);
  });
}

async function deleteCustomer(id) {
  await db.from('customers').delete().eq('id', id);
  loadCustomers();
}

loadCustomers();
