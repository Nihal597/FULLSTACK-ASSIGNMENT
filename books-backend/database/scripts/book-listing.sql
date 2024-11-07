-- Table: book-users.book-listing

-- DROP TABLE IF EXISTS "book-users"."book-listing";

CREATE TABLE IF NOT EXISTS "book-users"."book-listing"
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_time timestamp without time zone NOT NULL DEFAULT now(),
    condition character varying COLLATE pg_catalog."default",
    availability_statusus character varying COLLATE pg_catalog."default",
    owner_id uuid NOT NULL,
    genre character varying COLLATE pg_catalog."default",
    title character varying COLLATE pg_catalog."default",
    author character varying COLLATE pg_catalog."default",
    CONSTRAINT "book-listing_pkey" PRIMARY KEY (id),
    CONSTRAINT owner_id FOREIGN KEY (owner_id)
        REFERENCES "book-users".users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "book-users"."book-listing"
    OWNER to bookexchange_user;