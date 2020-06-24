import React, { useEffect } from 'react';
import { getProjects } from '../../services/app.service';

export const CategoryLibrary = () => {

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