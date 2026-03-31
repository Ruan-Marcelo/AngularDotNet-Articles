create table Appuser(
id INT IDENTITY(1,1) PRIMARY KEY,
name VARCHAR(250),
email VARCHAR(50) unique,
password VARCHAR(250),
status VARCHAR(20),
isDeletable VARCHAR(20)
);

insert into Appuser (name,email,password,status,isDeletable) values ('User','user@email.com','user','false','true');

select * from Appuser