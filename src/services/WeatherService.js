class WeatherService {
    _apiCitylocation = 'http://api.openweathermap.org/geo/1.0/direct?q=Moscow&limit=1&';
    _apiKey = 'appid=1781c3a2aa1cc915770dad5e8ab7bdb0';
    _apiCityWeater = 'https://api.openweathermap.org/data/2.5/weather?';
    
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getCitylocation = async () => {
        const res = await this.getResource(`${this._apiCitylocation}${this._apiKey}`);
        return this._transformWeather(res[0]);
    }

    getCityWeater = async (lat, lon) => {
        const res = await this.getResource(`${this._apiCityWeater}lat=${lat}&lon=${lon}&${this._apiKey}&units=metric`);
        return res;
    } 

    _transformWeather = (city) => {
        return {
            lat: city.lat,
            lon: city.lon
        }
    }

}
export default WeatherService;