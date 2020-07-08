-- CREATE THE NEW TABLE
CREATE TABLE public.credential
(
    id serial PRIMARY KEY,
    accountId integer NOT NULL,
    password text NOT NULL,
    CONSTRAINT account_credential_fkey FOREIGN KEY (accountId) REFERENCES public.account (id) 
);

-- MIGRATE PASSWORDS
INSERT INTO public.credential (accountId, password)
    SELECT id, password FROM public.account;
	
-- UPDATE ACCOUNT
ALTER TABLE public.account
DROP COLUMN password;