'use strict'
var currSize = window.innerWidth
var elGallery;
var elAbout;
var elGenerator;
var elMemes;
var currEl;
var elModal;


window.addEventListener('resize', () =>{
    currSize = window.innerWidth;
    if(currEl === 'gallery') elGallery.style.display = setDisplay();
    if(currEl === 'memes') elMemes.style.display = setDisplay();
});
    

// NAVBAR
function toggleMenu() {
    if (currSize > 760) return;
    document.body.classList.toggle('menu-open');
}

function showGallery(btn) {
    currEl = 'gallery';
    onClickNavBtn(btn)
    hideEls()
    elGallery.style.display = setDisplay();
    toggleMenu()
}

function showAbout(btn) {
    currEl = 'about';
    onClickNavBtn(btn)
    hideEls()
    elAbout.style.display = 'flex';
    toggleMenu()
}

function showMemes(btn) {
    currEl = 'memes';
    onClickNavBtn(btn)
    hideEls()
    elMemes.style.display = setDisplay();
    toggleMenu()
    renderMyMemes()
}

function onClickNavBtn(el) {
    removeActives();
    el.classList.toggle('active');
    el.childNodes[0].classList.toggle('active');
}

function removeActives() {
    var elLinks = document.querySelectorAll('[href="#"]')
    elLinks.forEach(link => {
        link.classList.remove('active');
        link.parentElement.classList.remove('active');
    })
}

function hideEls() {
    elGenerator.style.display = 'none';
    elGallery.style.display = 'none'
    elAbout.style.display = 'none';
    elMemes.style.display = 'none';
}

function initEls() {
    document.querySelector('[href="#"]').classList.add('active');
    elGallery = document.querySelector('.gallery');
    elAbout = document.querySelector('.about');
    elGenerator = document.querySelector('.generator');
    elMemes = document.querySelector('.memes');
}

function updateEl(){
    currEl = 'generator';
}

function setDisplay(){
    return (currSize <= 760) ? 'flex' : 'grid';
}

// MODAL
function openModal() {
    elModal = document.querySelector('.modal');
    elModal.classList.toggle('open');
    setTimeout(() => {
        document.querySelector('header').addEventListener('click', closeModal)
    }, 200);
}

function closeModal() {
    document.querySelector('header').removeEventListener('click', closeModal);  
    elModal.classList.toggle('open');
}