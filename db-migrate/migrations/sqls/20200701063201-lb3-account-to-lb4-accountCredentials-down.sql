-- UPDATE ACCOUNT (back)
ALTER TABLE public.account
ADD COLUMN password text NOT NULL;

-- MIGRATE PASSWORDS (back)
UPDATE public.account 
    SET password = public.credential.password
    FROM public.credential
    WHERE public.account.id = public.credential.accountId;

-- CREATE THE NEW TABLE (back)
DROP TABLE public.credential;
DROP SEQUENCE public.credential_seq;
