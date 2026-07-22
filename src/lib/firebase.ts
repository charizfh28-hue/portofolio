import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ProfileData, Skill, Project, Experience } from '../types';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firestore instance with database ID if specified
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export interface PortfolioDocument {
  profile: ProfileData;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  updatedAt?: string;
}

const PORTFOLIO_DOC_REF = doc(db, 'portfolio', 'data');

/**
 * Subscribe to real-time updates for portfolio data across all devices.
 */
export function subscribeToPortfolio(
  onData: (data: PortfolioDocument) => void,
  initialDefaults: PortfolioDocument
) {
  let isInitial = true;

  const unsubscribe = onSnapshot(
    PORTFOLIO_DOC_REF,
    async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as PortfolioDocument;
        if (data.profile && data.skills && data.projects && data.experiences) {
          onData(data);
        }
      } else if (isInitial) {
        // Document does not exist yet on Firestore, seed it with initial default data
        isInitial = false;
        try {
          await setDoc(PORTFOLIO_DOC_REF, {
            ...initialDefaults,
            updatedAt: new Date().toISOString(),
          });
          onData(initialDefaults);
        } catch (err) {
          console.error('Error seeding initial portfolio data to Firestore:', err);
          onData(initialDefaults);
        }
      }
    },
    (error) => {
      console.error('Firestore subscription error:', error);
    }
  );

  return unsubscribe;
}

/**
 * Save updated portfolio section or full data to Firestore for permanent syncing across all devices.
 */
export async function savePortfolioToFirestore(
  partialOrFullData: Partial<PortfolioDocument>
) {
  try {
    const existingSnap = await getDoc(PORTFOLIO_DOC_REF);
    const currentData = (existingSnap.exists()
      ? existingSnap.data()
      : {}) as Partial<PortfolioDocument>;

    const updatedData: PortfolioDocument = {
      profile: (partialOrFullData.profile || currentData.profile)!,
      skills: (partialOrFullData.skills || currentData.skills)!,
      projects: (partialOrFullData.projects || currentData.projects)!,
      experiences: (partialOrFullData.experiences || currentData.experiences)!,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(PORTFOLIO_DOC_REF, updatedData, { merge: true });
    return true;
  } catch (error) {
    console.error('Failed to save to Firestore:', error);
    throw error;
  }
}

/**
 * Reset portfolio data in Firestore back to initial default values.
 */
export async function resetPortfolioInFirestore(defaultData: PortfolioDocument) {
  try {
    const dataToSave = {
      ...defaultData,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(PORTFOLIO_DOC_REF, dataToSave);
    return true;
  } catch (error) {
    console.error('Failed to reset Firestore data:', error);
    throw error;
  }
}
