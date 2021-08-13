'use strict'
var currSize = window.innerWidth
var currEl;

var elGallery;
var gSearch;

var elGenerator;
var elMemes;
var elAbout;

var elModal;
var elToggle;

window.addEventListener('resize', () => {
    currSize = window.innerWidth;
});


// NAVBAR
function toggleMenu() {
    if (currSize <= 760) document.body.classList.toggle('menu-open');
}

function showGallery(btn) {
    currEl = 'gallery';
    onClickNavBtn(btn)
    hideEls();
    renderGallery();
    toggleMenu();
}

function showAbout(btn) {
    currEl = 'about';
    onClickNavBtn(btn);
    hideEls();
    elAbout.classList.remove('hidden');
    toggleMenu();
}

function showMemes(btn) {
    currEl = 'memes';
    onClickNavBtn(btn);
    hideEls();
    elMemes.classList.remove('hidden');
    toggleMenu();
    renderMyMemes();
}

function onClickNavBtn(el) {
    removeActives();
    el.classList.toggle('active');
    el.childNodes[0].classList.toggle('active');
}

function removeActives() {
    var elLinks = document.querySelectorAll('[href="#"]');
    gSearch.classList.add('hidden');
    elLinks.forEach(link => {
        link.classList.remove('active');
        link.parentElement.classList.remove('active');
    })
}

function hideEls() {
    elGenerator.classList.add('hidden');
    elGallery.classList.add('hidden');
    elAbout.classList.add('hidden');
    elMemes.classList.add('hidden');
}

function initEls() {
    document.querySelector('[href="#"]').classList.add('active');
    elGallery = document.querySelector('.gallery');
    elAbout = document.querySelector('.about');
    elGenerator = document.querySelector('.generator');
    elMemes = document.querySelector('.memes');
    elModal = document.querySelector('.modal');
    elToggle = document.querySelector('.btn-menu-toggle');
    gSearch = document.querySelector('.search');
}
function openModal() {
    elModal.classList.toggle('hidden');
}
function closeModal() {
    elModal.classList.toggle('hidden');
}

// SEARCH BAR
function renderSearch() {
    gSearch.classList.remove('hidden');
    let searchWords = document.querySelectorAll('.search-word');
    searchWords.forEach(word => {
        const size = getRndNum(20, 40);
        word.style.fontSize = `${size}px`;
    })
}

function onShowAllWords(el) {
    el.innerText = 'hide...';
    document.querySelector('.all-words-box').classList.toggle('hidden');
}

function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addSize(currSize) {
    let sizeNum = +(currSize.slice(0, -2));
    if (sizeNum <= 50) sizeNum++;
    return `${sizeNum}px`;
}