import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const RandomQuestionPage = () => {
  const [randomQuestion, setRandomQuestion] = useState('');
    const [currentQuestionId, setCurrentQuestionId] = useState('');
    const [answer, setAnswer] = useState('');
   const [successMessage, setSuccessMessage] = useState('');


     const fetchQuestion = async () => {
         try {
          const data  = await apiService.get('/questions/random');
             if (data && data.text) {
                 setRandomQuestion(data.text);
                 setCurrentQuestionId(data.id || '');
                } else {
                    setRandomQuestion('Нет больше вопросов.');
                    setCurrentQuestionId('');
                }
        } catch (error) {
                setRandomQuestion('Нет больше вопросов.');
              setCurrentQuestionId('');
            console.error('Error fetching random question:', error)
         }
    };
  useEffect(() => {
    fetchQuestion();
  }, []);

    const handleSubmit = async (e) => {
         e.preventDefault();
         try {
            await apiService.delete(`/questions/${currentQuestionId}`);
            setAnswer('');
               setSuccessMessage("Спасибо за ответ!");
                 setTimeout(() => {
                      setSuccessMessage('');
                 }, 3000);
               fetchQuestion();
           } catch (error) {
            console.error('Error deleting question:', error);
         }
    }
  return (
    <div>
      <h1>Случайный вопрос</h1>
        <div id="random-question-container">
             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <p>{randomQuestion}</p>
             { currentQuestionId !== "" && <form onSubmit={handleSubmit}  id="answer-form">
              <input type="hidden" name="currentQuestionId" id="currentQuestionId" value={currentQuestionId} />
                 <input
                      type="text"
                    id="answer-text"
                     name="answer"
                   placeholder="Введите свой ответ"
                      value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                     required
                    />
               <button type="submit"  id="next-button">Ответить</button>
              </form>
               }
        </div>
    </div>
  );
};

export default RandomQuestionPage;