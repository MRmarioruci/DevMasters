import {db} from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp, FieldValue } from "firebase/firestore"; 

interface INewsletterDocument{
	email: string,
	category:  'Cheatsheets' | 'Projects' | 'Anti-patterns' | 'Leetcode' | string
	creationDate?: FieldValue,
}
interface ISuggestionDocument{
	type: string;
	group: string;
	title: string;
	description: string;
	code?: string;
	linkedin?: string;
	creationDate?: FieldValue;
}

function useDatabase(targetCollection: string) {
	const currentCollection = collection(db, targetCollection);
	
	async function getFromDatabase(document?: string){
		try {
			const querySnapshot = await getDocs(currentCollection);

			if (querySnapshot.empty) {
				console.log('No documents found.');
				return;
			}

			const documents: any = [];
			querySnapshot.forEach((doc) => {
				documents.push({
					id: doc.id,
					...doc.data(),
				});
			});
			return documents;
		} catch (error) {
			console.error(error);
		}
		return null;
	}
	async function addNewsletter(newDocument:INewsletterDocument){
		try {
			const existingEmails = await getFromDatabase();
			if(!existingEmails) return null;
			
			const emailExists = existingEmails.find( (doc: INewsletterDocument) => doc.email === newDocument.email);
			if(emailExists) return 'exists';
			
			newDocument.creationDate = serverTimestamp();
			const newDocRef = await addDoc(currentCollection, newDocument);
			console.log('Newsletter item added with ID:', newDocRef.id);
			return 'added';
		} catch (error) {
			console.error('Error adding newsletter item:', error);
		}
		return null;
	}
	async function addSuggestion(newDocument:ISuggestionDocument){
		try {
			newDocument.creationDate = serverTimestamp();
			const newDocRef = await addDoc(currentCollection, newDocument);
			console.log('Suggestion item added with ID:', newDocRef.id);
			return 'success';
		} catch (error) {
			console.error('Error adding suggestion item:', error);
		}
		return null;
	}
	return {
		getFromDatabase,
		addNewsletter,
		addSuggestion
	}
}
export default useDatabase