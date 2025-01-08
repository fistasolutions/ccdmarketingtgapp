"use client";
import GradientCard from "@/app/components/card/Card";
import { CongratsModel } from "@/app/components/congratsModel/CongratsModel";
import { LotteryWin } from "@/app/components/lotteryWin/LotteryWin";
import QuizCard from "@/app/components/quizCard/QuizCard";
import { QuizModal } from "@/app/components/quizModel/Model";
import React, { useEffect, useState } from "react";
import LotterySpinner from "../../components/lotteryspiner/lotteryspiner";
import { useData } from "@/context/ContextData";
import { div } from "framer-motion/client";
import { useCurrentData } from "@/context/CurrentUser";
function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winningValue, setWinningValue] = useState<number | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [spiner, setSpiner] = useState(false);
  const [spineWinner, setSpineWinner] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const {
    quizData,
    completedQuiz,
    fetchQuiz,
    fetchUsers,
    fetchSpinRewards,
    pointId,
  } = useData();
  const [currentPoint, setCurrentPoint] = useState(0);
  const { currentUsers } = useCurrentData();
  useEffect(() => {
    fetchQuiz();
  }, []);
  const handleOpenQuizModal = () => setSpiner(true);
  console.log(quizData);
  const notCompletedQuizzes = quizData.filter(
    (quiz: any) =>
      !completedQuiz.some(
        (completed: any) =>
          completed.user_id === pointId && completed.quiz_id === quiz.quiz_id
      )
  );

  console.log(notCompletedQuizzes);

  const handleCloseQuizModal = () => setIsQuizModalOpen(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz([]);
  };

  const handleOpenModal = (quiz: any) => {
    setCurrentPoint(0);
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  return (
    <>
      {spiner ? (
        <>
          {spineWinner ? (
            <>
              <LotteryWin
                winningValue={winningValue}
                setSpineWinner={setSpineWinner}
              />
            </>
          ) : (
            <>
              <div>
                <div className="flex justify-center items-center">
                  <h1 className="text-[24px] mt-[10px] w-[281px] font-normal text-center bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] bg-clip-text min-h-780:leading-[28px] leading-6 text-transparent">
                    Win more tickets - increase you winning chances!
                  </h1>
                </div>
                <div className="">
                  <div>
                    <LotterySpinner
                      setSpineWinner={setSpineWinner}
                      setWinningValue={setWinningValue}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <>
            <div className="bg-[#101010] text-white py-4 mb-[100px]">
              <h3
                className="text-center text-[32px] mb-5 mt-3 bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]
  bg-clip-text text-transparent"
              >
                Games
              </h3>
              <div className="flex justify-center align-middle mx-4 relative">
                <GradientCard onClick={handleOpenQuizModal} />
              </div>
              <div className="flex justify-center  align-middle mx-4 mt-4">
                {selectedQuiz && (
                  <QuizModal
                    questions={selectedQuiz}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    setIsQuizModalOpen={setIsQuizModalOpen}
                    setWinningValue={setWinningValue}
                    currentPoint={currentPoint}
                    setCurrentPoint={setCurrentPoint}
                  />
                )}
                <div className="flex flex-col space-y-4">
                  {notCompletedQuizzes.map((item: any, i: any) => {
                    return (
                      <div key={i}>
                        <QuizCard
                          onClick={() => handleOpenModal(item.questions)}
                          title={item.quiz_title}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mb-[100px]">
                <CongratsModel
                  isOpen={isQuizModalOpen}
                  onClose={handleCloseQuizModal}
                  setSpiner={setSpiner}
                  winningValue={currentPoint}
                />
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}

export default Page;
