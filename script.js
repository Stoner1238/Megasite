// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('show');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run on page load

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});
// Fetch and display people
async function loadPeople(count = 6) {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();
    const grid = document.getElementById('people-grid');
    grid.innerHTML = ''; // Clear

    data.results.forEach(person => {
      const card = document.createElement('div');
      card.className = 'person-card';
      card.innerHTML = `
        <img src="${person.picture.large}" alt="${person.name.first}">
        <h3>${person.name.first} ${person.name.last}</h3>
        <p>${person.location.country}</p>
        <p>${person.email}</p>
      `;
      grid.appendChild(card);

      // Animate reveal
      setTimeout(() => card.classList.add('show'), 100);
    });
  } catch (err) {
    console.error('Failed to load people', err);
  }
}

loadPeople();
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('✅ Message sent! We’ll get back to you soon.');
  e.target.reset();
});
