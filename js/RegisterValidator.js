document.addEventListener('DOMContentLoaded', () => {
  new RegisterValidator({
    usernameInput: '.username',
    emailInput: '.email',
    passwordInput: '.password',
    eyeToggle: '.eye-toggle',
    eyeTooltip: '.eye-tooltip',
    submitBtn: '.btn',
    hintText: '.hint-text',
  })
})

class RegisterValidator {
  constructor(config = {}) {
    this.usernameInput = document.querySelector(config.usernameInput)
    this.emailInput = document.querySelector(config.emailInput)
    this.passwordInput = document.querySelector(config.passwordInput)

    this.eyeToggle = document.querySelector(config.eyeToggle)
    this.eyeTooltip = document.querySelector(config.eyeTooltip)

    this.submitBtn = document.querySelector(config.submitBtn)
    this.hintText = document.querySelector(config.hintText)

    this.successColor = '#32D190'
    this.errorColor = '#e74c3c'

    this.emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    this.passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/

    this.allowedDomains = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
      'icloud.com',
      'live.com',
      'aol.com',
      'mail.ru',
      'yandex.ru',
      'rambler.ru',
      'bk.ru',
      'list.ru',
      'inbox.ru',
    ]

    this.init()
  }

  init() {
    if (!this.usernameInput || !this.emailInput || !this.passwordInput) {
      console.warn('RegisterValidator: Required registration fields were not found.')

      return
    }

    this.bindEvents()
    this.updateEyeTooltip(false)
  }

  bindEvents() {
    this.usernameInput.addEventListener('input', () => {
      this.normalizeUsername()
      this.validate()
    })

    this.emailInput.addEventListener('input', () => {
      this.normalizeEmail()
      this.validate()
    })

    this.passwordInput.addEventListener('input', () => {
      this.validate()
    })

    if (this.eyeToggle) {
      this.eyeToggle.addEventListener('click', event => {
        event.preventDefault()
        this.togglePasswordVisibility()
      })
    }

    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', event => {
        event.preventDefault()

        const isValid = this.validate(true)

        if (isValid) {
          this.submitForm()
        }
      })
    }
  }

  normalizeUsername() {
    const value = this.usernameInput.value.trim()

    if (!value) {
      return
    }

    this.usernameInput.value = value.charAt(0).toUpperCase() + value.slice(1)
  }

  normalizeEmail() {
    this.emailInput.value = this.emailInput.value.trim().toLowerCase()
  }

  togglePasswordVisibility() {
    const isPasswordHidden = this.passwordInput.type === 'password'

    this.passwordInput.type = isPasswordHidden ? 'text' : 'password'

    this.eyeToggle.classList.toggle('fa-eye', isPasswordHidden)

    this.eyeToggle.classList.toggle('fa-eye-slash', !isPasswordHidden)

    this.updateEyeTooltip(isPasswordHidden)
  }

  updateEyeTooltip(isPasswordVisible) {
    if (!this.eyeTooltip) {
      return
    }

    const title = isPasswordVisible ? 'Hide password' : 'Show password'

    this.eyeTooltip.dataset.eyeTitle = title
    this.eyeTooltip.setAttribute('aria-label', title)
  }

  validate(showSuccessMessage = false) {
    const username = this.usernameInput.value.trim()
    const email = this.emailInput.value.trim().toLowerCase()
    const password = this.passwordInput.value.trim()

    if (!username && !email && !password) {
      return this.setError('All fields are required')
    }

    if (!username) {
      return this.setError('Username is required')
    }

    if (username.length < 5) {
      return this.setError('Username must be at least 5 characters')
    }

    if (!email) {
      return this.setError('Email is required')
    }

    if (!this.emailPattern.test(email)) {
      return this.setError('Please enter a valid email address')
    }

    const emailDomain = email.split('@')[1]

    if (!this.allowedDomains.includes(emailDomain)) {
      return this.setError('Email provider is not allowed')
    }

    if (!password) {
      return this.setError('Password is required')
    }

    if (!this.passwordPattern.test(password)) {
      console.log(password.length)
      return this.setError(
        'Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).',
      )
    }

    this.updateUI({
      isValid: true,
      message: showSuccessMessage ? 'Looks good ✔' : '',
    })

    return true
  }

  setError(message) {
    this.updateUI({
      isValid: false,
      message,
    })

    return false
  }

  updateUI({ isValid, message = '' }) {
    const color = isValid ? this.successColor : this.errorColor

    const inputs = [this.usernameInput, this.emailInput, this.passwordInput]

    inputs.forEach(input => {
      input.style.borderColor = color

      input.classList.toggle('error', !isValid)

      input.classList.toggle('success', isValid)
    })

    if (this.hintText) {
      this.hintText.textContent = message
      this.hintText.style.color = color
    }
  }

  submitForm() {
    const form = this.submitBtn?.closest('form')

    if (!form) {
      console.warn('RegisterValidator: Registration form was not found.')

      return
    }

    form.submit()
  }
}
