-- CREATE THE NEW TABLE 
CREATE SEQUENCE public.credential_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public.credential_seq OWNER TO uvxambmmdmibwh;

CREATE TABLE public.credential
(
    id integer NOT NULL DEFAULT nextval('credential_seq'::regclass),
    accountId integer NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT account_credential_fkey FOREIGN KEY (accountId)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE public.credential OWNER to uvxambmmdmibwh;

-- MIGRATE PASSWORDS
INSERT INTO public.credential (accountId, password)
    SELECT id, password FROM public.account;
	
-- UPDATE ACCOUNT
ALTER TABLE public.account
DROP COLUMN password;

