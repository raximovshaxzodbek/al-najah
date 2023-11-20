import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "../../api/Axios";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [part1_question_time, setPart1_question_time] = useState(1);
  const [part1_waiting_time, setPart1_waiting_time] = useState(1);
  const [part2_question_time, setPart2_question_time] = useState(1);
  const [part2_waiting_time, setPart2_waiting_time] = useState(1);
  const [part3_question_time, setPart3_question_time] = useState(1);
  const [part3_waiting_time, setPart3_waiting_time] = useState(1);

  const UID = uuidv4();

  const URL = "http://192.168.142.238:8000";

  const Content = {
    UID,
    URL,
    part1_question_time,
    part1_waiting_time,
    part2_question_time,
    part2_waiting_time,
    part3_question_time,
    part3_waiting_time,
    setPart1_question_time,
    setPart1_waiting_time,
    setPart2_question_time,
    setPart2_waiting_time,
    setPart3_question_time,
    setPart3_waiting_time,
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("jwtToken")) {
        const getSettings = async () => {
          const { data } = await Axios.get("settings/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jwtToken")).access
              }`,
            },
          });
          setPart1_question_time(data.part1_question_time);
          setPart1_waiting_time(data.part1_waiting_time);
          setPart2_question_time(data.part2_question_time);
          setPart2_waiting_time(data.part2_waiting_time);
          setPart3_question_time(data.part3_question_time);
          setPart3_waiting_time(data.part3_waiting_time);
        };
        getSettings();
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("jwtToken");
    }
  }, [localStorage.removeItem("jwtToken")]);

  return (
    <AuthContext.Provider value={Content}>{children}</AuthContext.Provider>
  );
}
