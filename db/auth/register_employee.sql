insert into employees(
    email,
    password,
    first_name,
    last_name,
    profile_pic
) values (
    ${email},
    ${password},
    ${first_name},
    ${last_name},
    ${profile_pic}
)

returning employee_id, first_name, last_name, profile_pic;