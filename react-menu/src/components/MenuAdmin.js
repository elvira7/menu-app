import React, {Component} from 'react';
import '../style/menu-admin.css';

class MenuAdmin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      updateDish: this.props.updateDish
    };
    this.handleChange = this.handleChange.bind(this);
  }
  updateDish(event) {
    this.saveDish(event, this.state.updateDish.id);
  }
  saveDish(event, id){
    const title = event.target.title.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    let dish = {
      title: title,
      description: description,
      category: category
    };
    if (id) { // Update existing dish
      dish.id = id;
      this.props.putDish(dish);
    }
    else {    // Add new dish
      this.props.saveDish(dish);
    }
    event.preventDefault();
  }
  deleteDish(event){
    this.props.deleteDish(this.props.updateDish.id);
    event.preventDefault();
  }

  handleChange(event) {
    let updateDish = this.state.updateDish;
    updateDish[event.target.name] = event.target.value;
    this.setState({updateDish: updateDish});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({updateDish: nextProps.updateDish});
  }
  render(){
    return(
      <div id="admin-container" className="text-center col">
      <form id="update-form-container" onSubmit={this.updateDish.bind(this)}>
        <h3>Update dish</h3>
        <div className="form-group col-md-12">
          <input type="text" required className="form-control" placeholder="Title" name="title" value={this.state.updateDish.title} onChange={this.handleChange}/>
        </div>
        <div className="form-group col-12">
          <textarea type="text" required className="form-control" rows="5" placeholder="Description" name="description" value={this.state.updateDish.description} onChange={this.handleChange}/>
        </div>
        <div className="form-group col-md-12">
        <select id="inputState" name="category" className="form-control" value={this.state.updateDish.category} onChange={this.handleChange}>
            <option value="Starters">Starters</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">Update</button>
        <button className="btn btn-outline-secondary" onClick={this.deleteDish.bind(this)}>Delete</button>
      </form>
      <form id="add-form-container" onSubmit={this.saveDish.bind(this)}>
        <h3>Add new dish</h3>
          <div className="form-group col-md-12">
            <input type="text" required className="form-control" id="inputTitle" placeholder="Title" name="title" />
          </div>
          <div className="form-group col-12">
            <textarea type="text" required className="form-control" id="inputDescription" rows="5" placeholder="Description" name="description"/>
          </div>
          <div className="form-group col-md-12">
            <select id="inputCategory" name="category" className="form-control">
              <option value="Starters">Starters</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>
          <button type="submit" className="btn btn-outline-primary">Submit</button>
      </form>
      </div>
    )
  }
}
export default MenuAdmin;
