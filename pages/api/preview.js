// pages/api/preview.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, getDocs, collection} from 'firebase/firestore';
import app from '@/utils/firebase';

// Type for preview data


export default async function handler(req, res) {
  const courseId = req.query.courseId; // Extract course ID from URL query

  try {
    const firestore = getFirestore(app);
    const courseDoc = await getDocs(collection(firestore, 'Courses'));

    if (courseDoc.length == 0) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    let courseDatas = [];

    courseDoc.forEach((doc)  => {
      courseDatas.concat({id: doc.id, ...doc.data()})
    });

    res.json(courseDatas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}