
const validEmail = "user@example.com";
const validPassword = "netflix123";

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  if (email === validEmail && password === validPassword) {
    errorMsg.textContent = "";
    window.location.href = "netflix.html";
  } else {
    errorMsg.textContent = "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
});

function showRecaptchaInfo(e) {
  e.preventDefault();
  document.getElementById('recaptcha-info').style.display = 'block';
  e.target.style.display = 'none';
}