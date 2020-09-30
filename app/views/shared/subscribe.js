function postEmail(payload) {
  return window.fetch('https://vuejs-course.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const $form = document.getElementById('subscribe')
  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const $email = document.getElementById('email')
    const $button = document.getElementById('email-submit')
    $button.setAttribute('disabled', 'disabled')
    await postEmail({ email: $email.value, referrer: 'lachlan-miller.me' })
    $button.removeAttribute('disabled')
    $button.textContent = 'Thanks!'
  })
})