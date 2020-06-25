import React, { useEffect } from 'react';
import { getProjects } from '../../services/app.service';

const CategoryLibrary = () => {

  useEffect(() => {
    (async() => {
      const a = await getProjects();
    })()
  }, [])

    return (
        <p>
            CategoryLibrary
        </p>
    )
}

export default CategoryLibrary;