import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import StripedTable from './StripedTable/StripedTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import Header from './Header/Header';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          username: userAuth.username,
          country: userAuth.country,
        }));
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            {!user ? (
              <Login />
            ) : (
              <div className="app__main">
                <Header />
                <StripedTable />
              </div>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
