import { getAllStories, saveStory } from '../../utils/db.js';

export default class HomePresenter {
    #model;
    #view;

    constructor({ view, model }) {
        this.#model = model;
        this.#view = view;
    }

    async showStoryList() {
        this.#view.showLoading();
        try {
            let stories;
            if (navigator.onLine) {
                const response = await this.#model.getData();
                if (!response.ok) {
                    console.error(`Error fetching data: ${response}`);
                    // fallback to cache
                    stories = await getAllStories();
                } else {
                    stories = response.listStory;
                    // cache each story
                    for (const story of stories) {
                        await saveStory(story);
                    }
                }
            } else {
                // offline: load from IndexedDB
                stories = await getAllStories();
            }
            this.#view.populateStoryList(stories);
        } catch (error) {
            console.error(`Error : ${error}`);
            // fallback to cache on error
            const cached = await getAllStories();
            this.#view.populateStoryList(cached);
        } finally {
            this.#view.hideLoading();
        }
    }

    async showMapMarker() {
        this.#view.showMapLoading();
        try {
            const response = await this.#model.getData();
            if (!response.ok) {
                console.error(`Error fetching map data: ${response}`);
                return;
            }

            const list = response.listStory;
            // Center map on first story or default
            const defaultLat = list.length ? list[0].lat : 0;
            const defaultLon = list.length ? list[0].lon : 0;

            await this.#view.populateMapMarker(defaultLat, defaultLon, list);
        } catch (error) {
            console.error(`Error : ${error}`);
        } finally {
            this.#view.hideMapLoading();
        }

    }
}
