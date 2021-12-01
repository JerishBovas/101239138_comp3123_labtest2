import React from 'react';
import axios from 'axios';

export default class Weather extends React.Component {
  state = {
    WeatherData: {
        "coord": {},
        "weather": [{}],
        "main": {},
        "wind": {},
        "sys": {},
        "name": ""
    },
    time: ""
  }

  componentDidMount() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=affd0627e677b629d379eb014262f11c`)
      .then(res => {
        this.setState({WeatherData: res.data});
      })
    let today = new Date();
    let tme = today.getUTCHours() + ':' + today.getUTCMinutes()+ " UTC";
    this.setState({time: tme})
  }

  render() {
    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>{this.state.WeatherData.name + ", " + this.state.WeatherData.sys.country}</h3>
                    <p>{"As of "+this.state.time}</p>
                </div>
                <div class="col">
                    <p>{this.state.WeatherData.coord.lat +", "+this.state.WeatherData.coord.lon}</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h1>{Math.round(this.state.WeatherData.main.temp-273.15)+"°"}</h1>
                    <p>{"Feels like "+Math.round(this.state.WeatherData.main.feels_like-273.15)+"°"}</p>
                </div>
                <div class="col">
                    <img src={"https://openweathermap.org/img/wn/"+this.state.WeatherData.weather[0].icon+"@2x.png"}></img>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h2>{this.state.WeatherData.weather[0].description}</h2>
                </div>
                <div class="col">
                    <p>{Math.round(this.state.WeatherData.main.temp_min-273.15)+"°/ "+Math.round(this.state.WeatherData.main.temp_max-273.15)+"°"}</p>
                </div>
            </div>
        </div>
    )
  }
}