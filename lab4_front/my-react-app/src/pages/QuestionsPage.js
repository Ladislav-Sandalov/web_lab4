import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);
    const fetchQuestions = async () => {
        try {
            const data = await apiService.get('/questions');
            setQuestions(data);
            } catch (error) {
            console.error('Error fetching questions:', error)
            }
    };

    const handleUpdateQuestion = async (e, questionId, newText) => {
        e.preventDefault();
        try {
            await apiService.put(`/questions/${questionId}`,newText);
            fetchQuestions();
        } catch (error) {
            console.error('Failed to update question', error);
        }
   };

   const handleDeleteQuestion = async (e, questionId) => {
        e.preventDefault();
        try {
            await apiService.delete(`/questions/${questionId}`);
            fetchQuestions();
        } catch (error) {
            console.error('Failed to delete question', error);
        }
    };

    return (
    <div>
      <h1>Список вопросов</h1>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>ID</th>
            <th>Вопрос</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {questions.length === 0 ? (
             <tr>
               <td colSpan="4">Нет вопросов.</td>
             </tr>
            ) : (
              questions.map((question, index) => (
                  <tr key={question.id}>
                    <td>{index + 1}</td>
                    <td>{question.id}</td>
                    <td>
                        <form className="update-form" onSubmit={(e) => handleUpdateQuestion(e, question.id, e.target.question.value) } style={{display: 'flex', alignItems: 'center'}}>
                           <input type="text" name="question" defaultValue={question.text}  required style={{margin: 0, flexGrow: 1}}/>
                            <button type="submit" style={{marginLeft: 10}}>Изменить</button>
                        </form>
                    </td>
                    <td>
                      <form className="delete-form" onSubmit={(e) => handleDeleteQuestion(e, question.id)} style={{display: 'inline'}}>
                         <button type="submit">Удалить</button>
                      </form>
                    </td>
                  </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsPage;