'use strict'
// CANVAS
var gContainer;
var gCanvas;
var gCtx;
// MEME
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
// MY MEMES PAGE
function renderMyMemes() {
    let elMemes = document.querySelector('.memes');
    let strHTMLs = ``;
    const memes = getMemes();
    console.log(memes);
    if (memes) {
        strHTMLs = memes.map((meme, memeIdx) => {
            const imgUrl = getMemeImg(meme);
            return `
          <img src="${imgUrl}" class="gallery-item img-${memeIdx}"  onclick="onSelectMyMeme(${memeIdx})">`;
        });
        elMemes.innerHTML = strHTMLs.join('');
    } else {
        elMemes.innerHTML = `<h1>You Havent saved any memes yet!</h1>`
    }
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
    gCanvas.addEventListener('click', (ev) => {
        onClickCanvas(ev.offsetX, ev.offsetY);
    });
}

function drawImg() {
    const imgUrl = getMemeImg(currMeme);
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
    currMeme = resetMeme();
    resetInput();
    renderMeme();
}

// CONTROL-BOX FUNCS
function onInput(val) {
    currMeme = getMeme();
    currIdx = currMeme.selectedLineIdx;
    if (currIdx >= 0) changeTxt(val, currIdx);
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
    focusInput();
    renderMeme();
}
function onDeleteLine() {
    if (!currMeme.lines.length) return;
    if (!currIdx) currIdx = 0;
    currIdx = deleteLine();
    console.log(currIdx);
    resetInput();
    renderMeme();
}

function onSwitchLines() {
    if (!currMeme.lines.length) return;
    currIdx = switchLines();
    if (!currIdx) return;
    focusInput();
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

function onSetFont(font) {
    setFont(font);
    renderMeme();
}

function onSetColor(option, color) {
    setColor(option, color);
    renderMeme();
}

function onSaveMeme() {
    saveMeme();
    closeModal();
}

// HANDLE SAVED MEMES
function onSelectMyMeme(memeIdx) {
    hideEls();
    removeActives();
    currMeme = getMyMeme(memeIdx);
    currImgId = currMeme.selectedImgId;
    resetInput();
    renderMeme();
}

function resetInput() {
    const text = (currMeme.lines.length) ? currMeme.lines[0].txt : 'Click + for new line';
    document.querySelector('.txt-input').value = text;
}
function focusInput() {
    document.querySelector('#txt-input').value = currMeme.lines[currIdx].txt;
    document.querySelector('#txt-input').focus();
}
// HANDLE CANVAS
function onClickCanvas(x, y) {
    console.log('x', x)
    console.log('y', y);
    currMeme.lines.find(line => {
        console.log(line.x === x);
    })
}
