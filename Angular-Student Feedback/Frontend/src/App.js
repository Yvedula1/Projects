//establishes a React application with routing capabilities


import Update from './update.js'; 
import WelcomePage from './welcome.js';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import SurveyList from './surveyList.js';
import SurveyForm from './Surveyform.js';

function App() {
  return (
    // <div className="App">
    //   <Update />
    // </div>

<Router>
<div className="App">
    <Routes>
    <Route
            exact
            path="/"
            element={<WelcomePage/>}
        ></Route>
        <Route
            exact
            path="/surveyForm"
            element={<SurveyForm />}
        ></Route>
        <Route
            exact
            path="/surveyList"
            element={<SurveyList />}
        ></Route>
        <Route
            exact
            path="/update/:id"
            element={<Update />}
        ></Route>
    </Routes>
</div>
</Router>
  );
}

export default App;
