import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
//  pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

// hooks 
import useAuthContext from "./Hooks/useAuthContext";

// composants
import Navbar from "./Comp/Navbar";

function App() {

  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to='/login' />}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {!user && <Login />}
              {user && <Redirect to='/' />}
            </Route>
            <Route path="/signup">
              {!user && <Signup />}
              {user && <Redirect to='/' />}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App
