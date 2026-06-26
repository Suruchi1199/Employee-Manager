import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { getTaskStatus } from '../../utils/localStorage'

const TaskList = ({ data, updateEmployeeTasks }) => {
    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {data.tasks.map((elem, idx) => {
                const status = getTaskStatus(elem)

                if (status === 'active') {
                    return <AcceptTask key={idx} data={elem} onComplete={() => updateEmployeeTasks(data.id, idx, 'completed')} onFail={() => updateEmployeeTasks(data.id, idx, 'failed')} />
                }

                if (status === 'newTask') {
                    return <NewTask key={idx} data={elem} onAccept={() => updateEmployeeTasks(data.id, idx, 'active')} />
                }

                if (status === 'completed') {
                    return <CompleteTask key={idx} data={elem} />
                }

                if (status === 'failed') {
                    return <FailedTask key={idx} data={elem} />
                }

                return null
            })}
        </div>
    )
}

export default TaskList
