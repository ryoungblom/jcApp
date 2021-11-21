import firebase from 'firebase';
import { fbApp } from './firebase';

const db = fbApp.firestore();

export const firestoreDB = db;
