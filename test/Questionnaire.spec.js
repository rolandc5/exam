import React from 'react';
import '@babel/polyfill';
import {
  cleanup, render, fireEvent, getByText, getByPlaceholderText,
  queryAllByText,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import Questionnaire from '../src/Questionnaire';

describe('Questionnaire Test Suites', () => {
  const setup = () => render(<Questionnaire />).container;

  afterEach(cleanup);

  it('should add a text question when Add Text Question button is clicked', async () => {
    const container = setup();
    const addTextQuestionBtn = getByText(container, 'Add A Text Question');

    expect(addTextQuestionBtn).toBeVisible();

    fireEvent.click(addTextQuestionBtn);
    const saveButton = getByText(container, 'Save Question');
    const input = getByPlaceholderText(container, 'Enter a question text...');
    expect(saveButton).toBeVisible();
    expect(input).toBeVisible();
  });

  it('should save the text question when Save button is clicked', () => {
    const container = setup();
    const addTextQuestionBtn = getByText(container, 'Add A Text Question');

    fireEvent.click(addTextQuestionBtn);

    const saveButton = getByText(container, 'Save Question');
    const input = getByPlaceholderText(container, 'Enter a question text...');
    const questionText = 'What is your age?';

    fireEvent.change(input, { target: { value: questionText } });
    fireEvent.click(saveButton);

    const editButton = getByText(container, 'Edit Question');
    const questionTextH4 = container.querySelector('h4');

    expect(editButton).toBeVisible();
    expect(questionTextH4).toHaveTextContent(questionText);
  });

  it('should edit the text question when Edit button is clicked', () => {
    const container = setup();
    const addTextQuestionBtn = getByText(container, 'Add A Text Question');

    fireEvent.click(addTextQuestionBtn);

    const saveButton = getByText(container, 'Save Question');
    const questionText = 'What is your age?';

    const input = getByPlaceholderText(container, 'Enter a question text...');
    fireEvent.change(input, { target: { value: questionText } });

    fireEvent.click(saveButton);
    const editButton = getByText(container, 'Edit Question');

    fireEvent.click(editButton);
    expect(input).toBeVisible();
    expect(input.value).toBe(questionText);
  });

  it('should delete the text question when Delete button is clicked', () => {
    const container = setup();
    const addTextQuestionBtn = getByText(container, 'Add A Text Question');
    fireEvent.click(addTextQuestionBtn);

    const saveButton = getByText(container, 'Save Question');
    const questionText = 'What is your age?';

    const input = getByPlaceholderText(container, 'Enter a question text...');
    fireEvent.change(input, { target: { value: questionText } });

    fireEvent.click(saveButton);
    const deleteButton = getByText(container, 'Delete Question');

    fireEvent.click(deleteButton);

    const allDeleteButtons = queryAllByText(container, 'Delete Question');
    expect(allDeleteButtons.length).toBe(0);
  });
});
