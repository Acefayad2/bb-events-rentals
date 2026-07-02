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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const eventDate = form.eventDate.value;
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Event Inquiry from ${name}`);
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    eventDate ? `Event Date: ${eventDate}` : null,
    '',
    message
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join('\n'));

  window.location.href = `mailto:bb.rental.and.events@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = 'Opening your email app to send this message…';
});
