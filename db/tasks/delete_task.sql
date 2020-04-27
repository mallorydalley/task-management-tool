-- delete from tasks
-- where task_id = $1;

delete from comments 
where task_id = $1;

delete from tasks where task_id = $1;

-- DELETE FROM tasks FROM tasks INNER JOIN comments ON tasks.task_id = comments.task_id WHERE comments.task_id = $1;
-- DELETE FROM comments WHERE comments.task_id = $1;
-- DELETE FROM tasks WHERE tasks.task_id = $1;

-- alter table comments
-- drop constraint task_id

-- alter table comments
--     add constraint task_id_cascade
--     foreign key (task_id) references tasks(task_id) on delete cascade;