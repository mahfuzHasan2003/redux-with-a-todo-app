"use client";

import {
  addTodo,
  loadFromStorage,
  removeTodo,
  toggleTodo,
} from "@/redux/features/todoSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Todo() {
  const [text, setText] = useState("");
  const [editID, setEditID] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    dispatch(loadFromStorage(savedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (text.trim()) {
      if (editID) {
        dispatch(removeTodo(editID));
        dispatch(addTodo(`${text} (edited)`));
        setEditID(null);
      } else {
        dispatch(addTodo(text));
      }
      setText("");
    }
  };

  const handleEditTodo = (todo) => {
    setText(todo.text);
    setEditID(todo.id);
  };
  return (
    <div className="w-md mx-auto">
      <div className="flex gap-5 items-center w-full my-5">
        <input
          type="text"
          placeholder="Add new todo"
          value={text || ""}
          onChange={(e) => setText(e.target.value)}
          className="focus:outline-none border px-2 py-3 rounded-md flex-grow"
        />
        <button
          className="cursor-pointer bg-gray-200 px-5 py-3 rounded-md text-gray-800 font-semibold hover:bg-blue-300"
          onClick={() => dispatch(handleAddTodo)}
        >
          {editID ? "Edit Todo" : "Add Todo"}
        </button>
      </div>

      {/* todos  */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-3 rounded-md shadow-md ${
              todo.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <div
              className={`flex flex-col cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              <span>{todo.text}</span>
              <span>{new Date(todo.id).toLocaleString()}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEditTodo(todo)}
                className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
