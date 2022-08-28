import ImageGalleryItem from 'components/GalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';

function ImageGallery({ images,onClick}) {
  return (
    <ul className={s.imageGallery}>
      {images.map(el => {
        return <ImageGalleryItem onClick={onClick}  key={nanoid()} id = {el.id} src={el.webformatURL} modalSrc={el.largeImageURL}/>;
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired
  })).isRequired,
  onClick: PropTypes.func.isRequired,

};


export default ImageGallery;
