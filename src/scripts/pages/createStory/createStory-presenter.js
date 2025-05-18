export default class CreateStoryPresenter {
    #model;
    #view;

    constructor({ view, model }) {
        this.#model = model;
        this.#view = view;
    }

    async createStory(data) {
        this.#view.showSubmitLoadingButton();
        try {
            const response = await this.#model.postStory(data)
            if (!response.ok) {
                this.#view.createFailed(response.message);
                return;
            }

            this.#view.createdSuccessfully(response.message);
        } catch (error) {
            this.#view.createFailed(error);
            console.log(error);
        } finally {
            this.#view.hideSubmitLoadingButton();
        }
    }

}