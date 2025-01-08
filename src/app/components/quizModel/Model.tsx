// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import correct from "../../../../public/svg/Correct.svg";
// import cross from "../../../../public/svg/cross.svg";
// import wrong from "../../../../public/svg/Wrong.svg";
// import { useData } from "@/context/ContextData";

// interface Option {
//   id: string;
//   text: string;
// }
// const options: Option[] = [
//   { id: "A", text: "Proof of Work" },
//   { id: "B", text: "Full anonymity" },
//   { id: "C", text: "Identity layer" },
//   { id: "D", text: "Crypto-only focus" },
// ];

// const TIMER_DURATION = 12;
// export function QuizModal({
//   isOpen,
//   onClose,
//   questions
// }: {
//   isOpen: boolean;
//   onClose: () => void
//   questions:any;
// }) {
//   const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (isOpen) {
//       if (timeLeft === 0) setTimeLeft(TIMER_DURATION);
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             clearInterval(timer);
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     }

//     // Handle timeout logic
//     if (timeLeft === 0 && selectedOption === null) {
//       setSelectedOption("B"); // Default answer
//       setTimeout(() => {
//         handleNext(); // Move to the next question
//       }, 2000);
//     }

//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [isOpen, timeLeft, selectedOption, handleNext]);

//   const handleOptionClick = (answer: string) => {
//     const correctAnswer = questions[currentQuestionIndex].correct_answer.trim();
//     const selectedAnswer = answer.trim();
//     if (selectedAnswer === correctAnswer) {
//       setSelectedOption("A")
//       setTimeout(() => {
//         handleNext();
//       }, 2000);
//     } else {
//       setSelectedOption("B")
//       setTimeout(() => {
//         handleNext();
//       }, 2000);
//     }
//   };
//   if (!isOpen) return null;

//   const options2 = questions[currentQuestionIndex].options
//   .replace(/^{|}$/g, "")
//   .split(",")
//   .map((option: string) => option.replace(/\\|"/g, "").trim());

//   return (
//     <>
//       <div className="absolute top-0  bg-transparent mb-20 mt-5 backdrop-blur-sm z-50 flex w-[90%] items-center justify-center p-2">
//         <div className="bg-[#191B1B] flex flex-col justify-between h-full border border-1  border-white w-full max-w-md rounded-xl p-6 relative">
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 text-gray-400 hover:text-white"
//           >
//             <Image src={cross} width={24} height={24} alt="cross" />
//           </button>
//           <div className="text-gray-400 text-center mb-4">{currentQuestionIndex + 1} / {questions.length} </div>
//           <h2 className="text-white text-[24px] text-center mb-8 px-4">
//           {questions[currentQuestionIndex].question_text}
//           </h2>
//           {selectedOption === "A" && (
//             <div className="relative w-16 h-16 mx-auto mb-32 mt-10">
//               <Image src={correct} width={56} height={56} alt="profile" />
//             </div>
//           )}
//           {selectedOption === "B" && (
//             <div className="relative w-16 h-16 mx-auto mb-32 mt-10">
//               <Image src={wrong} width={56} height={56} alt="profile" />
//             </div>
//           )}
//           {(selectedOption === null ||
//             selectedOption === "D" ||
//             selectedOption === "C") && (
//             <div className="relative w-16 h-16 mx-auto mb-32 mt-10">
//               <svg className="w-full h-full transform -rotate-90">
//                 <circle
//                   cx="32"
//                   cy="32"
//                   r="28"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   fill="none"
//                   className="text-gray-700"
//                 />
//                 <circle
//                   cx="32"
//                   cy="32"
//                   r="28"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   fill="none"
//                   className="text-purple-400"
//                   strokeDasharray={175}
//                   strokeDashoffset={175 * (timeLeft / TIMER_DURATION)}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center text-sm text-white">
//                 00:{timeLeft.toString().padStart(2, "0")}
//               </div>
//             </div>
//           )}

//           <div className="space-y-3">
//             {/* {
//               JSON.parse(questions[currentQuestionIndex].options).map((option:any,i:any)=>{
//                 <button
//                 key={option.id}
//                 onClick={() => handleNext()}
//                 className={`w-full p-4 rounded-xl text-left flex items-center space-x-3 transition-colors
//                 ${
//                   selectedOption === option.id
//                     ? "bg-gradient-to-r from-purple-300 to-indigo-400 text-black"
//                     : "hover:bg-white/5 bg-transparent border border-[rgba(255,255,255,0.1)] text-white"
//                 }`}
//               >
//                 <span className="text-lg font-medium">{option.id}</span>
//                 <span>{option.text}</span>
//               </button>
//               })
//             } */}
//             {options2.map((option:any,i:any) => (
//               <button
//                 key={i}
//                 disabled={selectedOption !==null ? true:false  }
//                 onClick={() => handleOptionClick(option)}
//                 className={`w-full p-4 rounded-xl text-left flex items-center space-x-3 transition-colors
//                 ${
//                   selectedOption === option
//                     ? "bg-gradient-to-r from-purple-300 to-indigo-400 text-black"
//                     : "hover:bg-white/5 bg-transparent border border-[rgba(255,255,255,0.1)] text-white"
//                 }`}
//               >
//                 <span className="text-lg font-medium">{i+1}</span>
//                 <span>{option}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Image from "next/image";
import correct from "../../../../public/svg/Correct.svg";
import cross from "../../../../public/svg/cross.svg";
import wrong from "../../../../public/svg/Wrong.svg";
import { useData } from "@/context/ContextData";
import { useCurrentData } from "@/context/CurrentUser";

export function QuizModal({
  isOpen,
  onClose,
  questions,
  setIsQuizModalOpen,
  setWinningValue,
  currentPoint,
  setCurrentPoint,
}: {
  isOpen: boolean;
  onClose: () => void;
  questions: any;
  setIsQuizModalOpen: any;
  setWinningValue: any;
  currentPoint: any;
  setCurrentPoint: any;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    questions[currentQuestionIndex]?.time_limit || 12
  );
  const { fetchCompletedQuiz, fetchUsers, pointId } = useData();
  const { currentUsers, fun } = useCurrentData();

  const handleComplete = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        user_id: pointId,
        quiz_id: questions[currentQuestionIndex].quiz_id,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
      await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/completedQuiz",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      await fetchCompletedQuiz();
    } catch (error) {}
  };

  useEffect(() => {
    if (isOpen) {
      const timeLimit = questions[currentQuestionIndex]?.time_limit || 12;
      setTimeLeft(timeLimit);
    }
  }, [isOpen, currentQuestionIndex]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      if (timeLeft === 0 && selectedOption === null) {
        setSelectedOption("B");
        handleComplete();
        setTimeout(() => {
          handleNext();
        }, 2000);
        return;
      }
      timer = setInterval(() => {
        setTimeLeft((prevTime: any) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, timeLeft, selectedOption]);

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setTimeout(() => {
        setSelectedOption(null);
        onClose();
        setCurrentQuestionIndex(0)
        setIsQuizModalOpen(true);
      }, 2000);
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleOptionClick = async (answer: string) => {
    if (currentQuestionIndex === 0) {
      handleComplete();
    }
    const correctAnswer =
      questions[currentQuestionIndex]?.correct_answer.trim();
    const selectedAnswer = answer.trim();
    if (selectedAnswer === correctAnswer) {
      setCurrentPoint(
        (prevPoints: any) =>
          prevPoints + questions[currentQuestionIndex]?.points
      );
      setSelectedOption("A");
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const updatedPoints =
          currentUsers?.[0]?.user_points === null
            ? questions[currentQuestionIndex]?.points
            : currentUsers?.[0]?.user_points +
              questions[currentQuestionIndex]?.points;
        const raw = JSON.stringify({
          user_points: updatedPoints,
        });

        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
        };

        await fetch(
          `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
          requestOptions
        );
        await fetchUsers();
        await fun();
      } catch (error) {
        console.error("Error updating user points:", error);
      }
      setTimeout(() => {
        handleNext();
      }, 2000);
    } else {
      setSelectedOption("B");
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  const options2 = questions[currentQuestionIndex]?.options
    ?.replace(/^{|}$/g, "")
    ?.split(",")
    ?.map((option: string) => option.replace(/\\|"/g, "").trim());
  const handleClose = () => {
    onClose();
    setCurrentQuestionIndex(0)
    setSelectedOption(null);
  };
  return (
    <>
      <div className="fixed top-0 bg-transparent mb-20 mt-5 backdrop-blur-sm z-50 flex w-[90%] items-center justify-center p-2">
        <div className="bg-[#191B1B] flex flex-col justify-between h-[90vh] overflow-y-auto border border-1 border-white w-full max-w-md rounded-xl p-6 relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <Image src={cross} width={24} height={24} alt="cross" />
          </button>
          <div className="text-gray-400 text-center mb-4">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
          <h2 className="text-white text-[24px] text-center mb-8 px-4">
            {questions[currentQuestionIndex]?.question_text}
          </h2>
          {selectedOption === "A" && (
            <div className="relative w-16 h-16 mx-auto mb-32 mt-10">
              <Image src={correct} width={56} height={56} alt="profile" />
            </div>
          )}
          {selectedOption === "B" && (
            <div className="relative w-16 h-16 mx-auto mb-32 mt-10">
              <Image src={wrong} width={56} height={56} alt="profile" />
            </div>
          )}
          {(selectedOption === null ||
            selectedOption === "D" ||
            selectedOption === "C") && (
            <div className="relative w-16 h-16 mx-auto mb-32 mt-10">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-purple-400"
                  strokeDasharray={175}
                  strokeDashoffset={
                    175 *
                    (timeLeft /
                      (questions[currentQuestionIndex]?.time_limit || 12))
                  }
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm text-white">
                {timeLeft}
              </div>
            </div>
          )}
          <div className="space-y-3">
            {options2?.map((option: any, i: any) => (
              <button
                key={i}
                disabled={selectedOption !== null}
                onClick={() => handleOptionClick(option)}
                className={`w-full p-4 rounded-xl text-left flex items-center space-x-3 transition-colors ${
                  selectedOption === option
                    ? "bg-gradient-to-r from-purple-300 to-indigo-400 text-black"
                    : "hover:bg-white/5 bg-transparent border border-[rgba(255,255,255,0.1)] text-white"
                }`}
              >
                <span className="text-lg font-medium">{i + 1}</span>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
