import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {

  constructor(props) {
    super(props);

    this.loadDogPic = this.loadDogPic.bind(this);
    this.loadInfo = this.loadInfo.bind(this);

  }

  componentDidMount() {

    document.body.style.overflow = "hidden";
    
    let date = new Date(),
    num = date.getDay(),
    dogPic = document.getElementsByClassName('todaysDog')[0],
    image = '';
    
    
    console.log('Num',num);
    
    switch(num) {
    
      case 0:
      image = 'https://goo.gl/images/ER8mWH';
      break;
      case 1:
      image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      
      break;
      
      case 2:
      image = 'https://farm5.staticflickr.com/4112/5170590074_714d36db83_b.jpg';
      break;
      
      case 3:
      image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      break;
      
      case 4:
      // image =  'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      image = 'https://farm5.staticflickr.com/4112/5170590074_714d36db83_b.jpg';
      
      break;
      
      case 5:
      image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';

      break;
      
      case 6:
      // image = 'https://farm7.staticflickr.com/6114/6342537513_5b6f4b0c09_b.jpg';
      image = 'https://farm5.staticflickr.com/4112/5170590074_714d36db83_b.jpg';
      
      
      break;

      default: 
      break;
      
    }
    
    dogPic.style.backgroundImage = "url('" + image + "')";

    
    
  }

  loadDogPic() {

    console.log('loaded');
  }

  loadInfo() {
  }

  render() {
    return (
      <div className="content">
        <h2>Dog of the Day</h2>
        <Link to="/dogs"><div className="todaysDog" onLoad={this.loadDogPic} onClick={this.loadInfo}></div></Link>
      </div>
    );
  }
}

export default Home;
