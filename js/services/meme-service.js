'use strict'
// GLOBAL VARS
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: '../imgs/1.jpg', keywords: ['happy'] }];
var gMemes = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function getImg(imgId) {
    debugger
    const img = gImgs.find(img => {
        return (img.id === imgId) ? img : null;
    })
    console.log(img.url);
    return img.url;
}

function getMeme() {
    return gMemes;
}