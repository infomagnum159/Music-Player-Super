import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Main from "./containers/Main/Main";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";


const App = () => {
  return (
      <Layout>
        <Switch>
            <Route path="/" exact component={Main}></Route>
            <Route path="/albums" component={Albums}></Route>
            <Route path="/tracks" component={Tracks}></Route>
            <Route path="/track_history" component={TrackHistory}/>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
        </Switch>
      </Layout>
  );
}

export default App;

