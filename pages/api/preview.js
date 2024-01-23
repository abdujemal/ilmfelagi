// pages/api/preview.ts
import { getFirestore, getDoc, doc} from 'firebase/firestore';
import app from '../../utils/firebase';

// Type for preview data


export default async function handler(req, res) {
  const courseId = req.query.courseId; // Extract course ID from URL query

  try {
    const firestore = getFirestore(app);
    const courseDoc = await getDoc(doc(firestore, "Courses", courseId));

    console.log(courseId);

    

    if (!courseDoc.exists()) {
      res.status(404).json({ message: `Course not found on id ${courseDoc.data()}` });
      return;
    }

    // let courseDatas = [];

    // courseDoc.data();

    const data = courseDoc.data();

    res.json({title: data.title, description: data.ustaz, image: data.image,});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}