
import PropTypes from 'prop-types';
import s from './searchbar.module.css'
import {ImSearch} from 'react-icons/im'
import { Component } from 'react';


class Searchbar extends Component {

state = {
  imageName: '',
}

handleNameChange = e =>{
this.setState({imageName : e.target.value.toLowerCase()})
}

handleSubmit = e =>{
  e.preventDefault()
  if(!this.state.imageName.trim()){
   return alert("Введите запрос")

  }

  this.props.onSubmit(this.state.imageName)
  this.setState({imageName: ''})
}

  render () {
    return(

      <header className={s.searchbar}>
      <form className={s.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <ImSearch/>
        </button>

        <input
          className={s.SearchForm__input}
          name = 'imageName'
          value = {this.state.imageName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange = {this.handleNameChange}
        />
      </form>
    </header>



    )
  }
}


Searchbar.propTypes = {
 onSubmit: PropTypes.func,
};




export default Searchbar


