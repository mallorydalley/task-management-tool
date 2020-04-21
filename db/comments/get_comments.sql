select c.comment, e.profile_pic, e.first_name, e.last_name from employees e
join comments c on e.employee_id = c.employee_id
join tasks t on t.task_id = c.task_id
where t.task_id = $1;