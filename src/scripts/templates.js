import { showFormattedDate } from "./utils";

export function LoadingTemplate() {
  return `
  <div class="min-h-screen flex items-center justify-center bg-black">
  <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <circle class="pl__ring ring-a" cx="120" cy="120" r="105" />
    <circle class="pl__ring ring-b" cx="120" cy="120" r="35" />
    <circle class="pl__ring ring-c" cx="85" cy="120" r="70" />
    <circle class="pl__ring ring-d" cx="155" cy="120" r="70" />
  </svg>
    `
}

export function ErrorMessageTemplate(message) {
  return `
    <div
  id="message"
  class="fixed z-50 bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-red-600 text-white rounded-lg shadow-lg p-4 flex justify-between items-center transition-all duration-300"
>
  <div class="flex gap-2 items-start">
    <svg width="20" viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <path d="...svg path..." fill="#fff" />
    </svg>
    <p id="response-message" class="text-sm font-medium">${message}</p>
  </div>

  <button id="close-message" class="text-white hover:text-red-200 transition">
    <svg width="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="4" y1="4" x2="12" y2="12"/>
      <line x1="12" y1="4" x2="4" y2="12"/>
    </svg>
  </button>
</div>

    `
}

export function SuccessMessageTemplate(message) {
  return `
    <div
      class="fixed z-10 md:max-w-[300px] bg-green-800 text-green-200 rounded bottom-1 left-1 right-1 text-sm py-3 pl-5 pr-2 flex justify-between items-center"
    >
      <div class="flex gap-2">
        <svg
          fill="#b9f8cf"
          width="16"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xml:space="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <g>
                  <path
                    d="M437.016,74.984c-99.979-99.979-262.075-99.979-362.033,0.002c-99.978,99.978-99.978,262.073,0.004,362.031 c99.954,99.978,262.05,99.978,362.029-0.002C536.995,337.059,536.995,174.964,437.016,74.984z M406.848,406.844 c-83.318,83.318-218.396,83.318-301.691,0.004c-83.318-83.299-83.318-218.377-0.002-301.693 c83.297-83.317,218.375-83.317,301.691,0S490.162,323.549,406.848,406.844z"
                  ></path>
                  <path
                    d="M368.911,155.586L234.663,289.834l-70.248-70.248c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17 l85.333,85.333c8.331,8.331,21.839,8.331,30.17,0l149.333-149.333c8.331-8.331,8.331-21.839,0-30.17 S377.242,147.255,368.911,155.586z"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <p id="response-message">${message}</p>
      </div>

      <svg
        width="20"
        fill="#b9f8cf"
        viewBox="-3.04 -3.04 25.08 25.08"
        xmlns="http://www.w3.org/2000/svg"
        class="cf-icon-svg"
        stroke="#b9f8cf"
        transform="matrix(1, 0, 0, 1, 0, 0)"
        stroke-width="0.00019"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
          ></path>
        </g>
      </svg>
    </div>
 `;
}

export function generateStoryItemTemplate({
  id, name, description, photoUrl, createdAt, order
}) {
  return `

    <div id="first-main-content-item" tabindex="${order}" class="border  border-zinc-900 rounded overflow-hidden"
      data-bs-id="${id}">
      <div class="h-[250px] overflow-hidden brightness-[90%]">
        <img src="${photoUrl}" alt="storyImage" loading="lazy" class="w-full h-full object-cover hover:scale-105 duration-300 transition ease-in-out" />
      </div>

      <div class="flex flex-col p-3">
        <h1 class="line-clamp-2 text-zinc-200 xl:text-lg mt-3">${name}</h1>
        <div class="flex gap-1">
        <svg viewBox="0 0 24 24" fill="#71717b" width="16" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> <path d="M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          

          <p class="text-sm mt-1 line-clamp-1">${showFormattedDate(createdAt)}</p>
        </div>
        <p class="text-zinc-400 mt-1 line-clamp-[8]">
          ${description}
        </p>
      </div>
    </div>
    
    `;
}

export function emptyDataTemplate() {
  return `
  <h2 class="text-2xl font-bold text-center mt-8">No data</h2>
  `
}