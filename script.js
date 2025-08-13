// ====================
// Mobile menu toggle
// ====================
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// ====================
// Scroll reveal animation
// ====================
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

// ====================
// Theme toggle
// ====================
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// ====================
// Fetch and display people
// ====================
async function loadPeople(count = 6) {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();
    const grid = document.getElementById('people-grid');
    grid.innerHTML = ''; // Clear previous

    data.results.forEach(person => {
      const card = document.createElement('div');
      card.className = 'card reveal';
      card.innerHTML = `
        <img src="${person.picture.large}" alt="${person.name.first}" style="width:100%;border-radius:12px;margin-bottom:.5rem;">
        <h3>${person.name.first} ${person.name.last}</h3>
        <p>${person.location.country}</p>
        <p>${person.email}</p>
      `;
      grid.appendChild(card);
    });

    revealOnScroll();
  } catch (err) {
    console.error('Failed to load people', err);
  }
}
loadPeople();

// ====================
// Fetch and display news
// ====================
const NEWS_API_KEY = "ec5a8ac55b6949018544f0d710aef439";

async function loadNews() {
  try {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`);
    const data = await res.json();
    const container = document.getElementById('news-grid');
    container.innerHTML = '';

    if (data.articles) {
      data.articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card reveal';
        card.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.source.name}</p>
          <a href="${article.url}" target="_blank" class="btn primary">Read More</a>
        `;
        container.appendChild(card);
      });
    }

    revealOnScroll();
  } catch (err) {
    console.error('Failed to load news', err);
  }
}
loadNews();

// ====================
// Contact form
// ====================
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('✅ Message sent! We’ll get back to you soon.');
  e.target.reset();
});
