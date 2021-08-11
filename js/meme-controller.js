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
    renderGallery();
}

function renderGallery(key = null) {
    const imgs = getImgs(key);
    const strHTMLs = imgs.map((img) => {
        return `
      <img src="${img.url}" class="gallery-item img-${img.id}"  onclick="onSelectMemeToRender(${img.id})">`;
    });
    document.querySelector('.gallery').innerHTML = strHTMLs.join('');
}

function renderMeme() {
    // INIT EL CANVAS
    gContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = gContainer.offsetWidth;
    gCanvas.height = gContainer.offsetHeight;
    gCtx = gCanvas.getContext('2d');
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
        gCtx.strokeStyle = `${line.stroke}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.textAlign = `${line.align}`;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillText(`${line.txt}`, line.x, line.y);
        gCtx.strokeText(`${line.txt}`, line.x, line.y);
    });
}

function onInput(val) {
    // GET SELECED MEME
    currMeme = getMeme();
    currIdx = (!currMeme.selectedLineIdx) ? currMeme.selectedLineIdx : currMeme.lines.length;
    changeTxt(val, currIdx);
    renderMeme();
}