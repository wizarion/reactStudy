import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './components/Autor'

class App extends Component {

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" >Codic</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Autor</h1>
            <h2>Gerenciamento de autores.</h2>
          </div>
          <AutorBox/>
        </div>
      </div>
    );
  }
}

export default App;