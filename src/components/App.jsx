import 'modern-normalize/modern-normalize.css';
import { Component } from 'react';
import { pixabayAPI } from '../services/api';
import {
  Modal,
  Button,
  Loader,
  ImageGalleryItem,
  ImageGallery,
  Searchbar,
} from '../components';

class App extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    pages: 0,
    request: null,
    url: '',
    alt: '',
  };

  componentDidUpdate(_, prevState) {
    const { request, page } = this.state;

    if (
      (request !== null && prevState.request !== request) ||
      prevState.page !== page
    ) {
      this.fetchPhotosGallary(request, page);
    }
  }

  handleFormSubmit = query => {
    this.setState({
      request: query,
      page: 1,
      items: [],
    });
    // console.log('query: ', query);
  };
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (url, alt) => {
    this.setState({
      url: url,
      alt: alt,
    });
  };
  closeModal = () => {
    this.setState({
      url: '',
      alt: '',
    });
  };

  fetchPhotosGallary = async (request, page) => {
    this.setState({
      isLoading: true,
    });

    try {
      const { total, totalHits, hits } = await pixabayAPI.getGallary(
        request,
        page
      );

      this.setState(({ items, pages }) => {
        return {
          items: [...items, ...hits],
          pages: (pages = total / totalHits),
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { items, pages, isLoading, url, alt } = this.state;

    // console.log('page: ', pages);
    // console.log('items: ', items);
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {/* в инфо приходит наш стейт с формы после сабмита и записываеться в параметр дата */}
        <Searchbar catchSubmitInfo={this.handleFormSubmit} />
        {isLoading && <Loader />}
        <ImageGallery hits={items} onItemClick={this.openModal}>
          <ImageGalleryItem />
        </ImageGallery>
        <Button onClick={this.handleLoadMore} pages={pages} />
        {url && (
          <Modal onClose={this.closeModal}>
            <img src={url} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}
export default App;
