import {Client, expect} from '@loopback/testlab';
import {testdb} from '../../helpers/testdb';
import {PubAccount} from '../../../models';
import {PubAccountRepository} from '../../../repositories';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {GeovistoryServer} from '../../../server';
import {AccountService} from '../../../services/account.service';
import {PasswordResetTokenService} from '../../../services/password-reset-token.service';
import {SqlBuilderBase} from '../../../utils/sql-builders/sql-builder-base';
import {cleanDb} from '../../helpers/cleaning/clean-db.helper';
import {createAccount, createAccountVerified} from '../../helpers/graphs/account.helper';
import {createSandBoxProject} from '../../helpers/graphs/project.helpers';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {init} from '../../helpers/graphs/init.helper';

const qs = require('querystring');


//TODO: add test with ETHEREAL

describe('AccountController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => {({server, client} = await setupApplication());});
    after(async () => {await server.stop();});

    describe('POST /login', () => {
        beforeEach(async () => {
            await cleanDb();
            await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', 'testtest1');
        })

        it('should reject the request because credentials are wrong', async () => {
            const res = await client.post('/login').send({email: "foo", password: "bar"});
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.containEql({statusCode: 401});
        })

        it('should accept request', async () => {
            const res = await client.post('/login').send({email: "gaetan.muck@kleiolab.ch", password: "testtest1"});
            expect(res.body.user.id).to.be.a.Number();
        })
    });

    describe('GET /whoAmI', () => {

        beforeEach(async () => {
            await cleanDb();
            await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', 'testtest1');
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
            const res1 = await client.post('/login').send({email: "gaetan.muck@kleiolab.ch", password: "testtest1"});
            const res2 = await client.get('/whoAmI').set('Authorization', res1.body.lb4Token);
            expect(parseInt(res2.text)).to.be.a.Number();
        })
    });

    describe('POST /signup', () => {
        beforeEach(async () => {
            await cleanDb();
            await init();
            await createSandBoxProject();
            await createAccountVerified('gaetan.muck@gmail.com', 'gaetanmuck', 'testtest1');
        });

        it('should reject the request because the email is at wrong format', async () => {
            const res = await client.post('/signup').send({email: 'foobar', username: "foo", password: "bar"});
            expect(res.body.error).to.containEql({statusCode: 422});
        })

        it('should reject the request because the username already exists', async () => {
            const res = await client.post('/signup').send({email: 'gaetan.muck@gmail.com', username: "gaetanmuck", password: "helloworld1"});
            expect(res.body.validationError.username).to.be.equal('Username already exists');
        })

        it('should reject the request because the email already exists', async () => {
            const res = await client.post('/signup').send({email: 'gaetan.muck@gmail.com', username: "gaetanmuck2", password: "helloworld1"});
            expect(res.body.validationError.email).to.be.equal('Email already exists');
        })

        it('should accept request and send validation email (email sending/reception is not checked)', async () => {
            const res = await client.post('/signup').send({email: 'gaetan.muck@kleiolab.ch', username: "gaetanmuck2", password: "helloworld1"});
            expect(res.body.success.id).to.be.a.Number();
        })
    });

    describe('GET /verify-email', () => {
        const validationToken = 'foobarToken';
        beforeEach(async () => {
            await cleanDb();
            await init();
            await createSandBoxProject();
        });

        it('should reject the request because the verification token is false (info: the link is not taken from the email)', async () => {
            const accountid = (await client.post('/signup').send({email: "gaetan.muck@kleiolab.ch", username: "gaetanmuck", password: "testtest1"})).body.success.id;
            const params = {
                accountId: accountid,
                verificationToken: 'blablabla',
                redirectOnSuccess: 'home'
            }
            const res = await client.get('/verify-email?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 401, message: 'Invalid token: ' + params.verificationToken});
        })

        it('should reject the request because the accountid does not exist (info: the link is not taken from the email)', async () => {
            const params = {
                accountId: -1,
                verificationToken: validationToken,
                redirectOnSuccess: 'home'
            }
            const res = await client.get('/verify-email?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 404, message: 'Entity not found: PubAccount with id -1'});
        })

        it('should accept request (info: the verification is not taken from the email)', async () => {
            const acc = await createAccount('gaetan.muck@kleiolab.ch', 'gaetanmuck', 'testtest1', validationToken);
            const params = {
                accountId: acc.id,
                verificationToken: validationToken,
                redirectOnSuccess: 'home'
            }
            const res = await client.get('/verify-email?' + qs.stringify(params));
            expect(JSON.stringify(res.body)).to.equal('{}');

            const q = new SqlBuilderBase();
            q.sql = 'SELECT emailverified as col FROM public.account WHERE id = ' + q.addParam(acc.id) + ';'
            const result = await testdb.execute(q.sql, q.params);
            expect(result[0].col).to.be.true();
        })
    })

    describe('GET /forgot-password', () => {
        const token = 'foobarToken';
        beforeEach(async () => {
            await cleanDb();
        });

        it('should reject the request because the email is not known', async () => {
            const params = {email: 'foo.bar@helloworld.com'};
            const res = await client.get('/forgot-password?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 404, message: "Email '" + params.email + "' not found"});
        })

        it('should reject the request because the email is not yet verified', async () => {
            await createAccount('gaetan.muck@kleiolab.ch', 'gaetanmuck', 'testtest1', token);
            const params = {email: 'gaetan.muck@kleiolab.ch'};
            const res = await client.get('/forgot-password?' + qs.stringify(params));
            expect(res.body.error).to.containEql({statusCode: 401, message: "Email not yet verified."});
        })

        it('should accept request (info: email sending is not checked)', async () => {
            await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', 'testtest1');
            const params = {email: 'gaetan.muck@kleiolab.ch'};
            const res = await client.get('/forgot-password?' + qs.stringify(params));
            expect(res.body).to.containEql({message: "Email to reset password has been sent to " + params.email});
        })
    });

    describe('POST /reset-password', () => {
        const email = 'gaetan.muck@kleiolab.ch';
        beforeEach(async () => {
            await cleanDb();
            await createAccountVerified(email, 'gaetanmuck', 'testtest1');
        });

        it('should reject the request because the verification token is wrong', async () => {
            const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            const res = await client.post('/reset-password').send({resetPasswordToken: jwt, password: "HelloworldPwd1"});
            expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid signature"});
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
            const res = await client.post('/reset-password').send({resetPasswordToken: passwordResetToken, password: "HelloworldPwd1"});
            expect(res.body.message).to.equal('Password reset successful');
        });
    })
});

