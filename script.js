document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = form.querySelector('button[type="submit"]');

const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzgDevZVZxGlB_Dz76iQyMXi9CxsO1uS93_YzBmttoxlC1CV7kLPsXYFQ1EYck58081xA/exec';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const eventDate = form.eventDate.value;
  const message = form.message.value.trim();

  submitBtn.disabled = true;
  formNote.textContent = 'Sending…';

  try {
    await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ name, email, eventDate, message })
    });
    formNote.textContent = "Thanks! We've received your message and will be in touch soon.";
    form.reset();
  } catch (err) {
    formNote.textContent = "Something went wrong sending that — please call or email us directly.";
  } finally {
    submitBtn.disabled = false;
  }
});
