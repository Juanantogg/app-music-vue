import config from './config';
const API_KEY = config.apiKey;
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:contry&api_key=${API_KEY}&format=json`

export default function getArtists (contry) {
  const url = URL.replace(':contry', contry)
  return fetch(url)
    .then(res => res.json())
    .then(json => json.topartists.artist)
}
