import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Information,
  Loading,
  ErrorPage,
  TaskOne,
  TaskTwo,
  TaskThree,
} from "./Imports";

export default function Router() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <React.Suspense fallback={<Loading />}>
            <ErrorPage />
          </React.Suspense>
        }
      />
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loading />}>
            <Login />
          </React.Suspense>
        }
      />
      <Route
        path="/information"
        element={
          <React.Suspense fallback={<Loading />}>
            <Information />
          </React.Suspense>
        }
      />
      <Route path="/tasks">
        <Route
          path="1"
          element={
            <React.Suspense fallback={<Loading />}>
              <TaskOne />
            </React.Suspense>
          }
        />
        <Route
          path="2"
          element={
            <React.Suspense fallback={<Loading />}>
              <TaskTwo />
            </React.Suspense>
          }
        />
        <Route
          path="3"
          element={
            <React.Suspense fallback={<Loading />}>
              <TaskThree />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
