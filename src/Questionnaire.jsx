import React from 'react';
import Question from './Question';

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  generateQuestionId = (questions) => {
    if (questions.length === 0) {
      return 1;
    }
    const ids = questions.map(q => q.id);
    return Math.max.apply(null, ids) + 1;
  };

  addQuestion = (event) => {
    event.preventDefault();
    const { questions } = this.state;
    const id = this.generateQuestionId(questions);

    this.setState(
      {
        questions: [
          ...questions,
          {
            id,
            text: '',
            type: 'text',
          },
        ],
      },
    );
  };

  updateQuestion = (question) => {
    this.setState(state => ({
      questions: state.questions.map((q) => {
        if (q.id === question.id) {
          return question;
        }
        return q;
      }),
    }));
  };

  deleteQuestion = (id) => {
    const { questions } = this.state;
    this.setState({ questions: questions.filter(q => q.id !== id) });
  };

  generateQuestionList = () => {
    const { questions } = this.state;

    return questions.map((question) => {
      if (question.type === 'text') {
        return (
          <li key={question.id}>
            <Question
              question={question}
              updateQuestion={this.updateQuestion}
              deleteQuestion={this.deleteQuestion}
            />
          </li>
        );
      }
      return false;
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h2>Exam</h2>
        <div className="row">
          <div className="col-sm-8">
            <ol>
              {this.generateQuestionList()}
            </ol>
          </div>
          <div className="col-sm-4">
            <div className="btn-toolbar mb-3">
              <button
                type="button"
                className="btn btn-default btn-primary"
                onClick={this.addQuestion}
              >
                Add A Text Question
              </button>
            </div>
            <div className="btn-toolbar">
              <button
                type="button"
                className="btn btn-default btn-primary"
              >
                Add A Multi Select Question
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Questionnaire;
