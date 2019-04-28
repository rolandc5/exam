import React from 'react';
import PropTypes from 'prop-types';
import MultiQ from './MultiQ';


class Question extends React.Component {
  static propTypes = {
    question: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    updateQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.questionTextRef = React.createRef();
    this.state = {
      isEditMode: true,
      optionTextRef: ''
    };
  }

  saveQuestion = (event) => {
    event.preventDefault();
    const questionText = this.questionTextRef.current.value;
    const { question, updateQuestion } = this.props;
    updateQuestion({ ...question, text: questionText });
    this.setState({
      isEditMode: false,
    });
  };

  makeQuestionEditable = (event) => {
    event.preventDefault();
    this.setState({
      isEditMode: true,
    });
  };

  deleteQuestion = (event) => {
    event.preventDefault();
    const { question, deleteQuestion } = this.props;
    deleteQuestion(question.id);
  };

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

  moveQuestion = (event, move) => {
    event.preventDefault();
    const { position, moveQuestion } = this.props;
    moveQuestion(position, move);
  }

  addOption = (event) => {
    event.preventDefault();
    const { question, addOption } = this.props;
    addOption(question.id);
  }

  saveOption = (optionText, optionId) => {
    const { question, updateOption } = this.props;
    updateOption(question, optionText, optionId);
  };

  deleteOption = (optionId) => {
    const { question, deleteOption } = this.props
    deleteOption(question, optionId);
  }

  moveOption = (optionId, move) => {
    const { question, moveOption} = this.props
    moveOption(question.id, optionId, move);
  }

  generateQuestionCard = () => {
    const { isEditMode } = this.state;
    const { question, position, listLength } = this.props;
    const questionTextInput = (
      <input
        className="form-control"
        type="text"
        placeholder="Enter a question text..."
        ref={this.questionTextRef}
        defaultValue={question.text}
      />
    );

    const questionTextH4 = (<h4>{question.text}</h4>);

    const saveOrEditCallback = isEditMode ? this.saveQuestion : this.makeQuestionEditable;
    const saveOrEditLabel = isEditMode ? 'Save Question' : 'Edit Question';

    return (
      <div className="form-group">
        {isEditMode ? questionTextInput : questionTextH4}
        {question.type == 'multiSelect' ?
          <div>
            <ol>
              {question.options.map((option, index) => {
                return (
                  <li style={{ margin: "10px" }} key={option.id}>
                    <MultiQ
                      option={option}
                      listLength={question.options.length - 1}
                      save={this.saveOption}
                      deleteO={this.deleteOption}
                      moveOption={this.moveOption}
                      position={index}
                    />
                  </li>
                )
              })}
            </ol>
          </div> : null}
        <div className="input-group">
          <div className="btn-toolbar">
            {this.generateButton(saveOrEditCallback, saveOrEditLabel)}
            {this.generateButton(this.deleteQuestion, 'Delete Question')}
            {question.type == 'multiSelect' ? isEditMode ? this.generateButton(this.addOption, 'Add Option') : null : null}
            {position !== 0 ? this.generateButton(event => this.moveQuestion(event, 'Up'), 'Up') : null}
            {listLength !== position ? this.generateButton(event => this.moveQuestion(event, 'Down'), 'Down') : null}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.generateQuestionCard();
  }
}

export default Question;
