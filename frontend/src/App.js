import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Main from "./containers/Main/Main";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";


const App = () => {
  return (
      <Layout>
        <Switch>
            <Route path="/" exact component={Main}></Route>
            <Route path="/albums" component={Albums}></Route>
            <Route path="/tracks" component={Tracks}></Route>
        </Switch>
      </Layout>
  );
}

export default App;

