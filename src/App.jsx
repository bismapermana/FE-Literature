import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import { API, setAuthToken } from "./config/api";
import { AuthContext } from "./context/AuthContext";
import AddLiterature from "./pages/AddLiterature";
import SearchResult from "./pages/SearchResult";
import DetailLiterature from "./pages/DetailLiterature";
import Collection from "./pages/Collection";
import Admin from "./pages/admin/Admin";

const App = () => {
  const [state, dispatch] = useContext(AuthContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return null;
        }
        setAuthToken(token);
        const getData = await API.get("/user");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: getData.data.users,
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [dispatch]);

  console.log(state);

  return (
    <>
      <BrowserRouter>
        {state.isLogin === true ? (
          <>
            {state.user.status !== "admin" ? (
              <Switch>
                <Route exact path="/search" component={Search} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/addLiterature" component={AddLiterature} />
                <Route exact path="/literature" component={SearchResult} />
                <Route exact path="/details/:id" component={DetailLiterature} />
                <Route exact path="/collection" component={Collection} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/admin" component={Admin} />
              </Switch>
            )}
          </>
        ) : (
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
