(function () {
  "use strict";

  // Enable Bootstrap form validation
  var forms = document.querySelectorAll("form");
  Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
          "submit",
          function (event) {
              if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
              }
              form.classList.add("was-validated");
          },
          false
      );
  });

  // Password validation
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const passwordStrength = document.getElementById('passwordStrength');
  const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');

  // Regex pattern for strong password
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  function validatePassword() {
      // Check password strength
      if (strongPasswordRegex.test(password.value)) {
          passwordStrength.textContent = 'Mật khẩu mạnh';
          passwordStrength.style.color = 'green';
      } else {
          passwordStrength.textContent = 'Mật khẩu yếu';
          passwordStrength.style.color = 'red';
      }

      // Check if passwords match
      if (password.value === confirmPassword.value) {
          confirmPasswordFeedback.textContent = 'Mật khẩu khớp';
          confirmPasswordFeedback.style.color = 'green';
      } else {
          confirmPasswordFeedback.textContent = 'Mật khẩu không khớp';
          confirmPasswordFeedback.style.color = 'red';
      }
  }

  // Attach event listeners for real-time validation
  password.addEventListener('input', validatePassword);
  confirmPassword.addEventListener('input', validatePassword);

})();
