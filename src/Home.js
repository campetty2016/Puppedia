import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  componentDidMount() {

    // document.body.style.overflow = "hidden";
    
    let date = new Date(),
    num = date.getDay(),
    dogPic = document.getElementsByClassName('todaysDog')[0],
    image = '',
    breed = '';
    
    
    console.log('Num',num);
    
    switch(num) {
    
      case 0:
      image = 'https://goo.gl/images/ER8mWH';
      breed = "";

      break;

      case 1:
      image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      breed = "chihuahua";
      break;
      
      case 2:
      image = 'https://farm5.staticflickr.com/4112/5170590074_714d36db83_b.jpg';
      breed = "";

      break;
      
      case 3:
      image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      breed = "";

      break;
      
      case 4:
      // image =  'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      image = 'https://farm5.staticflickr.com/4112/5170590074_714d36db83_b.jpg';
      breed = "";

      
      break;
      
      case 5:
      image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      breed = "";


      break;
      
      case 6:
      // image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      image = 'https://farm5.staticflickr.com/4112/5170590074_714d36db83_b.jpg';
      breed = "";
      
      break;

      default: 
      break;
      
    }

    this.setState({name: breed.replace(/ /g, '_')});
    dogPic.style.backgroundImage = "url('" + image + "')";

  }

  render() {
    return (
      <div className="content">
        <h2>Dog of the Day</h2>

        <div className="breed"><h3>{this.state.name}</h3></div>
        <Link to={`/dogs/${this.state.name}`}><div className="todaysDog"></div></Link>
      </div>
    );
  }
}

export default Home;
