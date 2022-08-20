import 'modern-normalize/modern-normalize.css';
import { Component } from 'react';
import { pixabayAPI } from '../services/api';
import { Modal, Button, Loader, ImageGallery, Searchbar } from '../components';

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

  count = 0;

  componentDidUpdate(_, prevState) {
    const { request, page } = this.state;
    if (prevState.request !== request || prevState.page !== page) {
      this.fetchPhotosGallary(request, page);
    }
    if (page > 1) {
      window.scrollBy({
        top: window.innerHeight - 140,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = query => {
    if (!query.trim() || this.state.request === query) return;
    this.setState({
      request: query,
      page: 1,
      items: [],
    });
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

      this.setState(({ items }) => ({
        items: [...items, ...hits],
        pages: total / totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { items, page, pages, isLoading, url, alt } = this.state;
    console.log('Render N=', ++this.count);
    return (
      <div className="app">
        {/* в инфо приходит наш стейт с формы после сабмита и записываеться в параметр дата */}
        <Searchbar catchSubmitInfo={this.handleFormSubmit} />
        {isLoading && <Loader />}

        <ImageGallery hits={items} onItemClick={this.openModal} />

        {pages > page && <Button onClick={this.handleLoadMore} />}

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
