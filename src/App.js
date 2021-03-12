import { Route, Switch } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import CreateNew from "./page/createNew";
import Developer from "./page/developer";
import Login from "./page/login";
import NoticeList from "./page/noticeList";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route path="/" component={NoticeList} exact />
        <Route path="/login" component={Login} />
        <Route path="/developer" component={Developer} />
        <Route path="/createNew" component={CreateNew} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
