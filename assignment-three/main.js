var faceyText = document.querySelector('#facey-text');
var facey = document.querySelector('.facey');
var commandInput = document.querySelector('input');
var commandsText = document.querySelector('#commands');

// append a style tag to the HTML page
var styleElement = document.head.appendChild(document.createElement("style"));

var commands = {
    'hello': function () {
        faceyText.innerText = 'Nice to meet you!';
        animate(facey, 'bounce-facey');
    },
    'float': function () {
        animate(facey, 'float-facey');
    },
    'spin': function () {
        animate(facey, 'spin-facey');
    },
    'surprise': function () {
        styleElement.innerHTML = ".facey:after {left: 60%; width: 6px; height: 6px; border-radius: 50%; border-top: 2px solid black;}";
    },
    'grow': function () {
        facey.style.transform = "scale(2, 2)";
    },
    'shrink': function () {
        facey.style.transform = "scale(1, 1)";
    },
    'sad': function () {
        styleElement.innerHTML = ".facey:after {transform: rotateZ(180deg);}";
    },
    'happy': function () {
        styleElement.innerHTML = ".facey:after {border-top: 2px solid black;}";
    },
    'astonish': function () {
        styleElement.innerHTML = ".facey:after {transform: rotateZ(180deg); border-top: 2px solid black;}";
    },
    'derp': function () {
        styleElement.innerHTML = ".facey:before {transform: rotate(15deg); width: 8px;}";
    },
    'upset': function () {
        styleElement.innerHTML = ".facey:after {left: 60%; border-left: none; border-right:none; border-radius: 0; transform: rotate(10deg);}";
    },
    'hide': function () {
        facey.style.opacity = "0";
    },
    'show': function () {
        facey.style.opacity = "1";
    },
    'bounce': function () {
        animate(facey, 'bounce-facey');
    },
    'roll': function () {
        faceyText.innerText = 'Rolling...';
        animate(facey, 'roll-facey');
    },
    'glow': function () {
        faceyText.innerText = "I'm glowing!!";
        animate(facey, 'glow-facey');
    },
    'wink': function () {
        styleElement.innerHTML = ".facey:before {border-right: 6px solid black}"
    },
    'cyclops': function () {
        faceyText.innerText = "I've got one eye!";
        styleElement.innerHTML = ".facey:before {border-left: none}"
    },
    'annoy': function () {
        styleElement.innerHTML = ".facey:before {left: 40%; border-left: 5px solid black; border-right: 5px solid black;} .facey:after {left: 60%; border-left: none; border-right:none; border-radius: 0;}";
    },
    'red': function () {
        facey.style.backgroundColor = "red";
    },
    'fly': function () {
        faceyText.innerText = "I'm flying!! Use the 'ground' command to bring me back!";
        facey.style.transform = "translateY(-600px)";
    },
    'fall': function () {
        faceyText.innerText = "I'm falling!! Use the 'ground' command to bring me back!";
        facey.style.transform = "translateY(600px)";
    },
    'ground': function () {
        faceyText.innerText = "I am at my position!!";
        facey.style.transform = "none";
    },
    'block': function () {
        facey.style.borderRadius = "20%";
    },
    'reset': function () {
        location.reload();
    }
};

commandNames = Object.keys(commands);

commandsText.innerText = commandNames.length + ' Commands: ' + commandNames.join(', ')

commandInput.addEventListener('keyup', function () {
    inputValue = commandInput.value;
    facey.offsetWidth;
    if (commandNames.includes(inputValue)) {
        commands[inputValue]();
        clearInput();
    }
});

var clearInput = function () {
    commandInput.value = '';
}

var animate = function (elem, animationName) {
    elem.classList.remove('float-facey', 'bounce-facey', 'spin-facey', 'roll-facey', 'glow-facey');
    void elem.offsetWidth;
    elem.classList.add(animationName);
}