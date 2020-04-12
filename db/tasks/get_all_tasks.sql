select t.title, t.img, t.description, t.status, e.first_name, e.last_name, e.profile_pic from employees e
join tasks t on t.employee_id = e.employee_id;