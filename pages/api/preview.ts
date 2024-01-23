// pages/api/preview.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, getDocs, collection} from 'firebase/firestore';
import app from '@/utils/firebase';

// Type for preview data
type PreviewData = {
  title: string;
  description: string;
  image: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PreviewData | { message: string }>) {
  const courseId = req.query.courseId as string; // Extract course ID from URL query

  try {
    const firestore = getFirestore(app);
    const courseDoc = await getDocs(collection(firestore, 'Courses'));

    if (courseDoc.length == 0) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    let courseDatas : Array<PreviewData> = [];

    courseDoc.forEach((doc: DocumentData)  => {
      courseDatas.concat({id: doc.id, ...doc.data()})
    });

    res.json(courseDatas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}