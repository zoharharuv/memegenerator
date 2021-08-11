'use strict'
var gContainer;
var gCanvas;
var gCtx;

function renderCanvas() {
    gContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = gContainer.offsetWidth;
    gCanvas.height = gContainer.offsetHeight;
    gCtx = gCanvas.getContext('2d');
    const meme = getMeme();
    console.log(meme.selectedImgId);
    drawImgFromlocal(meme.selectedImgId);
    // let strHTML = ``;
}

function drawImgFromlocal(imgId) {
    debugger
    const imgUrl = getImg(imgId);
    var img = new Image()
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}