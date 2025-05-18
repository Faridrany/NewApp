import LoginPresenter from './login-presenter';
import * as StoryAPI from '../../../data/api';
import * as AuthModel from '../../../utils/auth';

export default class LoginPage {
  #presenter = null;

  render() {
    return `
      <section class="flex justify-center items-center min-h-screen px-4 bg-gray-200">
        <article class="px-8 py-10 bg-white rounded-2xl shadow-lg w-full max-w-md">
          <div class="flex justify-center items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-zinc-900">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a3 3 0 00-3-3H7.5a3 3 0 00-3 3v10.5a3 3 0 003 3H16.5a3 3 0 003-3V10.5M12 15v2m-6 4h12" />
            </svg>
          </div>
          <h1 class="text-center text-2xl font-bold text-zinc-900">Login</h1>
          <p class="text-center text-sm text-zinc-500 mt-1">Welcome back!</p>
          <p class="text-center text-sm text-zinc-500">Login to your account below</p>

          <form id="login-form" class="mt-7 flex flex-col gap-5">
            <div class="form-control">
              <label for="email-input" class="block mb-1 text-sm font-medium text-zinc-700">Email atau Username</label>
              <input
                id="email-input"
                class="input-control w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                type="text"
                name="email"
                placeholder="Masukkan email atau username Anda"
                required
              />
            </div>
            <div class="form-control">
              <label for="password-input" class="block mb-1 text-sm font-medium text-zinc-700">Password</label>
              <input
                id="password-input"
                class="input-control w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                type="password"
                name="password"
                placeholder="Masukkan password Anda"
                required
              />
            </div>

            <div class="flex justify-end">
              <a href="#/forgot-password" class="text-sm text-blue-500 hover:underline">Lupa password?</a>
            </div>

            <div class="mt-3" id="submit-button-container">
              <button
                id="login-button"
                class="w-full bg-[#2c3e50] text-white py-2 px-4 rounded-lg hover:bg-[#1e2a38] active:bg-[#1e2a38] transition-colors font-semibold"
                type="submit"
              >
                Login
              </button>
            </div>

            <p class="text-center text-sm text-zinc-600 mt-5">
              Don't have an account?
              <a href="#/register" class="text-blue-500 hover:underline">Sign up for free</a>
            </p>
          </form>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: StoryAPI,
      authModel: AuthModel,
    });

    this.#setupForm();
  }

  #setupForm() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        email: document.getElementById('email-input').value,
        password: document.getElementById('password-input').value,
      };

      await this.#presenter.getLogin(data);
    });
  }

  loginSuccessfully(message) {
    console.log(message);
    location.hash = '/';
  }

  loginFailed(message) {
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
      <button
        id="login-button"
        class="w-full bg-[#2c3e50] text-white py-2 px-4 rounded-lg hover:bg-[#1e2a38] active:bg-[#1e2a38] transition-colors font-semibold"
        type="submit"
      >
        Login
      </button>
    `;
  }
}
