import React from 'react';
 import { Link, NavLink } from 'react-router-dom';

 const Layout = ({ children }) => {
   return (
     <div>
       <h1>Задай вопрос</h1>
       <nav>
         <ul>
           <li>
             <NavLink to="/" exact activeClassName="current">
               Главная
             </NavLink>
           </li>
           <li>
             <NavLink to="/add_question" activeClassName="current">
               Добавить вопрос
            </NavLink>
           </li>
           <li>
             <NavLink to="/questions" activeClassName="current">
                 Список вопросов
             </NavLink>
          </li>
           <li>
             <NavLink to="/random_question" activeClassName="current">
               Случайный вопрос
             </NavLink>
          </li>
           <li>
             <NavLink to="/contacts" activeClassName="current">
               Контакты
             </NavLink>
           </li>
             <li>
            <a href="http://localhost:8080/swagger-ui/index.html" target="_blank" rel="noopener noreferrer">Документация API</a>
           </li>
        </ul>
       </nav>
      <div className="content-wrapper">{children}</div>
    </div>
   );
 };
 export default Layout;