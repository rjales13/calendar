import './notes.scss';
import React from 'react';

const Notes = props => (
    <div className='notes'>
        <p>I haven't time enough to dedicate myself into the exercise, so a I can see a lot of things I could do it better. I will not even mention  the appearance, because there's a lot to do on it. I could use some boostrap for example or some layout library, but I guess the purpose was to show my skill and it was I tried to do.</p>
        <p>The UI could be better to. When a user needs to add some reminder, the list disappear. It was a solution I found at that moment, but I know could be better.</p>
        <p>I never actually work with an example like that where I don't store the values, so I had a little bit difficult on reducers, as I wasn't not just receiving and updating data. I guess, in situations like, I was 100% recording on some database. Also the logic to update wasn't exactly a good practice because I am deleting all records from that month and including again.</p>
    </div>
)

export default Notes;