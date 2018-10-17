import * as firebaseHelper from 'firebase-functions-helper';
import * as functions from 'firebase-functions';

export class ContactsRoutes {

    public routes(app: any, db: any): void {

        const contactsCollection = 'contacts';

        // Add new contact
        app.post('/contacts', (req, res) => {
            firebaseHelper.firestore
                .createNewDocument(db, contactsCollection, req.body);
            res.send('Create a new contact');
        })
        // Update new contact
        app.patch('/contacts/:contactId', (req, res) => {
            firebaseHelper.firestore
                .updateDocument(db, contactsCollection, req.params.contactId, req.body);
            res.send('Update a new contact');
        })
        // View a contact
        app.get('/contacts/:contactId', (req, res) => {
            firebaseHelper.firestore
                .getDocument(db, contactsCollection, req.params.contactId)
                .then(doc => res.status(200).send(doc));
        })
        // View all contacts
        app.get('/contacts', (req, res) => {
            firebaseHelper.firestore
                .backup(db, contactsCollection)
                .then(data => res.status(200).send(data))
        })
        // Delete a contact 
        app.delete('/contacts/:contactId', (req, res) => {
            firebaseHelper.firestore
                .deleteDocument(db, contactsCollection, req.params.contactId);
            res.send('Document deleted');
        })
    }

}
