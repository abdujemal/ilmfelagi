// pages/api/preview.ts
import { getFirestore, getDoc, doc, collection, getDocs} from 'firebase/firestore';
import app from '../../utils/firebase';

// Type for preview data


export default async function handler(req, res) {
  const courseId = req.query.courseId; // Extract course ID from URL query

  try {
    const firestore = getFirestore(app);
    const docRef = doc(firestore, "Courses", courseId);
    const courseDoc = await getDocs(collection(firestore, "Courses"));

    console.log(courseId);

    

    if (courseDoc.length > 0) {
      res.status(404).json({ message: `Course not found on id ${courseDoc}` });
      return;
    }

    // let courseDatas = [];

    // courseDoc.data();

    let chats = [];


    courseDoc.forEach((doc)=>{
      chats = chats.concat({id: doc.id, ...doc.data()});
  
    })

    // const data = courseDoc.data();

    res.json({title: chats[0].title, description: chats[0].ustaz, image: chats[0].image,});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}