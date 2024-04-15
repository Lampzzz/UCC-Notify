import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../src/assets/style/global.css";
import "../src/assets/style/auth.css";
import "../src/assets/style/button.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Redux
import { store } from "./services/redux/store";

// Landing Page
import Home from "@Pages/layout/home/Home";
import About from "@Pages/layout/about/About";
import Contact from "@Pages/layout/contact/Contact";
import Content from "@Pages/layout/home/Content";
import AllNews from "@Pages/layout/announcement/AllNews";
import AllEvents from "@Pages/layout/announcement/AllEvents";
import Search from "@Pages/layout/home/Search";

// User
import UserProfile from "@Pages/user/UserProfile";
import UserBookmark from "@Pages/user/UserBookmark";

// Private Route
import UserRoute from "@Pages/auth/route/UserRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/announcements/news" element={<AllNews />} />
      <Route path="/announcements/events" element={<AllEvents />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/content/:id" element={<Content />} />
      <Route path="/search" element={<Search />} />

      <Route path="/user" element={<UserRoute />}>
        <Route path="profile" element={<UserProfile />} />
        <Route path="bookmark" element={<UserBookmark />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
