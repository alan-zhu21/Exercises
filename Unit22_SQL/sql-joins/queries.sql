-- write your queries here

SELECT *
FROM owners o
FULL JOIN vehicles v
ON o.id = v.owner_id;


SELECT o.first_name, o.last_name, COUNT(*)
FROM owners o
JOIN vehicles v
ON v.owner_id = o.id
GROUP BY o.first_name, o.last_name
ORDER BY o.first_name;


SELECT o.first_name, o.last_name, AVG(v.price) AS average_price, COUNT(*)
FROM owners o
JOIN vehicles v
ON v.owner_id = o.id
GROUP BY o.first_name, o.last_name
HAVING AVG(v.price) > 10000 AND COUNT(*) > 1 ORDER BY o.first_name DESC;