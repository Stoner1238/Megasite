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
const revealOnScroll = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('show');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ====================
// Theme toggle
// ====================
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// ====================
// People search
// ====================
document.getElementById('people-search').addEventListener('input', e => {
  loadPeople(e.target.value);
});

async function loadPeople(search = "") {
  try {
    const res = await fetch(`http://localhost:5000/api/people?search=${encodeURIComponent(search)}`);
    const people = await res.json();
    const grid = document.getElementById('people-grid');
    grid.innerHTML = '';

    people.forEach(person => {
      const card = document.createElement('div');
      card.className = 'person-card reveal';
      card.innerHTML = `
        <img src="${person.picture.large}" alt="${person.name.first}">
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
// News search
// ====================
document.getElementById('news-search').addEventListener('input', e => {
  loadNews(e.target.value);
});

async function loadNews(search = "") {
  try {
    const res = await fetch(`http://localhost:5000/api/news?search=${encodeURIComponent(search)}`);
    const news = await res.json();
    const container = document.getElementById('news-grid');
    container.innerHTML = '';

    news.forEach(article => {
      const card = document.createElement('div');
      card.className = 'card reveal';
      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.source.name}</p>
        <a href="${article.url}" target="_blank" class="btn primary">Read More</a>
      `;
      container.appendChild(card);
    });

    revealOnScroll();
  } catch (err) {
    console.error('Failed to load news', err);
  }
}
loadNews();

// ====================
// Events filter
// ====================
document.getElementById('events-filter').addEventListener('change', e => {
  loadEvents(e.target.value);
});

async function loadEvents(date = "") {
  try {
    const res = await fetch(`http://localhost:5000/api/events?date=${encodeURIComponent(date)}`);
    const events = await res.json();
    const container = document.getElementById('events-grid');
    container.innerHTML = '';

    events.forEach(event => {
      const item = document.createElement('div');
      item.className = 'card reveal';
      item.innerHTML = `
        <h3>${event.name}</h3>
        <p>${event.date}</p>
      `;
      container.appendChild(item);
    });

    revealOnScroll();
  } catch (err) {
    console.error('Failed to load events', err);
  }
}
loadEvents();

// ====================
// Contact form handler
// ====================
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('✅ Message sent! We’ll get back to you soon.');
  e.target.reset();
});
