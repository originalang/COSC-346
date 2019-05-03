var faceyText = document.querySelector('#facey-text');
var facey = document.querySelector('.facey');
var commandInput = document.querySelector('input');
var commandsText = document.querySelector('#commands');

var floating = false;

// append a style tag to the HTML page
var styleElement = document.head.appendChild(document.createElement("style"));

var commands = {
    'hello': function () {
        faceyText.innerText = 'Nice to meet you!';
    },
    'float': function () {
        facey.style.animation = "float 3s forwards infinite";
        floating = true
    },
    'spin': function () {
        checkFloating(function () {
            facey.style.transform = "rotateZ(180deg)";
        });
    },
    'surprise': function () {
        styleElement.innerHTML = ".facey:after {border-radius: 50%;}";
    },
    'grow': function () {
        checkFloating(function () {
            facey.style.transform = "scale(2, 2)";
        });        
    },
    'shrink': function () {
        checkFloating(function () {
            facey.style.transform = "scale(1, 1)";
        });  
    },
    'frown': function () {
        styleElement.innerHTML = ".facey:after {transform: rotateZ(180deg);}";
    },
    'derp': function () {
        styleElement.innerHTML = ".facey:after {transform: translateX(10px) translateY(5px);}";
    },
    'stop-float': function () {
        facey.style.animation = "";
        floating = false;
    },
    'reset': function () {
        location.reload();
    }
};

commandNames = Object.keys(commands);

commandsText.innerText = commandNames.length + ' Commands: ' + commandNames.join(', ')

commandInput.addEventListener('keyup', function () {
    inputValue = commandInput.value;
    if (commandNames.includes(inputValue)) {
        commands[inputValue]();
        clearInput();
    }
});

var clearInput = function () {
    commandInput.value = '';
}

var checkFloating = function (action) {
    if (floating) {
        faceyText.innerText = 'I need to stop floating first (stop-float)!';
    } else {
        action();
    }
}