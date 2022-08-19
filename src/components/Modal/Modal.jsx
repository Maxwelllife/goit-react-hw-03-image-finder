import { Component } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEscape);
  }

  onCloseByEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.onBackDrop}>
        <div className={s.modal}>{this.props.children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
