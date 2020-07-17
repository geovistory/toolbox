import {Client, expect} from '@loopback/testlab';
import {GeovistoryServer} from '../../../server';
import {cleanDb} from '../../helpers/cleaning/clean-db.helper';
import {createAccountVerified, createAccount} from '../../helpers/graphs/account.helper';
import {setupApplication} from '../_test-helper';
import {RestExplorerComponent} from '@loopback/rest-explorer';
import {testdb} from '../../../datasources/testdb.datasource';
import {request} from 'http';
import {SqlBuilderBase} from '../../../utils/sql-builder-base';
import {PubAccountRepository} from '../../../repositories';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {AccountService} from '../../../services/account.service';
import {PubAccount} from '../../../models';
import {PasswordResetTokenService} from '../../../services/password-reset-token.service';

const qs = require('querystring');

describe('AccountController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => {
        ({server, client} = await setupApplication());
    });

    beforeEach(async () => {
        await cleanDb();
    })

    after(async () => {
        await server.stop();
    });


    describe('POST /login', async () => {
        before(async () => {
            await createAccountVerified('gaetan.muck@gmail.com', 'gaetanmuck', 'testtest1');
        });

        it('should reject the request because credentials are wrong', async () => {
            const res = await client.post('/login').send({email: "foo", password: "bar"});
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.containEql({statusCode: 401});
        })

        it('should accept request', async () => {
            const res = await client.post('/login').send({email: "gaetan.muck@gmail.com", password: "testtest1"});
            expect(res.body.user.id).to.be.a.Number();
        })
    });

    describe('GET /whoAmI', async () => {
        before(async () => {
            await createAccountVerified('gaetan.muck@gmail.com', 'gaetanmuck', 'testtest1');
        });

        it('should reject the request because token is not valid', async () => {
            const res = await client.get('/whoAmI').set('Authorization', 'HelloWorld');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.containEql({statusCode: 401});
        })

        it('should reject the request because token is absent', async () => {
            const res = await client.get('/whoAmI');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.containEql({statusCode: 401});
        })

        it('should accept request with a valid lb4 token', async () => {
            const res1 = await client.post('/login').send({email: "gaetan.muck@gmail.com", password: "testtest1"});
            const res2 = await client.get('/whoAmI').set('Authorization', res1.body.lb4Token);
            expect(parseInt(res2.text)).to.be.a.Number();
        })
    });

    describe('POST /signup', async () => {
        before(async () => {
            await createAccountVerified('gaetan.muck@gmail.com', 'gaetanmuck', 'testtest1');
        });

        it('should reject the request because the email is at wrong format', async () => {
            const res = await client.post('/signup').send({email: 'foobar', username: "foo", password: "bar"});
            expect(res.body.error).to.containEql({statusCode: 422});
        })

        it('should reject the request because the username already exists', async () => {
            const res = await client.post('/signup').send({email: 'gaetan.muck@gmail.com', username: "gaetanmuck", password: "helloworld"});
            expect(res.body.validationError.username).to.be.equal('Username already exists');
        })

        it('should reject the request because the email already exists', async () => {
            const res = await client.post('/signup').send({email: 'gaetan.muck@gmail.com', username: "gaetanmuck2", password: "helloworld"});
            expect(res.body.validationError.email).to.be.equal('Email already exists');
        })

        it('should accept request and send validation email (email sending/reception is not checked)', async () => {
            const res = await client.post('/signup').send({email: 'gaetan.muck@kleiolab.ch', username: "gaetanmuck2", password: "helloworld"});
            expect(res.body.success);
        })
    });

    describe('GET /verify-email', async () => {
        let validationToken = 'foobarToken';
        before(async () => {
            await createAccount('gaetan.muck@gmail.com', 'gaetanmuck', 'testtest1', validationToken);
        });

        it('should reject the request because theverification token is false (info: the link is not taken from the email)', async () => {
            const accountid = (await client.post('/login').send({email: "gaetan.muck@gmail.com", password: "testtest1"})).body.user.id;
            let params = {
                accountId: accountid,
                verificationToken: 'blablabla',
                redirectOnSuccess: 'home'
            }
            const res = await client.get('/verify-email?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 401, message: 'Invalid token: ' + params.verificationToken});
        })

        it('should reject the request because the accountid does not exist (info: the link is not taken from the email)', async () => {
            const accountid = (await client.post('/login').send({email: "gaetan.muck@gmail.com", password: "testtest1"})).body.user.id;
            let params = {
                accountId: -1,
                verificationToken: validationToken,
                redirectOnSuccess: 'home'
            }
            const res = await client.get('/verify-email?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 404, message: 'Entity not found: PubAccount with id -1'});
        })

        it('should accept request (info: the link is not taken from the email)', async () => {
            const accountid = (await client.post('/login').send({email: "gaetan.muck@gmail.com", password: "testtest1"})).body.user.id;
            let params = {
                accountId: accountid,
                verificationToken: validationToken,
                redirectOnSuccess: 'home'
            }
            const res = await client.get('/verify-email?' + qs.stringify(params));
            expect(res.body).to.be.a.String();

            let q = new SqlBuilderBase();
            q.sql = 'SELECT emailverified as col FROM public.account WHERE if = ' + q.addParam(accountid) + ';'
            let result = await testdb.execute(q.sql, q.params);
            expect(result.col).to.be.true();
        })
    })

    describe('GET /forgot-password', async () => {
        let token = 'foobarToken';
        before(async () => {
            await createAccount('gaetan.muck@kleiolab.ch', 'gaetanmuck', 'testtest1', token);
        });

        it('should reject the request because the email is not known', async () => {
            let params = {email: 'foo.bar@helloworld.com'};
            const res = await client.get('/forgot-password?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 404, message: "Email '" + params.email + "' not found"});
        })

        it('should reject the request because the email is not yet verified', async () => {
            let params = {email: 'gaetan.muck@kleiolab.ch'};
            const res = await client.get('/forgot-password?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 401, message: "Email not yet verified"});
        })

        it('should accept request (info: email sending is not checked)', async () => {
            //switch user to be verified
            const accountid = (await client.post('/login').send({email: "gaetan.muck@gmail.com", password: "testtest1"})).body.user.id;
            let q = new SqlBuilderBase();
            q.sql = 'UPDATE public.account SET verificationToken = NULL, emailverified = true WHERE id = ' + q.addParam(accountid);
            await testdb.execute(q.sql, q.params);

            let params = {email: 'gaetan.muck@gmail.com'};
            const res = await client.get('/forgot-password?' + qs.stringify(params));
            expect(res.body).to.containEql({message: "Email to reset password has been sent to " + params.email});
        })
    });

    describe('POST /reset-password', async () => {
        let email = 'gaetan.muck@kleiolab.ch';
        before(async () => {
            await createAccountVerified(email, 'gaetanmuck', 'testtest1');
        });

        it('should reject the request because the verification token is wrong', async () => {
            const res = await client.post('/reset-password').send({resetPasswordToken: 'thisIsATest', password: "HelloworldPwd"});
            expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid token"});
        });

        it('should accept request', async () => {
            //craft locally the token that is send in the email
            const accountRepository = new PubAccountRepository(testdb, async () => credentialRepository);
            const credentialRepository = new PubCredentialRepository(testdb);
            const accountService = new AccountService(accountRepository);
            const account = await accountRepository.findOne({where: {email: {eq: email}}});
            const userProfile = accountService.convertToUserProfile(account as PubAccount);
            const passwordResetTokenService = new PasswordResetTokenService()
            const passwordResetToken = await passwordResetTokenService.generateToken(userProfile)

            const res = await client.post('/reset-password').send({resetPasswordToken: passwordResetToken, password: "HelloworldPwd"});
            expect(res.body.message).to.be.a.String();
        });
    })
});

