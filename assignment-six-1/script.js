// declare variables up here
const headerPart = document.querySelector('.header-part');
const blueSquare = document.querySelector('.blue.square');
const mainPart = document.querySelector('.main-part');
const showBunnyButton = document.querySelector('.show-bunny');
const bunnyImages = document.querySelectorAll('.bunny-image');

//click event listeners
blueSquare.addEventListener('click', () => {
    headerPart.classList.add('hidden');
    mainPart.classList.remove('hidden');
});

showBunnyButton.addEventListener('click', () => {
    //get the current image showing
    const currentImage = document.querySelector('.bunny-image.active');
    // figure out the next image to show by adding one to the id
    const nextImageId =  // I know I said never use double equal signs but in this I purposely want to compare an int with a string so I used it #sorrynotsorry
        currentImage.dataset.id == bunnyImages.length ? 1 : parseInt(currentImage.dataset.id) + 1;
    const nextImage = document.querySelector(`[data-id="${nextImageId}"]`);
    // hide currentImage and show nextImage
    currentImage.classList.remove('active');
    nextImage.classList.add('active');
})