export default class Camera {
    #video = null;
    #videoContainer = null;
    #openButton = null;
    #canvas = null;
    #imagePreview = null;

    constructor({ video, videoContainer, openButton, canvas, imagePreview }) {
        this.#video = video;
        this.#openButton = openButton;
        this.#videoContainer = videoContainer;
        this.#canvas = canvas;
        this.#imagePreview = imagePreview;
    }

    async toggle() {
        if (!window.stream) {
            try {
                window.stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.#video.srcObject = window.stream;
                this.#videoContainer.style.display = 'block';
                this.#openButton.textContent = 'Close Camera';
            } catch (e) {
                console.log(`Camera : ${e.message}`);
            }
        } else {
            window.stream.getTracks().forEach(track => track.stop());
            this.#video.srcObject = null;
            this.#videoContainer.style.display = 'none';
            this.#openButton.textContent = 'Open Camera';

            window.stream = null;
        }
    }

    async take() {
        const context = this.#canvas.getContext('2d');
        this.#canvas.width = this.#video.videoWidth;
        this.#canvas.height = this.#video.videoHeight;

        context.drawImage(this.#video, 0, 0, this.#video.videoWidth, this.#video.videoHeight);

        return new Promise((resolve) => {
            this.#canvas.toBlob((blob) => {
                if (blob) {
                    this.#imagePreview.src = URL.createObjectURL(blob);
                    this.#imagePreview.alt = 'image-preview';
                    this.#imagePreview.style.display = "block";

                    const file = new File([blob], 'image.jpg', { type: 'image/png' });
                    resolve(file);
                } else {
                    resolve(null);
                }
            }, "image/png");
        })

    }
}