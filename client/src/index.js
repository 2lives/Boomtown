import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import muiTheme from './config/theme';
import Layout from './components/Layout';
import Routes from './routes';
import { Provider } from 'react-redux';
import createStore from './redux/Store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './config/apolloClient';

// FirebaseAuth.onAuthStateChanged(user => {
//     if (user) {
//         store.dispatch(updateAuthState(user));
//     } else {
//         store.dispatch(updateAuthState(false));
//     }
// });

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <ApolloProvider client={client}>
            <Provider store={createStore}>
                <Router>
                    <Layout>
                        <Routes />
                    </Layout>
                </Router>
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
