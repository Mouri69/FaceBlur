document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "BWPuWOMGPw-MDkMRfqC9NqKLwyISBd311JNMcPVWSwonnri9ig");
    myHeaders.append("x-apihub-host", "Face-Blur.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "144b3779-a03e-40a0-b649-9dd52817ce20");

    const formdata = new FormData();
    formdata.append("image", fileInput.files[0], "file");

    // Debugging: Log FormData contents
    formdata.forEach((value, key) => {
        console.log(key, value);
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("https://Face-Blur.proxy-production.allthingsdev.co/face/editing/blur-face", requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP error! Status: ${response.status} - ${text}`);
                });
            }
            return response.blob(); // Assuming the response is an image blob
        })
        .then((blob) => {
            const resultImage = document.getElementById('resultImage');
            resultImage.src = URL.createObjectURL(blob);
            resultImage.style.display = 'block';
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
