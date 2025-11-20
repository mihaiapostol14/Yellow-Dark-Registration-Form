const ButtonEye = document.querySelector('.eye');
const PasswordInput = document.querySelector('.password');
const dataEyeTitle = document.querySelector('[data-eye-title]');



ButtonEye.addEventListener('click', () => {
  if (PasswordInput.type === 'password') {
    PasswordInput.type = 'text'
    ButtonEye.classList.replace('fa-eye-slash', 'fa-eye')
    dataEyeTitle.dataset.eyeTitle = 'hide password'
    // console.log(ButtonEye)
  } else {
    PasswordInput.type = 'password'
    ButtonEye.classList.replace('fa-eye', 'fa-eye-slash')
    dataEyeTitle.dataset.eyeTitle = 'show password'
    // console.log(ButtonEye)
  }
})
