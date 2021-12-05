import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

// pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Redirecting from './pages/Redirect';

// styles
import GlobalStyle, { ParentContainer } from './styles/globalStyle';

function App() {
  return (
    <ParentContainer>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Profile} />
            <Route path="/accounts/emailsignup" component={SignUp} />
            <Route path="/accounts/password/reset" component={ResetPassword} />
            <Route path="/accounts/signin" component={SignIn} />
            <Route path="/accounts/settings" component={Settings} />
            <Route path="/accounts/redirect" component={Redirecting} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </ParentContainer>
  );
}

export default App;
