import React, {Component} from 'react';
import '../style/menu.css';
import iconPencil from '../images/icon-pencil.png';
import iconFlower from '../images/flower.png';

class Dish extends Component{
  render(){
    let categoryTitle = "";
    let categorySeparator = "";
    if (this.props.showCategory) {
      categoryTitle = <h2>{this.props.category}</h2>;
      if (this.props.index > 0) {
        categorySeparator = <img className="icon-flower mt-auto" src={iconFlower}/>;
      }
    }
    return(
      <article className="dish-article">
        {categorySeparator}
        {categoryTitle}
        <h4>
          {this.props.title}
          <img className="edit-icon" src={iconPencil} alt="edit" onClick={() => this.props.loadDishIntoForm(this.props.id)}/>
        </h4>
        <p>{this.props.description}</p>
      </article>
    )
  }
}
export default Dish;
