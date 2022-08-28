import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css'
const modalRoot = document.querySelector("#modal-root")

class Modal extends Component {


componentDidMount(){

  document.addEventListener("keydown",this.closeModal)
  }


componentWillUnmount(){
  document.removeEventListener("keydown",this.closeModal)
}

  closeModal = ({target,currentTarget,code}) =>{
    if(target === currentTarget || code === "Escape"){
      this.props.closeModal()
    }
  }



  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.closeModal}>
        <div className={s.Modal}>
         {this.props.children}
        </div>
      </div>,modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onModalFunc: PropTypes.func.isRequired,
};


export default Modal
