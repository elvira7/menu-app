import React, {Component} from 'react';
import Dish from './Dish';
import '../style/menu.css';

class Dishes extends Component{

  render(){
    let category = "";
    let dishArticles = this.props.dishes.map(
      (dish, i) => {
        const showCategory = (dish.category !== category);
        category = dish.category;
      return(
        <Dish
          loadDishIntoForm={this.props.loadDishIntoForm}
          key={"r-" + i}
          index={i}
          id={dish.id}
          category={dish.category}
          title={dish.title}
          description={dish.description}
          showCategory={showCategory}
        />
      )
    }

    );

    return(
      <section id="menu-container" className="text-center col">
        <div id="menuFrame">
        <div id="menuTxt"><h1 className="font-weight-bold">MENU</h1></div>
        {dishArticles}
        </div>
        <button className="btn btn-outline-primary" onClick={() => this.props.toggleStateCls('add')}>Add new</button>
      </section>
    )
  }
}
export default Dishes;
