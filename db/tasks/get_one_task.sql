-- select * from tasks
-- where task_id = $1;

-- select t.task_id, t.title, t.img, t.description, t.status, e.first_name, e.last_name, e.profile_pic, e.employee_id from employees e
-- join tasks t on t.employee_id = e.employee_id
-- where t.task_id = $1;

select t.task_id, t.title, t.img, t.description, t.status, e.first_name, e.last_name, e.profile_pic, e.employee_id, f.folder_id, f.name from tasks t
join employees e on t.employee_id = e.employee_id
join folders f on f.folder_id = t.folder_id
where t.task_id = $1;

-- select t.task_id, t.title, t.img, t.description, t.status, e.first_name, e.last_name, e.profile_pic, e.employee_id, f.folder_id, f.name from tasks t
-- join employees e on t.employee_id = e.employee_id
-- join folders f on f.folder_id = t.folder_id
-- where t.task_id = $1
-- and f.folder_id = $2;

