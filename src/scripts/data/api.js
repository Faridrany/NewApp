import { BASE_URL } from '../config';
import { getAccessToken } from '../utils/auth';

const ENDPOINT = {
  // OpenStreetMap
  OPEN_STREET_MAP: (lat, lng) => `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,

  // Auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,

  // Story
  GET_ALL_STORY: `${BASE_URL}/stories`,
  ADD_STORY: `${BASE_URL}/stories`


}
export async function getAddress({ lat, lng }) {
  const fetchResponse = await fetch(ENDPOINT.OPEN_STREET_MAP(lat, lng));
  const json = await fetchResponse.json();

  if(json.display_name){
    return {
      address: json.display_name,
      ok: fetchResponse.ok,
    }
  }else{
    return {
      address: "Address is not found",
      ok: fetchResponse.ok,
    }
  }
  
}

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINT.REGISTER, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: data,
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  }
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });
  const fetchResponse = await fetch(ENDPOINT.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getData() {
  const accessToken = getAccessToken();
  const fetchResponse = await fetch(ENDPOINT.GET_ALL_STORY, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function postStory(data) {
  const accessToken = getAccessToken();
  const fetchResponse = await fetch(ENDPOINT.ADD_STORY, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok
  }
}