export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function stopAllStreams() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => track.stop());
    window.stream = null;
  }
}

export function formDataToJson(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    if (value instanceof File) {
      obj[key] = value.name;
    } else {
      obj[key] = value;
    }
  });
  return JSON.stringify(obj);
}


