import React from 'react';
import PropTypes from 'prop-types';


class MultiQ extends React.Component {
  static propTypes = {
    option: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.optionTextRef = React.createRef();
    this.state = { 
      isEditMode: true,
    };
  }

  saveOption = (event) => {
    event.preventDefault();
    const optionText  = this.optionTextRef.current.value;
    const { option, save } = this.props;
    save(optionText, option.id);
    event.preventDefault();
    this.setState({
      isEditMode: false,
    });
  }

  makeOptionEditable = (event) => {
    event.preventDefault();
    this.setState({
      isEditMode: true,
    });
  };

  deleteOption = (event) => {
    event.preventDefault();
    const { option, deleteO } = this.props;
    deleteO(option.id);
  }

  moveOption = (event, move) => {
    event.preventDefault();
    const { position, moveOption } = this.props;
    moveOption(position, move);
  }

  generateButton = (callback, text) => (
    <div className="btn-group mr-2">
      <button
        onClick={callback}
        type="button"
        className="btn btn-default btn-success"
      >
        {text}  
      </button>
    </div>
  );

  generateOptionCard = () => {
    const { isEditMode } = this.state;
    const { option, position, listLength } = this.props;
    const optionTextInput = (
      <input
        className="form-control"
        type="text"
        placeholder="Enter a option text..."
        ref={this.optionTextRef}
        defaultValue={option.text}
      />
    )

    const optionTextH4 = (<h4>{option.text}</h4>);

    const saveOrEditCallback = isEditMode ? this.saveOption : this.makeOptionEditable;
    const saveOrEditLabel = isEditMode ? 'Save Option' : 'Edit Option';

    return (
      <div className="form-group">
        {isEditMode ? optionTextInput : optionTextH4 }
        <div className="input-group">
          <div className="btn-toolbar">
            {this.generateButton(saveOrEditCallback, saveOrEditLabel)}
            {this.generateButton(this.deleteOption, 'Delete Option')}
            {position !== 0 ? this.generateButton(event => this.moveOption(event, 'Up'), 'Up') : null}
            {listLength !== position ? this.generateButton(event => this.moveOption(event, 'Down'), 'Down'): null}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.generateOptionCard();
  }
}

export default MultiQ;