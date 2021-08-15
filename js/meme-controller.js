'use strict'
// CANVAS
var gContainer;
var gCanvas;
var gCtx;
// MEME
var currMeme;
var currIdx;
var currImgId;
// SEARCH
var gSearchWord;
var gIsSearched = false;
// UPLOAD
var gIsUpload;
var gImg

// FIRST INIT
function init() {
    initEls();
    hideEls();
    renderGallery();
}

function renderGallery(gSearchWord = null) {
    gIsUpload = false;
    if (!gIsSearched) renderSearch();
    const imgs = getImgs(gSearchWord);
    const strHTMLs = imgs.map((img) => {
        return `
      <img src="${img.url}" class="gallery-item img-${img.id}"  onclick="onSelectMeme(${img.id})">`;
    });
    document.querySelector('.gallery').innerHTML = strHTMLs.join('');
    document.querySelector('.gallery').classList.remove('hidden');
}
// MY MEMES PAGE
function renderMyMemes() {
    let elMemes = document.querySelector('.memes')
    const memes = getMemes();
    if (memes) {
        let strHTMLs = memes.map((meme, memeIdx) => {
            const imgUrl = getMemeImg(meme);
            return `
            <img src="${imgUrl}" class="gallery-item img-${memeIdx}"  onclick="onSelectMyMeme(${memeIdx})">`;
        });
        strHTMLs.push(`</div>`);
        strHTMLs.unshift(`<div class="memes-container">`);
        strHTMLs.unshift(`<div class="meme-title"><h2>Your Meme Templates</h2></div>`)
        elMemes.innerHTML = strHTMLs.join('');
    } else {
        elMemes.innerHTML = `<div class="meme-title"><h1>You haven't saved any memes yet!</h1></div>`
    }
}

function renderMeme() {
    // INIT EL CANVAS
    document.querySelector('.meme-gen').classList.remove('hidden');
    gContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    // RENDER IMG+MEME LINES
    currMeme = getMeme();
    currMeme.selectedImgId = currImgId;
    drawImg();
}

function drawImg() {
    if (!gIsUpload) {
        const imgUrl = getMemeImg(currMeme);
        var img = new Image()
        img.src = imgUrl;
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
            drawMemeLines();
            // SAVE CURRENT CTX
            gCtx.save();
        }
    } else {
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
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
    gImg = null;
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
    focusInput();
    renderMeme();
}
function onDeleteLine() {
    if (!currMeme.lines.length) return;
    if (!currIdx) currIdx = 0;
    currIdx = deleteLine();
    resetInput();
    renderMeme();
}

function onSwitchLines() {
    if (!currMeme.lines.length) return;
    currIdx = switchLines();
    if (currIdx < 0) return;
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

// MODAL FUNCS
function onSaveMeme(el) {
    console.log(el);
    saveMeme();
    el.innerText = 'Saved!';
}

function onDownload(el) {
    const memeImg = gCanvas.toDataURL('image/jpeg');
    el.href = memeImg;
}

// MY MEME FUNC
function onSelectMyMeme(memeIdx) {
    hideEls();
    removeActives();
    gImg = null;
    currMeme = getMyMeme(memeIdx);
    currImgId = currMeme.selectedImgId;
    resetInput();
    renderMeme();
}

// TXT-INPUT FUNCS
function resetInput() {
    const text = (currMeme.lines.length) ? currMeme.lines[0].txt : 'Click + for new line';
    document.querySelector('.txt-input').value = text;
}
function focusInput() {
    document.querySelector('#txt-input').value = currMeme.lines[currIdx].txt;
    document.querySelector('#txt-input').focus();
}


// HANDLE SEARCH BAR
function onSearchWord(word, el = null) {
    gIsSearched = true;
    if (el) {
        cleanSearch();
        const size = addSize(el.style.fontSize);
        el.style.fontSize = `${size}`;
    }
    gSearchWord = word;
    renderGallery(gSearchWord);
}

// HANDLE IMG UPLOAD
function onImgInput(ev, el) {
    gIsUpload = true;
    loadImageFromInput(ev, renderImg)
    el.value = null;
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gImg = img;
    currImgId = 101;
    currMeme = resetMeme();
    hideEls();
    removeActives();
    resetInput();
    renderMeme();
}