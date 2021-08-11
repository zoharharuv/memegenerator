'use strict'
// CANVAS
var gContainer;
var gCanvas;
var gCtx;
var gElContent;
var gElText;
var currMeme;
var currIdx;
function init() {
    gElText = document.querySelector('#txt-input');
    renderMeme();
}

function renderMeme() {
    // INIT EL CANVAS
    gContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = gContainer.offsetWidth;
    gCanvas.height = gContainer.offsetHeight;
    gCtx = gCanvas.getContext('2d');
    // GET SELECED MEME
    currMeme = getMeme();
    currIdx = (!gMeme.selectedLineIdx) ? gMeme.selectedLineIdx : gMeme.lines.length;
    // RENDER IMG+MEME LINES
    drawImg(currMeme.selectedImgId);
}

function drawImg(imgId) {
    const imgUrl = getImg(imgId);
    var img = new Image()
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawMemeLines();
        // SAVE CURRENT CTX
        gCtx.save();
    }
}

function drawMemeLines() {
    // USED INSIDE DRAWIMG
    gMeme.lines.forEach(line => {
        gCtx.strokeStyle = `${line.color}`;
        gCtx.fillStyle = `#ffffff`;
        gCtx.textAlign = `${line.align}`;
        gCtx.font = `${line.size}px Impact`;
        gCtx.fillText(`${line.txt}`, line.x, line.y);
        gCtx.strokeText(`${line.txt}`, line.x, line.y);
    });
}

function onInput(val) {
    changeTxt(val, currIdx);
    renderMeme();
}