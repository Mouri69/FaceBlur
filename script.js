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

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("https://Face-Blur.proxy-production.allthingsdev.co/face/editing/blur-face", requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(json => {
                    // Handle errors more robustly
                    const errorMessage = json.message || 'Unknown error occurred';
                    console.error('Error response:', json);
                    alert(`Error: ${errorMessage}`);
                    throw new Error(`HTTP Error ${response.status}: ${errorMessage}`);
                });
            } else {
                return response.json().then((json) => {
                    if (json.error_code === 0) {
                        // Successfully processed, show the image
                        const resultImage = document.getElementById('resultImage');
                        resultImage.src = json.data.image_url;
                        resultImage.style.display = 'block';
                    } else {
                        // Handle API-specific errors
                        console.error('API Error response:', json);
                        alert(`API Error: ${json.error_detail.message || 'Unknown error occurred'}`);
                        throw new Error(`API Error: ${JSON.stringify(json)}`);
                    }
                });
            }
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
