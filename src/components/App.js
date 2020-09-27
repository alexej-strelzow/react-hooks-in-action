import React, {lazy, Suspense} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "../App.css";

import {FaCalendarAlt, FaDoorOpen, FaUsers} from "react-icons/fa";

import UserPicker from "./Users/UserPicker.js";
import PageSpinner from "./UI/PageSpinner";

import {UserProvider} from "../contexts/UserContext";

const BookablesPage = lazy(() => import("./Bookables/BookablesPage"));
const BookingsPage = lazy(() => import("./Bookings/BookingsPage"));
const UsersPage = lazy(() => import("./Users/UsersPage"));

export default function App () {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/bookings" className="btn btn-header">
                    <FaCalendarAlt/>
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookables" className="btn btn-header">
                    <FaDoorOpen/>
                    <span>Bookables</span>
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="btn btn-header">
                    <FaUsers/>
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <UserPicker/>
          </header>

          <Suspense fallback={<PageSpinner/>}>
            <Routes>
              <Route path="/bookings" element={<BookingsPage/>}/>
              <Route path="/bookables/*" element={<BookablesPage/>}/>
              <Route path="/users" element={<UsersPage/>}/>
            </Routes>
          </Suspense>
        </div>
      </Router>
    </UserProvider>
  );
}