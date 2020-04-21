create table employees (
    employee_id serial primary key,
    email varchar(150) not null,
    password varchar(200) not null,
    first_name varchar(50),
    last_name varchar(50),
    profile_pic TEXT
);

create table tasks (
    task_id serial primary key,
    title varchar(150) not null,
    img text,
    description text,
    status varchar(25),
    employee_id int references employee(employee_id),
    folder_id int references folder(folder_id)
);

create table folders (
    folder_id serial primary key,
    name varchar(50)
);

create table comments (
    comment_id serial primary key,
    comment text,
    task_id int references tasks(task_id),
    employee_id int references employees(employee_id)
)