import { useEffect } from 'react';

function useMeta({title, description, image}) {
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const imageMeta = document.querySelector('meta[property="og:image"]');

  useEffect(() => {
  if (title) document.title = title;

    if (description && descriptionMeta) {
    descriptionMeta.setAttribute('content', description);
    }

  if (image && imageMeta) {
    imageMeta.setAttribute('content', image);
  }
  }, [title, description, image])
}

export default useMeta;