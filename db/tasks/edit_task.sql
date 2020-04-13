update tasks
set
    title=${title},
    img=${img},
    description=${description},
    status=${status},
    employee_id=${employee_id},
    folder_id=${folder_id}
where task_id = ${task_id};

select * from tasks;