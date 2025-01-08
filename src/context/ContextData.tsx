"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DataContextType {
  data: any;
  taskData: any;
  weeklyData: any;
  fetchQuiz: any;
  fetchSpinRewards: any;
  fetchStreaks: any;
  fetchTasks: any;
  fetchWeeklyPoint: any;
  quizData: any;
  fetchUsers: any;
  quizQuestions: any;
  fetchCompletedQuiz: any;
  lottery: any;
  weeklyPoint: any;
  completedQuiz: any;
  users: any;
  loading: boolean;
  remainingSpin: any;
  fetchSpin: any;
  setPointId: any;
  fetchCompletedTask: any;
  pointId: any;
  fetchLottery: any;
  setShowStreak: any;
  showStreak: any;
  completedTask: any;
  setCompletedTask: any;
  tickets: any;
  setTickets: any;
  spinData: any;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any>(null);
  const [users, setUser] = useState<any>(null);
  const [taskData, setTaskData] = useState<any>([]);
  const [weeklyData, setWeeklyData] = useState<any>([]);
  const [quizData, setQuizData] = useState<any>([]);
  const [quizQuestions, setQuizQuestions] = useState<any>([]);
  const [remainingSpin, setRemainingSpin] = useState<any>([]);
  const [lottery, setLottery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [completedQuiz, setCompletedQuiz] = useState<any>([]);
  const [weeklyPoint, setWeeklyPoint] = useState<any>([]);
  const [pointId, setPointId] = useState(null);
  const [tickets, setTickets] = useState<any>([]);
  const [showStreak, setShowStreak] = useState(false);
  const [completedTask, setCompletedTask] = useState<any>([]);
  const [spinData, setSpinData] = useState<any>([]);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/users"
      );
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/tasks"
      );
      const data = await response.json();
      setTaskData(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };
  const fetchStreaks = async () => {
    try {
      const response = await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/weekly-streaks"
      );
      if (!response.ok) {
        setWeeklyData([]);
        return;
      }
      const data = await response.json();
      const formattedData = data.map((streak: any) => ({
        id: streak.streak_id,
        title: streak.title,
        monday_points: streak.monday_points,
        tuesday_points: streak.tuesday_points,
        wednesday_points: streak.wednesday_points,
        thursday_points: streak.thursday_points,
        friday_points: streak.friday_points,
        saturday_points: streak.saturday_points,
        sunday_points: streak.sunday_points,
      }));
      setWeeklyData(formattedData);
    } catch (error) {
      console.error("Error fetching streaks:", error);
    }
  };
  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/quizzes-a-questions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes.");
      }

      const quizzes = await response.json();
      const now = new Date();
      console.log(quizzes?.[0]);
      const filteredData = quizzes.filter((item: any) => {
        const endDate = new Date(item.quiz_end_data);
        return endDate > now;
      });

      console.log(filteredData);

      setQuizData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCompletedQuiz = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/completedQuiz`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes.");
      }

      const quizzes = await response.json();
      setCompletedQuiz(quizzes);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSpinRewards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/lottery_rewards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes.");
      }

      const ticketsData = await response.json();
      // const filteredData = ticketsData.filter((item: any) => item.user_id == pointId);
      setTickets(ticketsData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeeklyPoint = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/user_weekly_points/${pointId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.warn("No points found, returning an empty array.");
        setWeeklyPoint([]);
        return;
      }

      const points = await response.json();
      setWeeklyPoint(points.length ? points : []);
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      const hasTodayPoint = points.some((point: any) => {
        const pointDate = new Date(point.earned_at).toISOString().split("T")[0];
        return pointDate === today;
      });
      setShowStreak(hasTodayPoint);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weekly points:", error);
      setWeeklyPoint([]); // Set empty array in case of fetch error
    } finally {
      setLoading(false);
    }
  };

  const fetchLottery = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/rewards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.warn("No points found, returning an empty array.");
        setLottery([]); // Set empty array if no points
        return;
      }

      const points = await response.json();

      setSpinData(points);
      const parsedPoint = JSON.parse(points[0].reward_data);
      setLottery(parsedPoint); // Ensure empty array if points is null or undefined
    } catch (error) {
      console.error("Error fetching weekly points:", error);
      setWeeklyPoint([]); // Set empty array in case of fetch error
    } finally {
      setLoading(false);
    }
  };

  const fetchSpin = async () => {
    try {
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/spin_counts/${pointId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.warn("No points found, returning an empty array.");
        setWeeklyPoint([]);
        return;
      }

      const points = await response.json();
      setRemainingSpin(points); // Ensure empty array if points is null or undefined
    } catch (error) {
      console.error("Error fetching weekly points:", error);
      setWeeklyPoint([]); // Set empty array in case of fetch error
    }
  };
  const fetchCompletedTask = async () => {
    try {
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/completedTask`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes.");
      }

      const quizzes = await response.json();
      
      setCompletedTask(quizzes);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCompletedWeeks = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/weekly_badge`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes.");
      }

      const quizzes = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStreaks();
    fetchCompletedQuiz();
    fetchSpinRewards();
    fetchQuiz();
    fetchLottery();
    fetchCompletedTask();
    fetchUsers();
  }, []);
  useEffect(() => {
    if (pointId) {
      fetchWeeklyPoint();
      fetchSpin();
    }
  }, [pointId]);

  return (
    <DataContext.Provider
      value={{
        fetchLottery,
        setTickets,
        tickets,
        lottery,
        pointId,
        users,
        setPointId,
        fetchWeeklyPoint,
        fetchCompletedTask,
        fetchSpin,
        fetchCompletedQuiz,
        fetchSpinRewards,
        completedQuiz,
        remainingSpin,
        data,
        weeklyPoint,
        loading,
        error,
        completedTask,
        setCompletedTask,
        taskData,
        weeklyData,
        quizData,
        quizQuestions,
        fetchQuiz,
        fetchStreaks,
        setShowStreak,
        showStreak,
        fetchTasks,
        fetchUsers,
        spinData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
