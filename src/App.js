import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Kiev", zip: "03134" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

class App extends Component {
  state = {
    weatherData: null,
    input: ''
  };

  handleCity = (e) =>{
    e.preventDefault();
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + this.state.input + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  handleChange = (e) =>{
    this.setState({ input: e.target.value });
  }
  render() {
    const weatherData = this.state.weatherData;
    console.log(weatherData);
    const content = weatherData ?
    <div className="weatherData">
      <div>
        <span>Weather in {weatherData.name} is {weatherData.weather[0].main}</span><img src={"http://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png"} />
      </div>
      <div>Temperature: {weatherData.main.temp}&deg;C</div>
      <p>Wind-direction: {weatherData.wind.deg}&deg;</p>
      <p>Wind-speed: {weatherData.wind.speed}m/s</p>
    </div>
    : <span></span>;
    return (
      <div className="App">
        <h1>Where to go</h1>
        <div className="m-auto container">
          <form onSubmit={this.handleCity}>
            <div className="input-group">
              <input id="er" type="text" placeholder="Enter city" onChange={this.handleChange} className="form-control"/>
              <div className="input-group-append">
                <label htmlFor="er" className="input-group-text" onClick={this.handleCity}>Show</label>
              </div>
            </div>
          </form>
          {content}
        </div>
      </div>
    );
  }
}

export default App;
