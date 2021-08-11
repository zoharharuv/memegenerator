'use strict'
// CANVAS
var gContainer;
var gCanvas;
var gCtx;
// TOOLS
// MEME
var gCurrMeme;

function renderCanvas() {
    gContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = gContainer.offsetWidth;
    gCanvas.height = gContainer.offsetHeight;
    gCtx = gCanvas.getContext('2d');
    gCurrMeme = getMeme();
    drawImgFromlocal(gCurrMeme.selectedImgId);

}

function drawImgFromlocal(imgId) {
    const imgUrl = getImg(imgId);
    var img = new Image()
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText();
    }
}

function drawText() {
    const txtPrefs = gCurrMeme.lines[gCurrMeme.selectedLineIdx];
    gCtx.strokeStyle = `${txtPrefs.color}`;
    gCtx.fillStyle = `#ffffff`;
    gCtx.textAlign = `${txtPrefs.align}`;
    gCtx.font = `${txtPrefs.size}px Impact`;
    gCtx.fillText(`${txtPrefs.txt}`, 10, 50);
    gCtx.strokeText(`${txtPrefs.txt}`, 10, 50);
}
