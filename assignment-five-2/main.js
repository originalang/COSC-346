function search(elemId, d) {
    const searchElement = document.querySelector(`#${elemId}`);

    let a = {
        "typeAhead": new TypeAhead(d),
        "searchInput": searchElement.querySelector('input'),
        "suggestions": searchElement.querySelector('ul')
    };

    return a;
}

// city search
const citiesEndpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let d = [];

fetch(citiesEndpoint)
    .then(blob => blob.json())
    .then(data => d.push(...data));

let citySearch = search("cities", d);

citySearch["searchInput"].addEventListener('keyup', function () {
    if (this.value === '') {
        citySearch["suggestions"].innerHTML = '';
    }

    if (this.value.length < 3) return

    const matchArray = citySearch["typeAhead"].findMatches(this.value, ["city", "state"]);

    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<mark>${this.value}</mark>`);
        const stateName = place.state.replace(regex, `<mark>${this.value}</mark>`);

        return `
        <li>
            <span>${cityName}, ${stateName}</span>
        </li>
        `;
    }).join('');

    citySearch["suggestions"].innerHTML = html;
});

// game of thrones search
const gotEndpoint = 'http://api.tvmaze.com/singlesearch/shows?q=game-of-thrones&embed=episodes';

let gotd = [];

fetch(gotEndpoint)
    .then(blob => blob.json())
    .then(data => gotd.push(...data["_embedded"]["episodes"]));

let gotSearch = search("got", gotd);

gotSearch["searchInput"].addEventListener('keyup', function () {
    console.log(this.value)
    if (this.value === '') {
        gotSearch["suggestions"].innerHTML = '';
    }

    if (this.value.length < 3) return

    const matchArray = gotSearch["typeAhead"].findMatches(this.value, ["name"]);

    const html = matchArray.map(episode => {
        const regex = new RegExp(this.value, 'gi');
        console.log(episode.name);
        const episodeName = episode.name.replace(regex, `<mark>${this.value}</mark>`);

        return `
        <li>
            <span>${episodeName}, S${episode.season}:${episode.number}</span>
        </li>
        `;
    }).join('');

    gotSearch["suggestions"].innerHTML = html;
});