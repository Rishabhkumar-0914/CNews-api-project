const apiKey = '15701cfcc6a94d42a2cd2c4986e42f65';
const newsContainer = document.getElementById('news-container');
const placeInput = document.getElementById('place-input');
const searchBtn = document.getElementById('search-btn');

// Mapping of countries to their flag image URLs
const countryFlags = {
    'India': 'https://flagcdn.com/w320/in.png',
    'USA': 'https://flagcdn.com/w320/us.png',
    'UK': 'https://flagcdn.com/w320/gb.png',
    'Germany': 'https://flagcdn.com/w320/de.png',
    'France': 'https://flagcdn.com/w320/fr.png',
    'Japan': 'https://flagcdn.com/w320/jp.png',
    'China': 'https://flagcdn.com/w320/cn.png',
    // Add more countries as needed
};

async function fetchNews(place) {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${place}&sortBy=publishedAt&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.status === 'ok' && data.articles.length > 0) {
            displayNews(data.articles, place);
        } else {
            newsContainer.innerHTML = `<p>No news found for "${place}".</p>`;
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error fetching news. Check console for details.</p>';
    }
}
function displayNews(articles, place) {
    const flagURL = countryFlags[place] || 'https://via.placeholder.com/200x180';

    // Set page background to flag
    document.body.style.backgroundImage = `url('${flagURL}')`;

    newsContainer.innerHTML = articles.map(article => `
        <div class="news-card">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        </div>
    `).join('');
}


// Search button click
searchBtn.addEventListener('click', () => {
    const place = placeInput.value.trim();
    if (place) {
        fetchNews(place);
    }
});

// Default news
fetchNews('India');

