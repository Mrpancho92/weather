import {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import Container from 'react-bootstrap/Container'
import WeatherService from './services/WeatherService';
import './App.css';

class Form extends Component {
    state = {
        lat: null /* 55.7504461 */,
        lon: null /* 37.6174943 */,
        temp: null,
        feels_like: null,
        temp_min: null,
        temp_max: null,
        pressure: null,
        humidity: null,
        grnd_level: null,
        visibility: null,
        wind_speed: null,
        clouds_all: null,

    }
    weatherservice = new WeatherService();

    componentDidMount() {
        this.onRequest();
    }

    onRequestButton = () => {
       this.onRequest2();
    } 

    onRequest = () => {        
    this.weatherservice.getCitylocation()
                .then(this.onCharListLoaded)
                .catch('this.onError');  
    }
 
    onCharListLoaded = (cityLocation) => {
        this.setState({
             lat: cityLocation.lat,
             lon: cityLocation.lon
        }); 
    }

    onRequest2 = () => {    
         if (this.state.lat === null || this.state.lon === null ) return   
        this.weatherservice.getCityWeater(this.state.lat, this.state.lon)
        .then(this.onCharListLoaded2)
        .catch('this.onError2');  
        }

     onCharListLoaded2 = (cityWeater) => {
        this.setState({
            temp: cityWeater.main.temp.toFixed(1),
            feels_like: cityWeater.main.feels_like.toFixed(1),
            temp_min: cityWeater.main.temp_min.toFixed(1),
            temp_max: cityWeater.main.temp_max.toFixed(1),
            pressure: (cityWeater.main.pressure * 0.750064).toFixed(1),
            humidity: cityWeater.main.humidity.toFixed(1),
            grnd_level: (cityWeater.main.grnd_level * 0.750064).toFixed(1),
            visibility: cityWeater.visibility.toFixed(1),
            wind_speed: cityWeater.wind.speed.toFixed(1),
            clouds_all: cityWeater.clouds.all
       });  
        } 
    
    render() {
        return (
            <Container className="position-relative">
                <div className="w-50 mt-1 p-1 m-auto fw-bold">В Москве:</div>

                <div className="w-50 border mt-1 p-1 m-auto">Температура воздуха:    
                <span className="fw-bold"> {this.state.temp}</span> °С</div>

                <div className="w-50 border mt-1 p-1 m-auto">Температура воздуха по ощущению: 
                <span className="fw-bold"> {this.state.feels_like}</span> °С</div>

                <div className="w-50 border mt-1 p-1 m-auto">Температура воздуха min: 
                <span className="fw-bold"> {this.state.temp_min}</span> °С</div>

                <div className="w-50 border mt-1 p-1 m-auto">Температура воздуха max: 
                <span className="fw-bold"> {this.state.temp_max}</span> °С</div>

                <div className="w-50 border mt-1 p-1 m-auto">Атмосферное давление на уровне моря: 
                <span className="fw-bold"> {this.state.pressure}</span> мм.рт.ст</div>

                <div className="w-50 border mt-1 p-1 m-auto">Влажность: 
                <span className="fw-bold"> {this.state.humidity}</span>  %</div>

                <div className="w-50 border mt-1 p-1 m-auto">Атмосферное давление на уровне земли: 
                <span className="fw-bold"> {this.state.grnd_level}</span> мм.рт.ст</div>

                <div className="w-50 border mt-1 p-1 m-auto">Видимость: 
                <span className="fw-bold"> {this.state.visibility}</span> м</div>

                <div className="w-50 border mt-1 p-1 m-auto">Скорость ветра: 
                <span className="fw-bold"> {this.state.wind_speed}</span> м/c</div>

                <div className="w-50 border mt-1 p-1 m-auto">Облачность: 
                <span className="fw-bold"> {this.state.clouds_all}</span> %</div>

                <button type="button" className="border mt-4 position-absolute top-30 start-50 translate-middle"
                    // className="button button__main button__long"
                    // disabled={newItemLoading}
                    // style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={this.onRequestButton}>
                    <div>load weather</div>
                </button>
            </Container>
        )
    }
}

function App() {
  return (
    <Form/>
);
}

export default App;
