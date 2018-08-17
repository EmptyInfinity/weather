import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

class App extends Component {
  state = {
    weatherData: null,
    input: '',
    warning: false,
    time:  1
  };

  handleCity = (e) =>{
    e.preventDefault();
    const link = "https://api.openweathermap.org/data/2.5/weather?q=" + this.state.input + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(link).then(res => res.json()).then(json => {
      if (json.name == undefined){
        this.setState({ warning: true });
        return;
      };
      this.setState({
        weatherData: json,
        warning: false
       });
    });
  }
  handleChange = (e) =>{
    this.setState({ input: e.target.value });
  }
  componentDidmount(){
    console.log(this.state.time);
  }
  render() {
    const weatherData = this.state.weatherData;
    const content = weatherData ?
    <div className="weatherData">
      <img src="therm.png" alt="thermometer icon" id="therm"/>
      <div>
        <div>
          <span>Its {weatherData.weather[0].main} in {weatherData.name}</span><img alt="weather icon" src={"http://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png"} />
        </div>
        <p className="fixMarg">Temperature: {weatherData.main.temp}&deg;C</p>
        <p>Wind-direction: {weatherData.wind.deg}&deg;</p>
        <p>Wind-speed: {weatherData.wind.speed} m/s</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
      </div>
    </div>
    : <span></span>;
    let div = '';
    if( weatherData  ){
      if( weatherData.main.temp >= 25){
        div =
        <div className="fire animal">
          <img src='fire_ex.png' alt="Fire" className="weatherTempImg" />
          <div className="before"></div>
          <h2>so hot</h2>
        </div>;
      } else if (weatherData.main.temp < 5 ){
        div =
        <div className="animal">
          <img src='Penguin2.png' alt="Penguin" className="weatherTempImg" />
          <div className="before"></div>
          <h2>so cold</h2>
        </div>;
      } else{
        div =
        <div className="perfect animal">
          <img src='rac.png' alt="Raccoon" className="weatherTempImg" />
          <div className="before"></div>
          <h2>perfect</h2>
        </div>;
      }
    };
    const bottomImg = weatherData ? div : <span></span>;
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
          <div>{this.state.warning == true ? <div className="alert alert-danger"> City not found. Try another!</div> : <span></span>}</div>
          {content}
        </div>
        {bottomImg}
      </div>
    );
  }
}

export default App;
