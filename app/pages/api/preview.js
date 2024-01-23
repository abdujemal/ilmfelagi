// pages/api/preview.js
import { getFirestore } from 'firebase/firestore';

const firestore = getFirestore();

export default async function handler(req, res) {
  const { courseId } = req.query;

  try {
    const courseDoc = await firestore.collection('courses').doc(courseId).get();

    if (!courseDoc.exists) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const courseData = courseDoc.data();
    const previewData = {
      title: courseData.title,
      description: courseData.description,
      image: courseData.imageUrl,
    };

    res.json(previewData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
