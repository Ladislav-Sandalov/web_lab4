import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AddQuestionPage from './pages/AddQuestionPage';
import QuestionsPage from './pages/QuestionsPage';
import RandomQuestionPage from './pages/RandomQuestionPage';
import ContactsPage from './pages/ContactsPage';
import './assets/css/style.css'

function App() {
  return (
      <Router>
        <Layout>
           <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add_question" element={<AddQuestionPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/random_question" element={<RandomQuestionPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </Layout>
    </Router>
  );
}

export default App;