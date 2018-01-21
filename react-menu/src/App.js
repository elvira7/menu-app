import React, { Component } from 'react';
import Header from './components/Header';
import Dishes from './components/Dishes';
import MenuAdmin from './components/MenuAdmin';
import Footer from './components/Footer';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes:[
        {
          title: "Title",
          description: "Description",
          category: "Category"
        }
      ],
      updateDish: {
        id: 0,
        title: "",
        description: "",
        category: ""
      },
      stateCls: ""
    }
  }
  getNewDishId() {
    if (this.state.dishes.length === 0) {
      return 0;
    }
    const idArray = this.state.dishes.map(dish => dish.id);
    return Math.max(...idArray) + 1;
  }
  saveDish(newDish){
    const _this = this;
    newDish.id = this.getNewDishId();
    $.ajax(
      {
        method: "POST",
        url: "http://localhost:5000/api/dishes",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(newDish)
      }
    )
    .done(function(result){
      let dishes = _this.state.dishes;
      dishes.unshift(newDish);
      _this.setState({dishes: _this.sortDishes(dishes)});
      _this.toggleStateCls("");
    })
    .fail(function(result){
      console.log(result);
    });
  }
  deleteDish(id){
    const _this = this;
    $.ajax(
        {
            method: "DELETE",
            url: "http://localhost:5000/api/dishes/" + id
        }
    )
    .done(function(result){
      let dishes = _this.state.dishes;
      const dishIndex = dishes.findIndex((dish) => dish.id === id);
      if (dishIndex > -1) {
        dishes.splice(dishIndex, 1);
      }
      _this.setState({dishes: dishes});
      _this.toggleStateCls("");
    })
    .fail(function(result){
      console.log(result);
      console.log("Failed to delete dish");
    });
  }
  putDish(dishToUpdate){
    const _this = this;
    $.ajax(
        {
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:5000/api/dishes",
            data: JSON.stringify(dishToUpdate)
        }
    )
    .done(function(result){
      let dishes = _this.state.dishes;
      const dishIndex = dishes.findIndex((dish) => dish.id === dishToUpdate.id);
      dishes.splice(dishIndex, 1, dishToUpdate);
      _this.setState({dishes: _this.sortDishes(dishes)});
      _this.toggleStateCls("");
    })
    .fail(function(result){
      console.log(result);
      console.log("Failed to update dish");
    });
  }

  loadDishIntoForm(id) {
    const dish = this.state.dishes.filter(dish => {
      return dish.id === id;
    });

    this.setState({
      updateDish: dish[0],
      stateCls: 'update'
    });
  }

  toggleStateCls(stateCls) {
    this.setState({
      stateCls: stateCls
    });
  }

  render(){
    return(
      <div id="main-container" className={this.state.stateCls}>
        <Header />
        <div className="row">
        <Dishes
                dishes = {this.state.dishes}
                loadDishIntoForm = {this.loadDishIntoForm.bind(this)}
                toggleStateCls = {this.toggleStateCls.bind(this)}
        />
        <MenuAdmin saveDish = {this.saveDish.bind(this)}
                  deleteDish={this.deleteDish.bind(this)}
                  putDish={this.putDish.bind(this)}
                  updateDish={this.state.updateDish}
        />
        </div>
        <Footer />
      </div>
    );
  }

  sortDishes(dishes) {
    return dishes.sort((dish1, dish2) => {
      if (dish1.category > dish2.category) {
        return -1;
      }
      if (dish1.category < dish2.category) {
        return 1;
      }
      return 0;
    });
  }

  componentDidMount(){
    const _this = this;
    $.ajax(
      {
        method: "GET",
        dataType: "json",
        url: "http://localhost:5000/api/dishes"
      }
    )
    .done(function(result){
      console.log(result);
      console.log("Done");
      _this.setState({dishes: _this.sortDishes(result.dishes.dish)});
    })
    .fail(function(result){
      console.log(result);
      console.log("Fail");
    });
  }
}

export default App;
