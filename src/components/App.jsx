import {useState,useEffect} from 'react';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery';
import Btn from './Btn/Btn';
import Modal from './Modal/Modal';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

const App = () =>{
  const [imageName, setImageName] = useState('');
  const [images,setImages] = useState([]);
  const [page,setPage] = useState(0);
  const [totalHits, setTotalHits] = useState(1)
  const [loading,setLoading] = useState(false);
  const [showModal,setShowModal] = useState(false)
  const [modalContent,setModalContent] = useState('')



useEffect(() => {
  if(!imageName){
    return
  }
  setLoading(true)

  axios
    .get(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=29503826-8199b1172087c43264700da9d&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(({ data }) => {
      setImages(data.hits)
      setTotalHits(data.totalHits)

    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, [imageName])

useEffect(() => {
  if(page <= 1){
    return
  }
  axios
  .get(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=29503826-8199b1172087c43264700da9d&image_type=photo&orientation=horizontal&per_page=12`
  )
  .then(({ data }) => {
    setImages([...images,...data.hits])
    setTotalHits(data.totalHits)

  })
  .catch(error => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page])

 const handleSearchFormSubmit = imageName => {
    setImageName( imageName );
    setPage(1);
    setImages([])

};

  const loadmore = () => {
setPage (page => page + 1)
};

  const openModal = modalContent => {

  setShowModal(true)
  setModalContent(modalContent)

};

  const closeModalApp = () => {
  setShowModal(false)

};


return(
  <>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        {loading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {totalHits === 0 && <h1>Ничего не найдено</h1>}
        <ImageGallery images={images} onClick={openModal}/>
        {images.length > 0 &&
          images.length < totalHits && (
            <Btn onClick={loadmore} />
          )}
          {showModal && (
          <Modal closeModalApp={closeModalApp}>
            <img src={modalContent.modalSrc} alt="reqPhoto" />
          </Modal>
        )}
      </>
)




}
export default App;
