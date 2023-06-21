import React, { useContext, useState } from "react";
import Moment from "moment";
import { Box, Text, TextInput, Button, CheckBox, Select, Stack } from "grommet";
import Context from "@context/Context.js";

const Task = (props) => {
  const {
    setTaskData,
    setUpdateTask,
    currentTask,
    setCurrentTask,
    deleteTask,
  } = useContext(Context);
  const formatDate = Moment(props.task.dueDate).format("DD-MM-YYYY");

  const handleUpdate = () => {
    setUpdateTask(true);
    setTaskData(props.task);
    props.setOpenModal(true);
  };

  const handlePick = () => {
    setCurrentTask(props.task.title);
  };

  const handleDelete = (title) => {
    console.log(title);
    deleteTask(title);
  };

  return (
    <Box
      pad="medium"
      border={{ color: "border", size: "small" }}
      round="small"
      gap="small"
      style={{ position: "relative", paddingBottom: 0, marginBottom: "1rem" }}
    >
      <Text size="large">{props.task.title}</Text>
      <Text>{props.task.description}</Text>
      <Text>Due Date: {formatDate}</Text>
      <Box direction="row" align="center" gap="small">
        <Text>Tomatoes:</Text>
        <Text>{props.task.tomatoes}</Text>
      </Box>
      <Box direction="row" align="center" gap="small">
        <Text>{props.task.completed ? "Completed" : "Not completed"}</Text>
      </Box>
      <Button
        primary
        style={{
          backgroundColor: "#FFCA58",
          borderColor: "#FFCA58",
          position: "absolute",
          right: "1rem",
        }}
        onClick={handleUpdate}
        label="Update"
      />
      <Button
        primary
        style={{
          backgroundColor: "#FFCA58",
          borderColor: "#FFCA58",
          position: "absolute",
          right: "1rem",
          top: 70,
        }}
        onClick={handlePick}
        disabled={currentTask === props.task.title}
        label={currentTask === props.task.title ? "Picked" : "Pick task"}
      />
      <Button
        primary
        style={{
          backgroundColor: "#FFCA58",
          borderColor: "#FFCA58",
          position: "absolute",
          right: "1rem",
          top: 115,
        }}
        onClick={() => handleDelete(props.task.title)}
        label="Delete"
      />
    </Box>
  );
};

export default Task;
