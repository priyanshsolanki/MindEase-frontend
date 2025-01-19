import { HelpCircle, Clock, AlertTriangle, X, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import axiosInstance from "../utils/Api";

import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const parseJiraDescription = (descriptionJson) => {
  if (!descriptionJson || descriptionJson.type !== "doc") {
    return "No description available";
  }

  let plainText = "";

  // Iterate over the content array
  if (Array.isArray(descriptionJson.content)) {
    descriptionJson.content.forEach((contentBlock) => {
      if (contentBlock.type === "paragraph" && Array.isArray(contentBlock.content)) {
        contentBlock.content.forEach((textNode) => {
          if (textNode.type === "text" && textNode.text) {
            plainText += textNode.text + " ";
          }
        });
      }
    });
  }

  return plainText.trim() || "No meaningful description";
};

const TaskCard = ({ getAiApproach,task = {} }) => { 
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [showMainDialog, setShowMainDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  useEffect(()=>{
    console.log(task)
    if(task.aiSuggestions == undefined || task.aiSuggestions.length == 0)
      {
        setShowAIHelp(false)
      }
  },[showHelpDialog]);
  // Only proceed if task is defined
  if (!task) return null;
  
  const getPriorityStyles = (priority = '') => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'border-l-[#FDA4AF] bg-gradient-to-br from-white to-[#FFF1F2]';
      case 'medium':
        return 'border-l-[#FCD34D] bg-gradient-to-br from-white to-[#FEFCE8]';
      case 'low':
        return 'border-l-[#86EFAC] bg-gradient-to-br from-white to-[#F0FDF4]';
      default:
        return 'border-l-[#93C5FD] bg-gradient-to-br from-white to-[#EFF6FF]';
    }
  };
  return (
    <>
      {/* Main Card */}
      <div 
        className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer 
          border-l-4 hover:shadow-md transition-shadow ${getPriorityStyles(task.fields.priority.name)}`}
        onClick={() => setShowMainDialog(true)}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-800 flex-grow">{task.fields.summary}</h3>
          
          <Button 
            variant="ghost" 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setShowHelpDialog(true);
            }}
          >
            <HelpCircle className="w-5 h-5 text-gray-500" />
          </Button>
        </div>

        <div className="space-y-3">
          {/* <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>Estimated: {task.fields.estimatedHours}</span>
          </div> */}

          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <AlertTriangle className={`w-4 h-4 mr-1 
                ${task.fields.priority.name?.toLowerCase() === 'high' ? 'text-red-500' : 
                task.fields.priority.name?.toLowerCase() === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} 
              />
              {task.fields.priority.name}
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
              {task.fields.status.name}
            </span>
          </div>
        </div>
      </div>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{!showAIHelp ?"Would you like ":"" }Task Analysis & Help for {task.key}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {/* <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm">Estimated Time: {task.fields.estimatedHours}</p>
            </div> */}
            <br/>
            {!showAIHelp ? (
              <div className="text-center">
                {/* <p className="mb-4">Would you like help planning task {task.key} ?</p> */}
                <Button onClick={() => {
                  setShowAIHelp(true)
                  getAiApproach()
                  
                  }}>
                  Yes, help me
                </Button>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg" style={{maxHeight:'60vh'}}>
                <h4 className="font-medium mb-2">Suggested Approach:</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line" style={{maxHeight:'40vh',overflow:'scroll'}}>{task.aiSuggestions}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Task Dialog */}
  
    <Dialog open={showMainDialog} onOpenChange={setShowMainDialog}>
      <DialogContent className="sm:max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{task.fields.summary || "Task Details"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Task Description */}
          <div>
            <h4 className="font-medium text-base mb-2">Description</h4>
            <p className="text-gray-600 text-sm">
              {parseJiraDescription(task.fields.description) || "No description provided"}
            </p>
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <h4 className="font-medium text-base mb-1">Task ID</h4>
              <p className="text-gray-600 text-sm">{task.key || "Not set"}</p>

            </div>

            {/* Status */}
            <div>
              <h4 className="font-medium text-base mb-1">Status</h4>
              <p className="text-gray-600 text-sm">{task.fields.status.name || "Not set"}</p>
            </div>

            {/* Type */}
            <div>
              <h4 className="font-medium text-base mb-1">Due Date</h4>
              <p className="text-gray-600 text-sm">{task.fields.duedate || "Not specified"}</p>
            </div>

            {/* Created Date */}
            <div>
              <h4 className="font-medium text-base mb-1">Priority</h4>
              <p className="text-gray-600 text-sm">{task.fields.priority.name || "Not set"}</p>
            </div>
          </div>

          {/* Additional Fields */}
          {task.dueDate && (
            <div>
              <h4 className="font-medium text-base mb-1">Due Date</h4>
              <p className="text-gray-600 text-sm">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}
          {/* {task.estimatedHours && (
            <div>
              <h4 className="font-medium text-base mb-1">Estimated Hours</h4>
              <p className="text-gray-600 text-sm">{task.estimatedHours} hours</p>
            </div>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};


const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const getAiApproach =  (summary,description,taskId) =>{
    console.log("Searching for "+summary)
    axiosInstance.post("/guidance",{summary:summary,description:description}).then( res=>{
      console.log(res);

      if(res.data.error != undefined){
        alert("Something went wrong please try again")
        window.location.reload();
        throw new Error("Failed to fetch guidance");
      }
      // Update the task with the fetched guidance
        setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, aiSuggestions: res.data.guidance } : t
        )
      );
    
    }).catch(err=>{
      console.log(err);
    })
  }
  // Fetch tasks from the backend and add effort estimation using Gemini API
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch tasks from the backend
        const response = await fetch("http://localhost:8080/jira/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // localStorage.removeItem("token");
          // history.push("/login");
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        // console.log(data)
        // Estimate effort for each task using Google Gemini API
        const tasksWithEffort = await Promise.all(
          data.All.map(async (task) => {
            // const effort = await estimateEffort(task.fields.summary, task.fields.description, `Estimate the effort required for the following task:\n\nTask Summary: ${task.fields.summary}\nDescription: ${
            //   task.fields.description || "No description provided"
            // }\n\nRespond with 'Low', 'Medium', or 'High'.`);
            return { ...task };
          })
        );

        setTasks(tasksWithEffort);
        setFilteredTasks(tasksWithEffort);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  
  if (loading) {
    return <div className="text-center mt-10">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          {/* <h1 className="text-2xl font-semibold text-gray-800">My Tasks</h1> */}
          <p className="text-gray-600">Here's your personalized task overview with AI-powered insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard getAiApproach={()=>getAiApproach(task.fields.summary,parseJiraDescription(task.fields.description),task.id)} key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;