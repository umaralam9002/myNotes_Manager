import React, { useEffect, useContext, useState } from "react";
import Tasks from "./Tasks";
import { Link, useNavigate } from "react-router-dom";
import taskContext from "../contextApi/TaskContext";

function Home() {
  const navigate = useNavigate();
  const context = useContext(taskContext);
  const { tasks } = context; 

  const [categoryCounts, setCategoryCounts] = useState({}); 

  const Category = [
    { id: 1, Title: "Personal", img: "./personal.jpg" },
    { id: 2, Title: "Educational", img: "./educational.jpg" },
    { id: 3, Title: "Working", img: "./working.jpg" },
    { id: 4, Title: "General", img: "./general.jpg" },
  ];

 
  useEffect(() => {
    const counts = Category.reduce((acc, category) => {
      acc[category.Title] = 0; 
      return acc;
    }, {});

    tasks.forEach(task => {
      const formattedTag = task.tag?.trim().toLowerCase();
      const category = Category.find(cat => cat.Title.toLowerCase() === formattedTag);
      if (category) {
        counts[category.Title] = (counts[category.Title] || 0) + 1;
      }
    });

    setCategoryCounts(counts); 
  }, [tasks]); 

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <Tasks />
      <div className="flex flex-col items-center lg:items-end gap-8 mt-8 mb-3">
        {Category.map((item) => (
          <div
            key={item.id}
            className="shadow-xl rounded-2xl w-[90%] sm:w-[80%] md:w-[70%] lg:w-[calc(100%-200px)] bg-white/30 backdrop-blur-lg p-4 md:mr-[75px]"
          >
            {/* Image Section */}
            <div className="w-full h-[50px] overflow-hidden rounded-t-2xl">
              <img
                src={item.img || "/placeholder.svg"}
                className="w-full h-full object-cover"
                alt={item.Title}
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 space-y-2 sm:space-y-0">
              <div>
                <p className="text-lg font-semibold text-gray-900">{item.Title}</p>
                <p className="text-sm text-gray-500">
                  Total Tasks: {categoryCounts[item.Title] || 0}
                </p>
              </div>

              <Link
                className="text-sm font-medium text-gray-800 px-3 py-1 rounded-xl transition-all duration-300 hover:bg-white/40 w-full sm:w-auto"
                to={`/${item.Title.toLowerCase()}`}
              >
                See All Tasks
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
