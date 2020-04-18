-- select t.task_id, t.title, t.img, t.description, t.status, e.first_name, e.last_name, e.profile_pic from employees e
-- join tasks t on t.employee_id = e.employee_id;


select t.task_id, t.title, t.img, t.description, t.status, e.first_name, e.last_name, e.profile_pic, e.employee_id, f.folder_id, f.name from tasks t
join employees e on t.employee_id = e.employee_id
join folders f on f.folder_id = t.folder_id
where f.folder_id = $1;


