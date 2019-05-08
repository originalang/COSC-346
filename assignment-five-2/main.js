const searchInput = document.querySelector('#search-input');
const suggestions = document.querySelector('#suggestions');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let a = new TypeAhead(endpoint);

searchInput.addEventListener('keyup', displayMatches);

function displayMatches() {
    const matchArray = a.findMatches(this.value, ["city", "state"]);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<mark>${this.value}</mark>`);
        const stateName = place.state.replace(regex, `<mark>${this.value}</mark>`);
        return `
        <li>
        <span>${cityName}. ${stateName}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}