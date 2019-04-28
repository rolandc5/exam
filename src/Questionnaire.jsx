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

  addMultiQuestion = (event) => {
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
            options: [],
            type: 'multiSelect'
          }
        ]
      }
    )
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

  updateOption = (question, optionText, optionId) => {
    const { questions } = this.state;
    this.setState({ questions: questions.map(q => {
      if (q.id === question.id) {
        question.options.forEach(o => {
          if (optionId === o.id) {
            o.text = optionText;
          }
        });
        return question;
      }
      return q;
    })})
  }

  deleteQuestion = (id) => {
    const { questions } = this.state;
    this.setState({ questions: questions.filter(q => q.id !== id) });
  };

  moveQuestion = (p, move) => {
    const { questions } = this.state;
    let temp = questions[p];
    if (move == 'Up') {
      questions[p] = questions[p - 1];
      questions[p - 1] = temp; 
    }
    if (move == 'Down') {
      questions[p] = questions[p + 1];
      questions[p + 1] = temp; 
    }
    this.setState({ questions: questions });
  }

  moveOption = (id, p, move) => {
    const { questions } = this.state;
    let temp;
    this.setState({ questions: questions.map(q => {
      const changedValue = {...q};
      if (id === q.id) {
        temp = changedValue.options[p]
        if (move == 'Up') {
          changedValue.options[p] =  changedValue.options[p - 1]
          changedValue.options[p - 1] = temp;
        }
        if (move == 'Down') {
          changedValue.options[p] =  changedValue.options[p + 1]
          changedValue.options[p + 1] = temp; 
        }
        return changedValue;
      }
      return q;
    })})
  }

  generateOptionId = (options) => {
    if (options.length === 0) {
      return 1;
    }    
    const ids = options.map(o => o.id);
    return Math.max.apply(null, ids) + 1;
  }

  addOption = (id) => {
    const { questions } = this.state;
    let optionsId = 0;
    this.setState({ 
      questions: questions.map(q => {
        const changedValue = {...q};
        if (id === q.id) {
          optionsId = this.generateOptionId(changedValue.options);
          changedValue.options.push({text: '', id: optionsId});
          return changedValue;
        }
        return q;
      })
    });
  }

  deleteOption = (question, optionId) => {
    const { questions } = this.state;
    this.setState({ 
      questions: questions.map(q => {
        const changedValue = {...q};
        if (q.id == question.id) {
          changedValue.options = changedValue.options.filter(o => o.id !== optionId);
           return changedValue;
        }
        return q;
      })});
  };

  generateQuestionList = () => {
    const { questions } = this.state;
  
    return questions.map((question, index) => {
        return (
          <li key={question.id}>
            <Question
              question={question}
              position={index}
              listLength={questions.length - 1}
              updateQuestion={this.updateQuestion}
              deleteQuestion={this.deleteQuestion}
              addOption={this.addOption}
              deleteOption={this.deleteOption}
              updateOption={this.updateOption}
              moveQuestion={this.moveQuestion}
              moveOption={this.moveOption}
            />
          </li>
        );
      //does this have to return false?
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
                onClick={this.addMultiQuestion}
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
