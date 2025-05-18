import RegisterPresenter from './register-presenter';
import * as StoryAPI from '../../../data/api';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <section class="flex justify-center items-center min-h-screen px-4 bg-gray-200">
        <div class="lg:bg-white lg:rounded-2xl px-8 py-10 shadow-lg" style="max-width: 500px; width: 100%;">

          <div class="flex justify-center items-center mb-4">
            <img src="/images/logo.png" width="75px">
          </div>
          <h1 class="text-center text-2xl font-bold text-zinc-900">Sign Up</h1>
          <p class="text-center text-sm text-zinc-500 mt-1">Enter your detail below to create your account and get started</p>

          <form id="register-form" class="mt-7 flex flex-col gap-5">
            <div class="form-control">
              <label for="name-input" class="block mb-1 text-sm font-medium text-zinc-700">Full Name</label>
              <input required id="name-input" type="text" name="name" class="input-control w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Enter your full name">
            </div>
            <div class="form-control">
              <label for="email-input" class="block mb-1 text-sm font-medium text-zinc-700">Email</label>
              <input required id="email-input" type="email" name="email" class="input-control w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Example: name@email.com">
            </div>
            <div class="form-control">
              <label for="password-input" class="block mb-1 text-sm font-medium text-zinc-700">Password</label>
              <input required id="password-input" type="password" name="password" class="input-control w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Enter new password">
            </div>

           <div class="mt-3" id="submit-button-container">
              <button
                id="regis-button"
                class="w-full bg-[#2c3e50] text-white py-2 px-4 rounded-lg hover:bg-[#1e2a38] active:bg-[#1e2a38] transition-colors font-semibold"
                type="submit"
              >
                Daftar akun
              </button>
            <p class="text-center text-sm text-zinc-600 mt-5">Already have an account? <a href="#/login" class="text-blue-500 hover:underline">Login</a></p>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: StoryAPI,
    });

    this.#setupForm();
  }

  #setupForm() {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        password: document.getElementById('password-input').value,
      };

      await this.#presenter.getRegistered(data);
    });
  }

  registeredSuccessfully(message) {
    console.log(message);
    location.hash = '/login';
  }

  registeredFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="w-full cursor-not-allowed bg-[#2c3e50] text-white py-2 px-4 rounded-lg">
        <svg class="mx-auto h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z"></path>
        </svg>
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
       id="regis-button"
        class="w-full bg-[#2c3e50] text-white py-2 px-4 rounded-lg hover:bg-[#1e2a38] active:bg-[#1e2a38] transition-colors font-semibold"
        type="submit"
      >
        Login
      </button>
    `;
  }
}
