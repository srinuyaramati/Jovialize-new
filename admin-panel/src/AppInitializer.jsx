import { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import Authentication from "./layouts/Authentication";
import { RootContext } from "utils/context/RootContextProvider";

const MainApp = () => {

  const contextText = useContext(RootContext);
  const {state:{isloggedIn}} = contextText;

  const PublicRouter = () => {
    return (
      <>
        <Route path="/admin">
          <Redirect from="/" to="/authentication/login" />
        </Route>
        <Route path="/authentication" render={(props) => <Authentication {...props} />} />
        <Route exact path="/">
          <Redirect from="/" to="/authentication/login" />
        </Route>
        <Route exact path="/authentication">
          <Redirect from="/authentication" to="/authentication/login" />
        </Route>
      </>
    )
  }

  const PrivateRouter = () => {
    return (
      <>
        <Route path="/authentication" render={(props) => <Authentication {...props} />}>
          <Redirect from="/" to="/admin/dashboard" />
        </Route>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        
        <Route exact path="/">
          <Redirect from="/" to="/admin/dashboard" />
        </Route>
        <Route exact path="/admin">
          <Redirect from="/admin" to="/admin/dashboard" />
        </Route>
      </>
    )
  }

  return (
    <>
      <div id="page-loader" className="page-loader"><div className="spinner">Please wait...</div></div>
      <BrowserRouter>
        <Switch>
          {!isloggedIn && <PublicRouter />}
          {isloggedIn && <PrivateRouter />}
        </Switch>
      </BrowserRouter>
    </>
    
  )
}

export default MainApp;