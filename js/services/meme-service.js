'use strict'
// GLOBAL VARS
const MEMES_DB = 'memesDB';
var gFont = 'Impact';
var gKeywords = { 'happy': 5, 'love': 3, 'dogs': 3, 'nice': 2, 'baby': 4, 'cool': 10, 'funny': 7, 'angry': 5 };
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
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 250,
            y: 50,
        },
        {
            txt: 'Enter text here',
            size: 30,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 250,
            y: 450,
        },
    ]
}
// MAIN FUNCS
function getMemeImg() {
    const img = gImgs.find(img => {
        return (img.id === gMeme.selectedImgId) ? img : null;
    })
    return img.url;
}

function getMeme() {
    return gMeme;
}

function getImgs(searchedWord) {
    if (!searchedWord) return gImgs;
    return gImgs.filter(img => {
        return img.keywords.some(word => word.includes(searchedWord.toLowerCase()))
    })
}



// CANVAS FUNCS
function changeTxt(txt, idx) {
    return (gMeme.lines[idx].txt = txt);
}
function moveLine(diff) {
    return gMeme.lines[gMeme.selectedLineIdx].y += diff;
}

function switchLines() {
    if (!gMeme.lines.length) return;
    if (gMeme.lines.length <= 1) return;
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
    return gMeme.selectedLineIdx;
}


function addLine() {
    gMeme.lines.push(_createLine());
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    return gMeme.selectedLineIdx;
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx--;
    if (gMeme.selectedLineIdx < -1) gMeme.selectedLineIdx = 0;
    return gMeme.selectedLineIdx;
}

function setFontSize(size) {
    let isValid = gMeme.lines[gMeme.selectedLineIdx].size + size;
    if (isValid === 10 || isValid === 60) return;
    return gMeme.lines[gMeme.selectedLineIdx].size += size;;
}

function setAlign(align){
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function setFont(font){
    gFont = font;
    if (!gMeme.lines.length) return;
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setColor(option, color){
    if (!gMeme.lines.length) return;
    gMeme.lines[gMeme.selectedLineIdx][option] = color;
}

// MISC FUNCS

function _createLine() {
    return {
        txt: 'Enter text here',
        size: 30,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: gFont,
        x: 250,
        y: 250,
    }
}