import { useEffect, useState } from 'react';

function useResponsiveSkeletonCount(type) {
  const [windowSize, setWindowSize] = useState(0);
  let skeletonCount  = 0;


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {window.removeEventListener('resize', handleResize);}
    } else {
      return () => {window.removeEventListener('resize', () => {
        return null;
      })}
    }
  }, [])

  if (type === 'infinity') {
  if (windowSize < 640) {
    skeletonCount  = 2;
  } else if (windowSize < 1024) {
    skeletonCount  = 6;
  } else {
    skeletonCount  = 12;
  }
  }



  if (type === 'home') {
    if (windowSize < 0) {
      skeletonCount  = 1;
    } else if (windowSize < 480){
      skeletonCount  = 2;
    }
    else if (windowSize < 768) {
      skeletonCount  = 3;
    } else if (windowSize < 1024) {
      skeletonCount  = 5;
    }
  }




  return skeletonCount ;
}


export default useResponsiveSkeletonCount;