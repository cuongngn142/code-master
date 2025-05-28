const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
if (profileBtn && profileDropdown) {
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("active");
  });
}

const registerForm = document.getElementById('register');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // ...existing code xử lý đăng ký...
  });
}