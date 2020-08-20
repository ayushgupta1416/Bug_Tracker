import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './components/Login/Login';
import theme from './@bug-ui/theme';
import GlobalStyles from './styles/globalStyles';
import Home from './pages/Home/Home';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope,faLock);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyles />
      <div>
        <Switch>
          <Route path="/" exact={true} component={Home} />
        </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;