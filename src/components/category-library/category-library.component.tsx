import React, { useEffect } from 'react';
import { fetchData } from '../../services/app.service';

const CategoryLibrary = () => {

  useEffect(() => {
    (async() => {
      fetchData(
        ['getCategories', 'getLinks'],
        "['CategoryName'][0]",
        'category',
        () => {}
      );
    })()
  }, []);

    return (
        <p>
            CategoryLibrary
        </p>
    )
}

export default CategoryLibrary;