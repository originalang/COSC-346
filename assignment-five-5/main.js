function endpoint(q) {
    let showName = q.split(' ').join('-')
    return `https://api.tvmaze.com/singlesearch/shows?q=${showName}&embed=episodes`
}

function addShow(name, callback) {
    fetch(endpoint(name)).then((response) => {
        if (response.status === 200) {
            let current = JSON.parse(localStorage.getItem("showNames"));

            if (current === null) {

                localStorage.setItem("showNames", JSON.stringify([name]));
            } else {
                current.push(name);
                localStorage.setItem("showNames", JSON.stringify(current));
            }

            callback();
        }
    });
}

function removeShow(name, callback) {
    let currentShows = JSON.parse(localStorage.getItem("showNames"));

    currentShows.splice(currentShows.indexOf(name), 1)
    localStorage.setItem("showNames", JSON.stringify(currentShows));

    callback();
}

async function getShows() {
    let showPromise = [];

    var showNames = JSON.parse(localStorage.getItem("showNames"));

    if (showNames === null || showNames.length === 0) {
        toggleHelp();
    }

    if (showNames !== null) {
        for (let show of showNames) {
            await fetch(endpoint(show))
                .then(blob => blob.json())
                .then(data => showPromise.push({ key: show, data: data }));
        }
    }

    return showPromise;
}

function displayShows() {
    getShows().then(showList => {
        showsContainer.innerHTML = '';
        for (let show of showList) {
            if (show.data.image) {
                showsContainer.innerHTML +=
                    `<div class="show-regular" data-name="${show.key}" onclick="showDetails(this)" onmouseover="showRemoveButton(this);" onmouseleave="hideRemoveButton(this);">
                        <span data-name="${show.key}" class="remove-show" onclick="removeShow(this.dataset.name, displayShows)">
                            <i class="fas fa-times"></i>
                        </span>
                        <img src="${show.data.image.medium}" />
                    </div>`
            }
        }

        currentShowData = showList;
    });
}

let currentShowData = []

const showsContainer = document.querySelector('.shows');
displayShows();

const addShowElement = document.querySelector("#add-show");

const addShowButton = addShowElement.querySelector('span');
const addShowInput = addShowElement.querySelector('input');

const addIcon = document.querySelector('#add-icon');
const closeIcon = document.querySelector('#close-icon');

addShowButton.addEventListener('click', function () {
    if (addShowElement.classList.contains('float-in')) {
        addShowElement.classList.remove('float-in');
        addShowElement.classList.add('float-out');

        addIcon.style.display = 'inline-block';
        closeIcon.style.display = 'none';
    } else {
        addShowElement.classList.remove('float-out');
        addShowElement.classList.add('float-in');

        addIcon.style.display = 'none';
        closeIcon.style.display = 'inline-block';
    }
});

addShowInput.addEventListener('change', function () {
    addShow(this.value, displayShows);
    this.value = '';
});

function showRemoveButton(show) {
    let sp = show.querySelector('span');
    sp.style.display = "block";
}

function hideRemoveButton(show) {
    let rmButton = show.querySelector('span');
    rmButton.style.display = "none";
}

function showDetails(show) {
    let details = document.querySelector('.details');

    details.querySelector('p').innerHTML = getShowData(show.dataset.name).data.summary.replace(/<(.*?)>/g, '');

    show.classList.remove('show-regular');
    show.classList.add('show-selected');

    getAllSiblings(show).forEach((sibling) => {
        sibling.classList.remove('show-selected');
        sibling.classList.add('show-regular');
    });
}

function getShowData(showKey) {
    return currentShowData.filter((show) => {
        return show.key === showKey;
    })[0];
}

function getAllSiblings(node) {
    let children = node.parentNode.childNodes;

    let siblings = [];

    children.forEach((child) => {
        if (child !== node) {
            siblings.push(child);
        }
    });

    return siblings;
}

function toggleHelp() {
    const help = document.querySelector('#help');

    if (help.style.display === 'none') {
        help.style.display = 'block'
    } else {
        help.style.display = 'none'
    }
}