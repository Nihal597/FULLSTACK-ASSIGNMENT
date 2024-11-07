-- Table: book-users.users

-- DROP TABLE IF EXISTS "book-users".users;

CREATE TABLE IF NOT EXISTS "book-users".users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    location character varying COLLATE pg_catalog."default",
    created_time timestamp without time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "book-users".users
    OWNER to bookexchange_user;