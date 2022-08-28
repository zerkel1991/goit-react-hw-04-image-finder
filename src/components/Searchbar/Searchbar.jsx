import PropTypes from 'prop-types';
import s from './Searchbar.module.css'
import {ImSearch} from 'react-icons/im'
import { useState } from 'react';

const Searchbar = ({onSubmit}) =>{

const [imageName, setImageName] = useState('');

const handleNameChange = e =>{
  setImageName(e.target.value)
  }

 const handleSubmit = e =>{
    e.preventDefault()
    if(!imageName.trim()){
     return alert("Введите запрос")

    }

    onSubmit(imageName)
    setImageName("")
  }


  return(
  <header className={s.searchbar}>
  <form className={s.SearchForm} onSubmit={handleSubmit}>
    <button type="submit" className={s.SearchForm__button}>
      <ImSearch/>
    </button>

    <input
      className={s.SearchForm__input}
      name = 'imageName'
      value = {imageName}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange = {handleNameChange}
    />
  </form>
</header>

)

}



Searchbar.propTypes = {
  onSubmit: PropTypes.func,
 };


export default Searchbar
