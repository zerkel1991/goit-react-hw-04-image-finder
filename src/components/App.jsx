import React from 'react';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Btn from './button/Btn';
import Modal from './Modal/Modal';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    totalhits: 1,
    loading: false,
    showModal: false,
    modalContent: ' ',
  };
  componentDidUpdate(_, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ loading: true,page : 1});
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.imageName}&page=${this.state.page}&key=29503826-8199b1172087c43264700da9d&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          this.setState(() => ({
            images: [...data.hits],
            totalhits: data.totalHits,
            page : 1,
          }));
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false,}));
    }
     if (prevState.page !== this.state.page && this.state.page !== 1) {
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.imageName}&page=${this.state.page}&key=29503826-8199b1172087c43264700da9d&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          this.setState(({ images }) => ({
            images: [...images, ...data.hits],
            totalhits: data.totalHits,
          }));
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false,}));
    }
  }
  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });
    this.setState({page : 1})
  };

  loadmore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  openModal = modalContent => {
    this.setState({
      showModal: true,
      modalContent,
    });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {this.state.loading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {this.state.totalhits === 0 && <h1>Ничего не найдено</h1>}
        <ImageGallery images={this.state.images} onClick={this.openModal} />
        {this.state.images.length > 0 &&
          this.state.images.length < this.state.totalhits && (
            <Btn onClick={this.loadmore} />
          )}

        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.modalContent.modalSrc} alt="reqPhoto" />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
