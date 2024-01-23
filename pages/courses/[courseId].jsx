// pages/courses/[courseId].tsx

import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';


function CoursePage({ previewData }) {
  const router = useRouter();
  const courseId = useMemo(() => router.query.courseId , [router.query]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/preview?courseId=${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        previewData && console.log('Existing preview data', previewData); // Access existing data if available
        console.log('Fetched preview data', data); // Log retrieved data

        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');

        ogTitle.setAttribute('content', data.title);
        ogDescription.setAttribute('content', data.description);
        ogImage.setAttribute('content', data.image);
      })
      .catch((error) => {
        console.error('Error fetching preview data', error);
      });
  }, [courseId]);

  // Render course content...

  // Render preview elements for Telegram based on previewData or fallback state
  return (
    <>
    <Head>
        <title>{previewData.title}</title>
        <meta property="og:title" content={previewData.title} />
        <meta property="og:description" content={previewData.description} />
        <meta property="og:image" content={previewData.image} />
        {/* Add other necessary meta tags */}
      </Head>
      {/* ... Course content */}
      {/* ... Render preview elements based on previewData */}
      {isLoading ? <p>Loading...</p> : null}
      {previewData?.title && (
        <p>Title: {previewData.title}</p>
      )}
      {previewData?.description && (
        <p>Description: {previewData.description}</p>
      )}
      {previewData?.image && (
        <img src={previewData.image} alt="Course image" />
      )}
      {/* ... Update Telegram share with data using platform-specific API */}
    </>
  );
}

export default CoursePage;