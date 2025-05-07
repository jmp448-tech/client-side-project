// Prompt for API key if not in session storage
let apiKey = sessionStorage.getItem('tm_api_key');

if (!apiKey) {
  apiKey = prompt("Enter your Ticketmaster API key:");
  if (apiKey) {
    sessionStorage.setItem('tm_api_key', apiKey);
  } else {
    alert("API key is required to continue.");
  }
}

const form = document.getElementById('searchForm');
const results = document.getElementById('results');
const resetBtn = document.getElementById('resetBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const keyword = document.getElementById('keywordInput').value.trim();
  const city = document.getElementById('cityInput').value.trim();

  if (!keyword) {
    alert("Please enter a search keyword.");
    return;
  }

  const query = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodeURIComponent(keyword)}${city ? `&city=${encodeURIComponent(city)}` : ''}`;

  try {
    const res = await fetch(query);
    const data = await res.json();
    displayEvents(data);
  } catch (err) {
    console.error(err);
    alert("An error occurred while fetching events.");
  }
});

function displayEvents(data) {
  results.innerHTML = '';

  if (!data._embedded || !data._embedded.events) {
    results.innerHTML = '<p>No events found.</p>';
    return;
  }

  data._embedded.events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${event.name}</h3>
      <img src="${event.images[0].url}" alt="${event.name}" />
      <p><strong>Date:</strong> ${event.dates.start.localDate}</p>
      <p><strong>Venue:</strong> ${event._embedded.venues[0].name}</p>
      <a href="${event.url}" target="_blank">View Tickets</a>
    `;
    results.appendChild(card);
  });
}

resetBtn.addEventListener('click', () => {
  sessionStorage.removeItem('tm_api_key');
  location.reload();
});
