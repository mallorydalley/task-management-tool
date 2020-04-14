insert into tasks (
    title,
    img,
    description,
    status,
    employee_id,
    folder_id
) values (
    ${title},
    ${img},
    ${description},
    'New',
    1,
    1
);