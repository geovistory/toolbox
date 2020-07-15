import {Client, expect} from '@loopback/testlab';
import {GeovistoryServer} from '../../../server';
import {cleanDb} from '../../helpers/cleaning/clean-db.helper';
import {createAccountVerified} from '../../helpers/graphs/account.helper';
import {setupApplication} from '../_test-helper';

describe('AccountController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => {
        ({server, client} = await setupApplication());
        cleanDb().catch(e => {

        });
   await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', 'testtest1');
    });

    beforeEach(async () => {})

    after(async () => {await server.stop();});

    it('/login: Wrong typed credentials', async () => {
        const res = await client.post('/login').send({email: "foo", password: "bar"});
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.containEql({statusCode: 401});
    })

    it('/login: Correct credentials', async () => {
        const res = await client.post('/login').send({email: "gaetan.muck@kleiolab.ch", password: "testtest1"});
        expect(res.body.id).to.be.a.Number;
    })

    it('/whoAmI: Invalid token', async () => {
        const res = await client.get('/whoAmI').set('Authorization', 'HelloWorld');
        expect(res.body).to.containEql({statusCode: 401});
    })

    it('/whoAmI: Absent token', async () => {
        const res = await client.get('/whoAmI');
        expect(res.body).to.containEql({statusCode: 401});
    })

    it('/whoAmI: Valid lb4 token', async () => {
        const res1 = await client.post('/login').send({email: "gaetan.muck@kleiolab.ch", password: "testtest1"});
        const res2 = await client.get('/whoAmI').set('Authorization', res1.body.lb4Token);
        expect(res2.body).to.be.a.Number;
    })
});

