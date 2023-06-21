import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Heading,
  Layer,
  TextInput,
} from "grommet";
import Context from "../../Context";

const Modal = ({ showModal, setShowModal, text }) => {
  const { taskData, addNewTask, updateTask, setUpdateTask, updateTaskData } =
    useContext(Context);

  const [title, setTitle] = useState(taskData.title);
  const [description, setDescription] = useState(taskData.description);
  const [dueDate, setDueDate] = useState(taskData.dueDate);
  const [tomatoes, setTomatoes] = useState(taskData.tomatoes);
  const [completed, setCompleted] = useState(taskData.completed);

  useEffect(() => {
    setTitle(taskData.title);
    setDescription(taskData.description);
    setDueDate(taskData.dueDate);
    setTomatoes(taskData.tomatoes);
    setCompleted(taskData.completed);
  }, [taskData]);

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      title: title,
      description: description,
      dueDate: new Date(dueDate).getTime(),
      tomatoes: tomatoes,
      completed: completed,
    };
    addNewTask(task);
    setShowModal(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setTomatoes(0);
    setCompleted(false);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const task = {
      title: title,
      description: description,
      dueDate: new Date(dueDate).getTime(),
      tomatoes: tomatoes,
      completed: completed,
    };
    updateTaskData(task);
    setShowModal(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setTomatoes(0);
    setCompleted(false);
  };

  return (
    <Box>
      {showModal && (
        <Layer
          margin="small"
          onEsc={() => setShowModal(false)}
          onClickOutside={() => setShowModal(false)}
        >
          <Box pad="xlarge" style={{ width: "40rem" }}>
            <Heading level={3}>{text}</Heading>
            <Form>
              <FormField name="title" label="Title">
                <TextInput
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormField>
              <FormField name="description" label="Description">
                <TextInput
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormField>
              <FormField name="dueDate" label="Due Date">
                <TextInput
                  type="date"
                  name="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </FormField>
              <FormField name="tomatoes" label="Tomatoes spent">
                <TextInput
                  name="tomatoes"
                  type="number"
                  value={tomatoes}
                  onChange={(e) => setTomatoes(e.target.value)}
                />
              </FormField>
              <FormField name="completed">
                <CheckBox
                  name="completed"
                  checked={completed}
                  label="Completed"
                  onChange={() => setCompleted(!completed)}
                />
              </FormField>
              <Box direction="row" justify="end" margin={{ top: "medium" }}>
                {updateTask ? (
                  <Button
                    type="submit"
                    label="Update Task"
                    onClick={(e) => handleUpdateTask(e)}
                    primary
                    style={{
                      backgroundColor: "#FFCA58",
                      borderColor: "#FFCA58",
                    }}
                  />
                ) : (
                  <Button
                    type="submit"
                    label="Add Task"
                    onClick={(e) => handleAddTask(e)}
                    primary
                    style={{
                      backgroundColor: "#FFCA58",
                      borderColor: "#FFCA58",
                    }}
                  />
                )}
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Modal;
