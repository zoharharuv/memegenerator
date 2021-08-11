'use strict'
var gElContent;
function init() {
    gElContent = document.querySelector('#content');
    renderCanvas();
}

function renderCanvas() {
    gElContent.innerHTML = 'hi';
}