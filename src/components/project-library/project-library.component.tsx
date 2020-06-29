import React, { useEffect } from 'react';
import { fetchData } from '../../services/app.service';

const ProjectLibrary = () => {
  useEffect(() => {
    (async() => {
      fetchData(
        ['getProjects', 'getBoM'],
        'Base ID',
        'category',
        () => {}
      );
    })()
  }, []);
    return (
        <p>
            ProjectLibrary
        </p>
    )
}

export default ProjectLibrary;