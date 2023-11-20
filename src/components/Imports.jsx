import { lazy } from "react";

const Login = lazy(() => import("../views/Login"));
const Information = lazy(() => import("../views/Information"));
const TaskOneQuestion1 = lazy(() =>
  import("../views/Tasks/TaskOne/Question1"),
);
const TaskOneQuestion2 = lazy(() =>
  import("../views/Tasks/TaskOne/Question2"),
);
const TaskOneQuestion3 = lazy(() =>
  import("../views/Tasks/TaskOne/Question3"),
);
const TaskOneQuestion4 = lazy(() =>
  import("../views/Tasks/TaskOne/Question4"),
  );
const TaskOneQuestion5 = lazy(() =>
import("../views/Tasks/TaskOne/Question5"),
);
const TaskTwo = lazy(() => import("../views/Tasks/TaskTwo"));
const TaskThreeQuestion1 = lazy(() =>
import("../views/Tasks/TaskThree/Question1"),
);
const TaskThreeQuestion2 = lazy(() =>
  import("../views/Tasks/TaskThree/Question2"),
);
const TaskThreeQuestion3 = lazy(() =>
  import("../views/Tasks/TaskThree/Question3"),
);
const TaskThreeQuestion4 = lazy(() =>
  import("../views/Tasks/TaskThree/Question4"),
);
const TaskThreeQuestion5 = lazy(() =>
  import("../views/Tasks/TaskThree/Question5"),
);
const Router = lazy(() => import("./Router"));

const Navbar = lazy(() => import("./Navbar"));
const Loading = lazy(() => import("./Loading"));
const ErrorPage = lazy(() => import("./404"));

export {
  Login,
  Information,
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
  Router,
  Navbar,
  Loading,
  ErrorPage,
};
