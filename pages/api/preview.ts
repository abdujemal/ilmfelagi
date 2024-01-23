// pages/api/preview.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, getDocs, collection} from 'firebase/firestore';

// Type for preview data
type PreviewData = {
  title: string;
  description: string;
  image: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PreviewData | { message: string }>) {
  const courseId = req.query.courseId as string; // Extract course ID from URL query

  try {
    const firestore = getFirestore();
    const courseDoc = await  getDocs(collection(firestore, 'courses'));

    if (!courseDoc.exists) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const courseData = courseDoc.data() as PreviewData; // Cast data to PreviewData type

    res.json(courseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}