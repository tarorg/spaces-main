import { Innertube } from 'youtubei.js';
import { Red } from '../misc/console-text.js'

const bail = (...msg) => {
    console.error(...msg);
    throw new Error(msg);
};

const tube = await Innertube.create();

tube.session.once(
    'auth-pending',
    ({ verification_url, user_code }) => {
        console.log(`${Red('[!]')} The token generated by this script is sensitive and you should not share it with anyone!`);
        console.log(`    By using this token, you are risking your Google account getting terminated.`);
        console.log(`    You should ${Red('NOT')} use your personal account!`);
        console.log();
        console.log(`Open ${verification_url} in a browser and enter ${user_code} when asked for the code.`);
    }
);

tube.session.once('auth-error', (err) => bail('An error occurred:', err));
tube.session.once('auth', ({ credentials }) => {
    if (!credentials.access_token) {
        bail('something went wrong');
    }

    console.log(
        'add this cookie to the youtube_oauth array in your cookies file:',
        JSON.stringify(
            Object.entries(credentials)
                .map(([k, v]) => `${k}=${v instanceof Date ? v.toISOString() : v}`)
                .join('; ')
        )
    );
});

await tube.session.signIn();