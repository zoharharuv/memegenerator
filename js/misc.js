'use strict'
var gCurrSize = window.innerWidth
var gMaxFontSize;
var gCanvas;

var gSearch;
var elGallery;

var elGenerator;
var elMemes;
var elAbout;

var elModal;
var elToggle;

window.addEventListener('resize', () => {
    gCurrSize = window.innerWidth;
});


// NAVBAR
function toggleMenu() {
    if (gCurrSize <= 760) document.body.classList.toggle('menu-open');
}
function showContent(currEl, btn) {
    onClickNavBtn(btn)
    hideEls();
    switch (currEl) {
        case 'gallery':
            renderGallery();
            break;
        case 'about':
            elAbout.classList.remove('hidden');
            break;
        case 'memes':
            elMemes.classList.remove('hidden');
            renderMyMemes();
            break;
    }
    toggleMenu();
}

function onClickNavBtn(el) {
    gIsSearched = false;
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
    elGenerator = document.querySelector('.meme-gen');
    elMemes = document.querySelector('.memes');
    elModal = document.querySelector('.modal');
    elToggle = document.querySelector('.btn-menu-toggle');
    gSearch = document.querySelector('.search');
    // FOR CANVAS
    gCanvas = document.querySelector('#canvas');
    // RESIZE CANVAS
    if (gCurrSize <= 760) {
        gCanvas.width = 350;
        gCanvas.height = 350;
        setMemeSize(350);
    }
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
    gMaxFontSize = (gCurrSize <= 760) ? 35 : 50;
    searchWords.forEach(word => {
        const size = getRndNum((gMaxFontSize / 2), gMaxFontSize - 7);
        word.style.fontSize = `${size}px`;
    })
}

function onShowAllWords(el) {
    if (el.innerText === 'Hide..') { el.innerText = 'All..'; }
    else { el.innerText = 'Hide..'; }
    document.querySelector('.all-words-box').classList.toggle('hidden');
}
function cleanSearch() {
    document.querySelector('#search-bar').value = '';
}

function addSize(currSize) {
    let sizeNum = +(currSize.slice(0, -2));
    if (sizeNum <= gMaxFontSize) sizeNum++;
    return `${sizeNum}px`;
}
function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
