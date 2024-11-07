-- Table: book-users.password-recovery

-- DROP TABLE IF EXISTS "book-users"."password-recovery";

CREATE TABLE IF NOT EXISTS "book-users"."password-recovery"
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    code character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" uuid NOT NULL,
    CONSTRAINT "password-recovery_pkey" PRIMARY KEY (id),
    CONSTRAINT "password-recovery_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES "book-users".users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "book-users"."password-recovery"
    OWNER to bookexchange_user;