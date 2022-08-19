import { Component } from 'react';
import s from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handledInputChange = e => {
    this.setState({
      inputValue: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.catchSubmitInfo(this.state.inputValue);
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className={s.buttonIcon}>
            <BsSearch size="15px" />
          </button>

          <input
            onChange={this.handledInputChange}
            value={this.state.inputValue}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  catchSubmitInfo: PropTypes.func.isRequired,
};

export default Searchbar;
