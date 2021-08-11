'use strict'
// NAVBAR
function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function showGallery(btn) {
    onClickNavBtn(btn)
    hideEls()
    document.querySelector('.gallery').style.display = 'grid';
    toggleMenu()
}

function showAbout(btn) {
    onClickNavBtn(btn)
    hideEls()
    document.querySelector('.about').style.display = 'flex';
    toggleMenu()
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

function hideEls(){
    document.querySelector('.generator').style.display = 'none';
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.about').style.display = 'none';
}

function initEls(){
    document.querySelector('[href="#"]').classList.add('active');
}