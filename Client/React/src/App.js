import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute, AdminProtected } from "./ProtectedRoute";

import Home from "./screens/Home/Home";
import Login from "./screens/Login&Signup";
import Store from "./screens/Store";
import About from "./screens/About";
import NotFound from "./screens/NotFound";
import Cart from "./screens/Cart";
import Orders from "./screens/Orders";
import Pay from "./screens/Payment";
import PaySuccess from "./screens/PaySuccess";
import Admin from "./screens/Admin";
import AddBook from "./screens/Admin/AddBooks/index";
import AddBookSuccess from "./screens/Admin/AddBooks/success";
import AddAuthor from "./screens/Admin/AddAuthor/index";
import AddAuthorSuccess from "./screens/Admin/AddAuthor/success";
import AddCategory from "./screens/Admin/AddCategory/index";
import AddCategorySuccess from "./screens/Admin/AddCategory/success";
import DeleteBook from "./screens/Admin/DeleteBook";
import DeleteBookSuccess from "./screens/Admin/DeleteBook/success";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <Route path="/store" component={Store} />
              <ProtectedRoute path="/orders" component={Orders} />
              <AdminProtected path="/admin" component={Admin} />
              <AdminProtected path="/adminAddBook" component={AddBook} />
              <AdminProtected path="/adminDeleteBook" component={DeleteBook} />
              <AdminProtected
                path="/deleteBookSuccess"
                component={DeleteBookSuccess}
              />
              <AdminProtected
                path="/addBookSuccess"
                component={AddBookSuccess}
              />
              <AdminProtected path="/adminAddAuthor" component={AddAuthor} />
              <AdminProtected
                path="/addAuthorSuccess"
                component={AddAuthorSuccess}
              />
              <AdminProtected
                path="/adminAddCategory"
                component={AddCategory}
              />
              <AdminProtected
                path="/addCategorySuccess"
                component={AddCategorySuccess}
              />
              <ProtectedRoute path="/cart" component={Cart} />
              <ProtectedRoute path="/pay" component={Pay} />
              <ProtectedRoute path="/success" component={PaySuccess} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
