'use strict'
function onUpload(option) {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg")
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        if (option === 'upload') {
            document.querySelector('.upload-modal').innerHTML = `<a style="color: darkgreen" href="${uploadedImgUrl}">Your photo URL</a>`;
        }
        if (option === 'facebook') {
            if (gCurrSize > 760) {
                document.querySelector('.facebook-modal').innerHTML = `
                <a style="color: white" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}"
                title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}');
                return false;">
                Click again to share!   
                </a>`;
            } else {
                if (navigator.share) {
                    navigator.share({
                        title: 'My Meme',
                        text: 'Check out my',
                        url: `${uploadedImgUrl}`,
                    })
                        .then(() => console.log('Successful share'))
                        .catch((error) => console.log('Error sharing', error));
                }
            }
        }
    }
doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('http://www.ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            document.querySelector('.modal').innerHTML = `${err}`;
        })
}




