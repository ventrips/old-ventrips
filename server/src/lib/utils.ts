import { Firestore } from '@google-cloud/firestore';

export const firestore = new Firestore({
    keyFilename: './../../../../ventrips-214422-firebase-adminsdk-w9d9x-fa4567e61b.json',
    projectId: 'ventrips-214422',
});
