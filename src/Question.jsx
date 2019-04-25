import React from 'react';
import PropTypes from 'prop-types';

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
    this.state = { isEditMode: true };
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

  generateQuestionCard = () => {
    const { isEditMode } = this.state;
    const { question } = this.props;

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
        {isEditMode ? questionTextInput : questionTextH4 }
        <div className="input-group">
          <div className="btn-toolbar">
            {this.generateButton(saveOrEditCallback, saveOrEditLabel)}
            {this.generateButton(this.deleteQuestion, 'Delete Question')}
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
