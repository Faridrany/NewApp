import * as storyAPI from "../../data/api.js"
import { ErrorMessageTemplate } from "../../templates.js";
import Camera from "../../utils/Camera.js";
import Map from "../../utils/Map.js";
import CreateStoryPresenter from "./createStory-presenter.js";

export default class CreateStoryPage {
    #presenter = null;
    #map = null;
    #camera = null;
    #storyImage = null;

    async render() {
        return `
            <div class="w-full px-4 md:px-8 lg:px-20 py-10 bg-gray-200 pt-30">
  <form id="create-story-form" class="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
    <h1 class="text-2xl font-semibold text-gray-900 border-b border-zinc-700 pb-3 mb-6">Apa nih cerita nya???</h1>

    <!-- Description -->
    <div>
      <label for="story-description" class="block mb-2 text-sm font-medium text-zinc-700">Description</label>
      <textarea id="story-description" name="story-description" placeholder="Once upon a time..." class="w-full p-4 bg-zinc-100 text-gray-800 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="8"></textarea>
    </div>

    <!-- Image Upload -->
    <div>
      <p class="text-zinc-700 font-medium">Image</p>
      <p class="text-sm text-zinc-500 mb-3">Upload image via folder or camera</p>
      <div class="flex flex-wrap gap-4">
        <label for="open-folder" class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Open Folder</label>
        <input type="file" id="open-folder" class="hidden" accept="image/*" />
        <button type="button" id="open-camera-btn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Open Camera</button>
      </div>

      <!-- Camera Preview -->
      <div id="camera-review-container" class="hidden mt-4 border border-zinc-300 rounded-lg p-4 bg-zinc-100">
        <video id="camera-review" class="rounded-md w-full max-h-80" autoplay></video>
        <button id="take-picture-btn" type="button" class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Take Picture</button>
      </div>

      <!-- Image Preview -->
      <canvas id="canvas" class="hidden mt-5"></canvas>
      <img id="image-preview" class="hidden mt-5 rounded-lg border border-zinc-300 max-h-64" />
    </div>

    <!-- Location -->
    <div>
      <label class="block mb-2 text-sm font-medium text-zinc-700">Location</label>
      <div id="story-location" class="rounded-lg overflow-hidden border border-zinc-300" style="height: 300px;"></div>
      <div class="mt-3 flex gap-2 items-center text-zinc-500">
        <svg width="20" viewBox="0 0 24 24" fill="#71717b"><path d="M12 3C16.1421 3 19.5 6.3579 19.5 10.5C19.5 16.5 12 21 12 21S4.5 16.5 4.5 10.5C4.5 6.3579 7.8579 3 12 3Z M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.8431 13.6569 7.5 12 7.5C10.3431 7.5 9 8.8431 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z"></path></svg>
        <input id="location-lat" type="text" class="input-control bg-zinc-100 text-gray-800 w-1/2 rounded px-3 py-2" disabled />
        <input id="location-lng" type="text" class="input-control bg-zinc-100 text-gray-800 w-1/2 rounded px-3 py-2" disabled />
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-between items-center pt-4 border-t border-zinc-300">
      <a href="#/" class="text-sm text-zinc-500 hover:text-gray-800 flex items-center gap-1">
        <svg fill="#71717b" height="16" viewBox="0 0 1024 1024"><path d="M222.9 580.1l301.4 328.5c24.4 28.7 20.8 71.7-7.9 96.1s-71.7 20.8-96.1-7.9L19.6 560a67.8 67.8 0 01-13.8-20A68 68 0 010 510.4a68.3 68.3 0 017.3-29.1 67.6 67.6 0 0110.1-13.7L430 21.1c25.6-27.6 68.7-29.2 96.3-3.7s29.2 68.7 3.7 96.3L224.1 443.8h730.5c37.6 0 68.2 30.5 68.2 68.2s-30.5 68.2-68.2 68.2H222.9z"></path></svg>
        <span>Back</span>
      </a>
      <div id="submit-button-container">
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <span>Buat cerita anda</span>
        </button>
      </div>
    </div>
  </form>
</div>

        `;
    }

    async afterRender() {
        this.#presenter = new CreateStoryPresenter({
            view: this,
            model: storyAPI,
        })
        await this.#setupMap();
        await this.#setupCamera();
        await this.#setupForm();
        this.#setupOpenFolder();
    }

    async #setupMap() {
        this.#map = new Map({
            containerId: document.getElementById('story-location'),
            lat: -0.5341981739396645,
            lng: 117.12302541745886,
            draggable: true,
        })

        await this.#map.mark({lat: -0.5341981739396645, lng: 117.12302541745886, option: {draggable: true}});
        this.#map.initEvent();
    }

    async #setupCamera() {
        document.getElementById('open-camera-btn').addEventListener('click',
            async () => {
                this.#camera = new Camera({
                    video: document.getElementById('camera-review'),
                    videoContainer: document.getElementById('camera-review-container'),
                    openButton: document.getElementById('open-camera-btn'),
                    canvas: document.getElementById('canvas'),
                    imagePreview: document.getElementById('image-preview'),
                });

                this.#camera.toggle();
            }
        );

        document.getElementById('take-picture-btn').addEventListener('click', async () => {
            this.#storyImage = await this.#camera.take();
        });
    }

    async #setupForm() {
        document.getElementById('create-story-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const storyDescription = document.getElementById('story-description').value;
            const lat = document.getElementById('location-lat').value;
            const lon = document.getElementById('location-lng').value;

            const data = new FormData();
            data.append("description", storyDescription);
            data.append("photo", this.#storyImage);
            data.append("lat", lat);
            data.append("lon", lon);

            this.#presenter.createStory(data);
        });
    }

    #setupOpenFolder() {
        const input = document.getElementById('open-folder');
        const preview = document.getElementById('image-preview');

        input.addEventListener('change', () => {
            this.#storyImage = input.files[0];

            if (preview.src) {
                URL.revokeObjectURL(preview.src);
            }

            preview.src = URL.createObjectURL(this.#storyImage);
            preview.style.display = "block";
        });
    }

    createdSuccessfully(message) {
        alert(message);


        location.hash = '/';
    }

    createFailed(message) {
        alert(message);
    }

    showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
        <svg class="animate-spin h-5 w-5 text-zinc-900" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-nowrap">Membuat...</p>
      </button>
    `;
  }

    hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
        <p class="text-nowrap">Buat cerita anda</p>
        
      </button>
    `;
  }

}