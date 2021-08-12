'use strict'
// CANVAS
var gContainer;
var gCanvas;
var gCtx;
var gElContent;
// 
var currMeme;
var currIdx;
var currImgId;
function init() {
    renderGallery();
    initEls();
}

function renderGallery(key = null) {
    const imgs = getImgs(key);
    const strHTMLs = imgs.map((img) => {
        return `
      <img src="${img.url}" class="gallery-item img-${img.id}"  onclick="onSelectMeme(${img.id})">`;
    });
    document.querySelector('.gallery').innerHTML = strHTMLs.join('');
}

function renderMeme() {
    // INIT EL CANVAS
    document.querySelector('.generator').style.display = 'flex';
    gContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = gContainer.offsetWidth;
    gCanvas.height = gContainer.offsetHeight;
    gCtx = gCanvas.getContext('2d');
    // RENDER IMG+MEME LINES
    currMeme = getMeme();
    currMeme.selectedImgId = currImgId;
    drawImg(currImgId);
}

function drawImg() {
    const imgUrl = getMemeImg();
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
    currMeme.lines.forEach(line => {
        gCtx.strokeStyle = `${line.stroke}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.textAlign = `${line.align}`;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillText(`${line.txt}`, line.x, line.y);
        gCtx.strokeText(`${line.txt}`, line.x, line.y);
    });
}

function onSelectMeme(imgId) {
    hideEls();
    removeActives();
    currImgId = imgId;
    renderMeme();
}

// CANVAS FUNCTIONS
function onInput(val) {
    currMeme = getMeme();
    currIdx = currMeme.selectedLineIdx;
    changeTxt(val, currIdx);
    renderMeme();
}

function onMoveLine(diff) {
    if (!currMeme.lines.length) return;
    if (!currIdx) currIdx = 0;
    moveLine(diff);
    renderMeme();
}

function onAddLine() {
    currIdx = addLine();
    console.log(currIdx);
    renderMeme();
}
function onDeleteLine() {
    if (!currMeme.lines.length) return;
    if (!currIdx) currIdx = 0;
    currIdx = deleteLine();
    console.log(currIdx);
    renderMeme();
}

function onSwitchLines() {
    currIdx = switchLines();
    if(!currIdx) return;
    document.querySelector('#txt-input').value = currMeme.lines[currIdx].txt;
    document.querySelector('#txt-input').focus();
    renderMeme();
}

function onSetFontsize(size) {
    if (!currMeme.lines.length) return;
    if (!currIdx) currIdx = 0;
    setFontSize(size);
    renderMeme();
}

function onSetAlign(align) {
    if (!currMeme.lines.length) return;
    if (!currIdx) currIdx = 0;
    setAlign(align);
    renderMeme();
}

function onSetFont(font){
    setFont(font);
    renderMeme();
}

function onSetColor(option, color){
    setColor(option, color);
    renderMeme();
}