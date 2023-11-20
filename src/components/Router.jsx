import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Information,
  Loading,
  ErrorPage,
  TaskOneQuestion1,
  TaskOneQuestion2,
  TaskOneQuestion3,
  TaskOneQuestion4,
  TaskOneQuestion5,
  TaskTwo,
  TaskThreeQuestion1,
  TaskThreeQuestion2,
  TaskThreeQuestion3,
  TaskThreeQuestion4,
  TaskThreeQuestion5,
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
      <Route
        path="/task_id=1/question=1"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskOneQuestion1 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=1/question=2"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskOneQuestion2 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=1/question=3"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskOneQuestion3 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=1/question=4"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskOneQuestion4 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=1/question=5"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskOneQuestion5 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=2"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskTwo />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=3/question=1"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskThreeQuestion1 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=3/question=2"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskThreeQuestion2 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=3/question=3"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskThreeQuestion3 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=3/question=4"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskThreeQuestion4 />
          </React.Suspense>
        }
      />
      <Route
        path="/task_id=3/question=5"
        element={
          <React.Suspense fallback={<Loading />}>
            <TaskThreeQuestion5 />
          </React.Suspense>
        }
      />
    </Routes>
  );
}
