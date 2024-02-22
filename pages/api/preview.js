// pages/api/preview.ts
import { getFirestore, } from 'firebase/firestore';
import app from '../../utils/firebase';
import { doc, getDoc} from "firebase/firestore";

// Type for preview data


export default async function handler(req, res) {
  const courseId = req.query.courseId; // Extract course ID from URL query

  try {
    const db = getFirestore(app);
    const docRef = doc(db, "Courses", courseId);
    const courseDoc = await getDoc(docRef);

    console.log(courseId);


    if (!courseDoc.exists()) {
      res.status(404).json({ message: `Course not found on id ${courseDoc.data()}` });
      return;
    }

    // let courseDatas = [];

    // courseDoc.data();

    const data = courseDoc.data();

    res.status(200).json({
      title: data.title, 
      description: data.ustaz, 
      image: data.image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}