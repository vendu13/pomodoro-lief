import { createContext, useEffect, useRef, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";

import { Prisma } from "@prisma/client";

export const client = new ApolloClient({
  uri: "https://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

const Context = createContext();

export function ContextProvider({ children }) {
  /* State to track if needed data fetching from server */
  const [currentTask, setCurrentTask] = useState("");
  const [stateChanged, setStateChanged] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    tomatoes: 0,
    completed: false,
  });
  const GET_DATA_QUERY = gql`
    query GetData {
      todos {
        id
        title
        description
        dueDate
        completed
        tomatoes
      }
    }
  `;
  const UPDATE_TODO_MUTATION = gql`
    mutation UpdateTodoMutation(
      $id: ID!
      $title: String!
      $description: String!
      $dueDate: String!
      $tomatoes: Int!
    ) {
      updateTodo(
        id: $id
        title: $title
        description: $description
        dueDate: $dueDate
        tomatoes: $tomatoes
      ) {
        id
        title
        description
        dueDate
        tomatoes
      }
    }
  `;
  const CREATE_TODO_MUTATION = gql`
    mutation CreateTodo(
      $title: String!
      $description: String!
      $dueDate: String!
      $tomatoes: Int!
      $completed: Boolean!
    ) {
      createTodo(
        data: {
          title: $title
          description: $description
          dueDate: $dueDate
          tomatoes: $tomatoes
          completed: $completed
        }
      ) {
        id
        title
        description
        dueDate
        tomatoes
        completed
      }
    }
  `;
  const [createTodo] = useMutation(CREATE_TODO_MUTATION);
  const handleAddTodo = async (
    title,
    description,
    dueDate,
    tomatoes,
    completed
  ) => {
    try {
      const { data } = await createTodo({
        variables: {
          title,
          description,
          dueDate,
          tomatoes,
          completed,
        },
      });
      console.log("Created todo:", data.createTodo);
      // Handle success or perform any additional actions
    } catch (error) {
      console.error("Error creating todo:", error);
      // Handle error or display an error message
    }
  };
  //   const [updateTodo] = useMutation(UPDATE_TODO_MUTATION);
  /* Data from server */
  const [userData, setUserData] = useState({
    email: "johnwick@test.com",
    fullName: "John Wick",
    tasks: [
      {
        title: "Homework",
        description: "Make a math, philosophy, programming",
        dueDate: 1688106206316,
        tomatoes: 4,
        completed: false,
      },
      {
        title: "Make a site",
        description: "Make a site with vite.js, redux, tailwindCss",
        dueDate: 1697106206316,
        tomatoes: 7,
        completed: false,
      },
    ],
  });

  const [data, setData] = useState(userData.tasks);

  /* Id of opened task at the moment */
  const [openedId, setOpenedId] = useState("");

  useEffect(() => {
    /* Fetch data from server */
    handleAddTodo("Hi", "Hi", "12:02:23", 8, false);
    setStateChanged(false);
  }, [stateChanged]);
  const { loading, error, data: queryData } = useQuery(GET_DATA_QUERY);
  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);
  const addNewTask = async (task) => {
    data.push(task);
    //setStateChanged(true)
  };

  const deleteTask = async (taskTitle) => {
    const index = data.findIndex((el) => el.title === taskTitle);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    setOpenedId("");
    //setStateChanged(true)
  };

  const updateTaskData = async (task) => {
    const index = data.findIndex((el) => el.tomatoes === task.tomatoes);
    const newData = [...data];
    newData[index] = task;
    setData(newData);
    setUpdateTask(false);
  };

  return (
    <Context.Provider
      value={{
        openedId,
        setOpenedId,
        data,
        addNewTask,
        taskData,
        setTaskData,
        updateTask,
        setUpdateTask,
        updateTaskData,
        currentTask,
        setCurrentTask,
        deleteTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
