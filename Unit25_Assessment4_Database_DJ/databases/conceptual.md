### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
Postgresql is an open-source structured query language that hels a user interact with a database.

- What is the difference between SQL and PostgreSQL?
Postgresql is a specific type of SQL (structured query language).

- In `psql`, how do you connect to a database?
\c database_name

- What is the difference between `HAVING` and `WHERE`?
having is used to filter records after being aggregated using a group by clause whereas where is used to filter records directly (without or before aggregation)

- What is the difference between an `INNER` and `OUTER` join?
an inner join returns only the records that have a match on the join conditions while an outer join returns records from one of the two joined tables depending on whether it is a left or right outer join.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
a left outer join returns unmatched records from the leftmost table or first table you start with while the right outer join returns unmatched records for the rightmost table or table being joined.

- What is an ORM? What do they do?
ORM stands for object relational mapping which is a way to handle tasks using another language. For instance, SQL Alchemy is an ORM for postgresql which means you can use python commands that "map" to specific postgresql queries that pull records from the database. It helps query the database despite not knowing postgresql.

- What are some differences between making HTTP requests using AJAX and from the server side using a library like `requests`?
Making HTTP requests using AJAX can be done on the client side which can be accessed through a typical web browser; however, a server side request requires another program such as curl, insomnia, postman, or some other tool that sends the request from the server-side. These are typically not from a form which enables one to also use PUT, DELETE, and PATCH requests unlike a clien-side form which can only use POST and GET.

- What is CSRF? What is the purpose of the CSRF token?
The CSRF token is a hidden token usually found in forms on the client side in order to provide a level of protection from cyber criminals. The token is submitted each time the form is submitted and is a way for a server to ensure the information received came from a form/client rather than from code from anywhere. Usually, this is paired with view functions on Flask routes that check for whether the token is present and whether the request is a POST and will not run unless these two conditions are satisfied.

- What is the purpose of `form.hidden_tag()`?
This is to render all the hidden form elements at once.