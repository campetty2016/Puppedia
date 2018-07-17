import React, { Component } from 'react';
import { Link, Route} from 'react-router-dom';

import './App.css';
import Home from './Home';
import About from './About';
import Dogs from './Dogs';
// import Search from './Search';

// console.log(Dogs);

// console.log(this.dogBreeds);

class App extends Component {

 
  hideNavBar() {
    // let navbar = document.getElementsByClassName('navbar-collapse')[0];  

    // // navbar.style.visibility = "hidden";
    // navbar.style.height = 0;
    // navbar.style.transition = "all 1s ease";
  }

  showNavBar() {
    // let navbar = document.getElementsByClassName('navbar-collapse')[0];  

    // // navbar.style.visibility = "visible";
    // navbar.style.height = "auto";
    // navbar.style.transition = "all 1s ease";    
  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="nameContainer">
                <a className="navbar-brand">Puppedia</a>
              </div>
              <button className="navbar-toggler" onClick={this.showNavBar} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/" onClick={this.hideNavBar}><i className="fa fa-home"></i> Home<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about" onClick={this.hideNavBar}><i className="fa fa-info-circle"></i> About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dogs" onClick={this.hideNavBar}><i className="fa fa-paw"></i> Dogs</Link>
                  </li>
                </ul>
              </div>
            </nav>
        </header>
        <Route exact={true} path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/dogs" component={Dogs} />
      </div>
    );
  }
}

export default App;
