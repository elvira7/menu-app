import React, {Component} from 'react';
import image from '../images/Salmon_Caramel.jpg';
import arrowDown from '../images/arrow-down.png';
import '../style/header.css';
import $ from 'jquery';

class Header extends Component{

  scrollToMenu() {
    var menuContainer = $("#menu-container");
    $('html,body').animate({scrollTop: menuContainer.offset().top},'slow');
  }

  render(){
    return(
      <div className="main-header">
        <img id="headerImg" src={image} className="img-fluid" alt="" />
        <div id="nameTxt">Brasserie Bloom</div>
        <img id="arrowDownImg" src={arrowDown} alt="" onClick={this.scrollToMenu} />
      </div>
    )

  }
}
export default Header;
