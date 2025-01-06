import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

const AddQuestionPage = () => {
  const [question, setQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      setErrorMessage('');
    try {
      const response = await apiService.post('/questions', question);
      if (response.status === 200) {
        setQuestion('');
          setSuccessMessage("Ваш вопрос записан!");
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            navigate('/add_question')

      } else if (response.status === 400) {
        setErrorMessage("Введено максимальное количество вопросов");
      } else {
        const errorText = await response.text();
        setErrorMessage(`Произошла ошибка при добавлении вопроса: ${errorText}`);
      }
    } catch (error) {
      setErrorMessage('Произошла ошибка при добавлении вопроса');
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      <h1>Добавить новый вопрос</h1>
       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Вопрос:</label>
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddQuestionPage;