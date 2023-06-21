import React, {useContext, useEffect, useState} from 'react'
import Task from "../../Task/Task";
import styles from './Tasks.module.css'
import {Box, Button} from "grommet";
import Context from "../../../context/Context";
import Modal from "../../Modal/Modal";
import {useUser} from "@auth0/nextjs-auth0/client";


const Tasks = () => {

    const {user} = useUser();
    const {data} = useContext(Context)
    const [tasks, setTasks] = useState(user ? data : [])

    useEffect(() => {
        setTasks(data)
    }, [data])

    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextModal] = useState('Create New Task');


    const handleCreateTask = () => {
        if (!user) {
            alert('Please log in to create a task')
            return
        }
        setTextModal('Create New Task')
        setShowModal(true)
    }

    return (
        <div className={styles.tasks}>
            {tasks.length > 0
                ?
                tasks.map((task) => (
                    <Task id={task.dueDate || 1} task={task} setOpenModal={setShowModal}/>
            ))
            :
                <h2>No tasks</h2>
            }
            <div style={{margin: '1rem 0 auto auto'}}>
                <Button
                    onClick={handleCreateTask}
                    primary
                    style={{backgroundColor: '#FFCA58', borderColor: '#FFCA58'}}
                    label="Create new task"/>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} text={textModal}/>
        </div>
    )
}
export default Tasks
