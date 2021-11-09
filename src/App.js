import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import DetailsPage from './components/DetailsPage'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/pokemon" component={Home} />
    <Route exact path="/pokemon/:name" component={DetailsPage} />
  </Switch>
)

export default App
