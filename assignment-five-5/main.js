function addShow(name) {
    let current = JSON.parse(localStorage.getItem("showNames"));

    if (current === null) {
        localStorage.setItem("showNames", JSON.stringify([name]));
    } else {
        current.push(name);
        localStorage.setItem("showNames", JSON.stringify(current));
    }
}

function removeShow(name) {
    let current = JSON.parse(localStorage.getItem("showNames"));

    current.splice(current.indexOf(name), 1);
    localStorage.setItem("showNames", JSON.stringify(current));
}

var selectors = document.querySelector('.selectors');

var showNames = JSON.parse(localStorage.getItem("showNames"));

if (showNames !== null) {
    for (show of showNames) {
        selectors.innerHTML += `<span>${show}</span>`;
    }
}