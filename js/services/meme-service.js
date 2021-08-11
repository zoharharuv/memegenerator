'use strict'
// GLOBAL VARS
var gKeywords = { 'happy': 12, 'funny puk': 1 }
const gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['love', 'dogs'] },
    {
        id: 3,
        url: 'imgs/3.jpg', keywords: ['love', 'dogs', 'nice', 'baby'],
    },
    { id: 4, url: 'imgs/4.jpg', keywords: ['cats'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['nice', 'baby'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['happy', 'cool'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['cool', 'funny'] },
    {
        id: 9,
        url: 'imgs/9.jpg',
        keywords: ['cool', 'funny', 'happy', 'baby'],
    },
    {
        id: 10,
        url: 'imgs/10.jpg',
        keywords: ['funny', 'cool', 'happy'],
    },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'love', 'cool'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['cool', 'angry', 'sad'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['cool', 'funny'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['cool', 'angry'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['cool', 'angry'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['angry'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['cool', 'angry'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text here',
            size: 30,
            align: 'left',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 150,
            y: 50,
        },
        {
            txt: 'Enter text here',
            size: 30,
            align: 'left',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 150,
            y: 450,
        },
    ]
}

function getMemeImg() {
    const img = gImgs.find(img => {
        return (img.id === gMeme.selectedImgId) ? img : null;
    })
    return img.url;
}

function getMeme() {
    return gMeme;
}


function switchLines() {
    if (!gMeme.lines.length) return;
    if (gMeme.lines.length <= 1) return;
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
    return gMeme.selectedLineIdx;
}

function changeTxt(txt, idx) {
    return (gMeme.lines[idx].txt = txt);
}

function getImgs(searchedWord) {
    if (!searchedWord) return gImgs;
    return gImgs.filter(img => {
        return img.keywords.some(word => word.includes(searchedWord.toLowerCase()))
    })
}

function checkSize(size) {
    let isValid = gMeme.lines[gMeme.selectedLineIdx].size + size;
    if (isValid === 10 || isValid === 60) return;
    return true;
}

function moveLine(diff) {
    return gMeme.lines[gMeme.selectedLineIdx].y += diff;
}