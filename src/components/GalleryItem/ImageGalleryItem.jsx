import s from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

function ImageGalleryItem ({id,src,modalSrc,onClick}) {
  return(
  <li onClick={()=>onClick({modalSrc})} className={s.ImageGalleryItem} key={id} >
  <img className={s.ImageGalleryItem_image} src={src} alt="photos" />
</li>
  )
}

ImageGalleryItem.propTypes = {
  id:PropTypes.number.isRequired,
  src:PropTypes.string.isRequired,
  modalSrc:PropTypes.string.isRequired,
  
};

export default ImageGalleryItem
