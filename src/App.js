import {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import Container from 'react-bootstrap/Container'
import WeatherService from './services/WeatherService';
import './App.css';

class Form extends Component {
    state = {
        lat: null /* 55.7504461 */,
        lon: null /* 37.6174943 */,
        temp: null
    }
    weatherservice = new WeatherService();

    componentDidMount() {
        this.onRequest();
    }  

  /*   onRequestButton = () => {
        this.onRequest();
        this.onRequest();
    } */ 

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
        if (this.state.lat === null || this.state.lon === null ) return
        this.weatherservice.getCityWeater(this.state.lat, this.state.lon)
                .then(this.onCharListLoaded2)
                .catch('this.onError2');
    }

     onCharListLoaded2 = (cityWeater) => {
        this.setState({
            temp: cityWeater.main.temp.toFixed(1)
       });  
        } 
    
    render() {
        return (
            <Container className="position-relative">
                <div className="w-50 border mt-5 p-3 m-auto">В Москве {this.state.lat} °С</div>
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
