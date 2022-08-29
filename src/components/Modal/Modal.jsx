import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css'
const modalRoot = document.querySelector("#modal-root")



const Modal = ({children,closeModalApp}) => {

  const closeModal = ({target,currentTarget,code}) =>{
    if(target === currentTarget || code === "Escape"){
      closeModalApp()
    }
  }

  useEffect(() => {
    const closeByEsc= e => {
      if (e.code !== 'Escape') {
        return;
      }
      closeModalApp()
    };

    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModalApp]);




  return createPortal(
    <div onClick={closeModal} className={s.Overlay} >
      <div className={s.Modal}>
       {children}
      </div>
    </div>,modalRoot
  );


}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModalApp:PropTypes.func.isRequired
};


export default Modal
