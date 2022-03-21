import { NotFound } from 'components/common/NotFound';
import Photo from 'features/photo';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Switch>
        <Redirect exact from="/" to="photos" />

        <Route path="/photos">
          <Photo />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
