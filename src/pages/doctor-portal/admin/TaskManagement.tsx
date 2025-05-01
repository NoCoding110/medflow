import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  completed: boolean;
}

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review patient records",
      description: "Review and update patient records for upcoming appointments",
      priority: "High",
      dueDate: "2024-04-30",
      completed: false,
    },
    {
      id: "2",
      title: "Update medical protocols",
      description: "Update COVID-19 protocols based on new guidelines",
      priority: "Medium",
      dueDate: "2024-05-05",
      completed: false,
    },
    {
      id: "3",
      title: "Schedule team meeting",
      description: "Coordinate monthly staff meeting",
      priority: "Low",
      dueDate: "2024-05-10",
      completed: false,
    },
  ]);

  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "completed">>({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleCreateTask = () => {
    if (!newTask.title) {
      toast.error("Please enter a task title");
      return;
    }

    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTask,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setIsNewTaskDialogOpen(false);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: new Date().toISOString().split("T")[0],
    });
    toast.success("Task created successfully");
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast.success(task.completed ? "Task marked as incomplete" : "Task marked as complete");
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Task deleted successfully");
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track administrative tasks
          </p>
        </div>
        <Button onClick={() => setIsNewTaskDialogOpen(true)}>New Task</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <Checkbox 
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleToggleTask(task.id)}
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {task.title}
                    </label>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority} Priority
                      </span>
                      <span className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tasks found. Create a new task to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: Task["priority"]) =>
                  setNewTask({ ...newTask, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskManagement; 