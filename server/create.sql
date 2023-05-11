create sequence _user_seq start with 1 increment by 50;
create table _user (id integer not null, email varchar(255), first_name varchar(255), last_name varchar(255), password varchar(255), role varchar(255), primary key (id));
