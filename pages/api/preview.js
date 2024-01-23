// pages/api/preview.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, getDoc, doc} from 'firebase/firestore';
import app from '../../utils/firebase';

// Type for preview data


export default async function handler(req, res) {
  const courseId = req.query.courseId; // Extract course ID from URL query

  try {
    const firestore = getFirestore(app);
    const courseDoc = await getDoc(doc(firestore, "Courses", courseId));

    if (!courseDoc.exists()) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    // let courseDatas = [];

    // courseDoc.data();

    res.json(courseDoc.data());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}