const typeArea = document.querySelector('#type-area');

let typewriter = new Typewriter(typeArea, {
    loop: false
});

typewriter.typeString('Hello, world!')
    .pauseFor(1000)
    .deleteAll()
    .typeString('I am a Designer')
    .pauseFor(1000)
    .deleteChars(8)
    .pauseFor(500)
    .typeString('Developer')
    .pauseFor(1000)
    .deleteChars(9)
    .pauseFor(500)
    .typeString('Problem Solver')
    .pauseFor(500)
    .deleteAll()
    .typeString('Welcome!')
    .start();