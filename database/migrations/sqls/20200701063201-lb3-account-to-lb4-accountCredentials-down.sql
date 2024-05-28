-- UPDATE ACCOUNT (back - 1)
ALTER TABLE public.account
ADD COLUMN password text;

-- MIGRATE PASSWORDS (back)
UPDATE public.account 
    SET password = public.credential.password
    FROM public.credential
    WHERE public.account.id = public.credential.accountId;

-- UPDATE ACCOUNT (back - 2)
ALTER TABLE public.account
ALTER COLUMN password SET NOT NULL;


-- CREATE THE NEW TABLE (back)
DROP TABLE public.credential;
