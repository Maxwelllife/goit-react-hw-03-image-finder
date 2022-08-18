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
    request: '',
  };
  // componentDidUpdate(_, prevState) {
  //   console.log('prevState.items: ', prevState.items);
  //   console.log('this.state.items', this.state.items);

  //   if (this.state.items !== prevState.items) {
  //     console.log('prevState.items: ', prevState.items);
  //     this.fetchPhotosGallary(this.state.page);
  //   }
  // }

  fetchPhotosGallary = async query => {
    this.setState({
      isLoading: true,
    });
    try {
      const gallary = await pixabayAPI.getGallary(
        // this.state.request,
        // this.state.page
        query
      );
      console.log('gallary: ', gallary);
      this.setState(({ items }) => {
        return { items: [...items, ...gallary.hits] };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  // handleFormSubmit = query => {
  //   this.setState({ request: query });
  //   console.log('query: ', query);
  // };

  render() {
    const { items } = this.state;
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
        <Searchbar catchSubmitInfo={this.fetchPhotosGallary} />
        {this.state.isLoading && <Loader />}
        <ImageGallery hits={items}>
          <ImageGalleryItem />
          <Button />
        </ImageGallery>
        <Modal />
      </div>
    );
  }
}

export default App;
