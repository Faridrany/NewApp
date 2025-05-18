import HomePresenter from "./home-presenter";
import * as storyAPI from "../../data/api.js"
import { emptyDataTemplate, generateStoryItemTemplate, LoadingTemplate } from "../../templates.js";
import Map from "../../utils/Map.js";

export default class HomePage {
  #presenter = null;
  #map = null;
  async render() {
    return `
    <div class="min-h-screen bg-gray-200 pb-10 mt-20">
      
        <section class="container mx-auto mt-0 pt-20 px-4">
        <div id="map-container" style="height: 300px; z-index: 1; position:relative" class="rounded-lg overflow-hidden shadow-md bg-white"></div>
        <div id="map-loading-container"></div>
      </section>

      <section class="container mx-auto mt-8 px-4">
        <h1 class="lg:text-left mb-5 text-2xl font-semibold text-gray-800">Cerita hari ini</h1>
        <div id="story-list-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
        <div id="story-loading-container"></div>
      </section>
    </div>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: storyAPI
    })


    await this.#presenter.showStoryList();
    await this.#setupMap();
    await this.#presenter.showMapMarker();
  }

  async #setupMap() {
    this.#map = new Map({
      containerId: document.getElementById('map-container'),
      lat: -0.5341981739396645,
      lng: 117.12302541745886,
    }
    );
  }

  async populateMapMarker(lat, lng, storyList) {
    await this.#map.costumMark({ lat: lat, lng: lng }, storyList);
  }

  populateStoryList(data) {
    if (data.length <= 0) {
      this.emptyDataTemplate();
      return;
    }

    let n = 0;
    const html = data.reduce((accumulator, story) => {
      n = n + 1;
      return accumulator.concat(
        generateStoryItemTemplate({
          ...story,
          order: n,
        })
      )
    }, '');

    document.getElementById('story-list-container').innerHTML = html;
  }

  storyListEmpty() {
    document.getElementById('responsive').innerHTML = emptyDataTemplate();
  }
  showLoading() {
    document.getElementById('story-loading-container').innerHTML = LoadingTemplate();
  }

  hideLoading() {
    document.getElementById('story-loading-container').innerHTML = '';
  }

  showMapLoading() {
    document.getElementById('story-loading-container').innerHTML = LoadingTemplate();
  }

  hideMapLoading() {
    document.getElementById('story-loading-container').innerHTML = '';
  }
}