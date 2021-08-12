'use strict'
var elModal;
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