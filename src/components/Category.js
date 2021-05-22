
import React from 'react';
import useWindowSize from './windowHeight';

export default function CategorySection() {
  return (
    <div className="category-wrapper" style={{ height: useWindowSize() }}>
		Category Section
		<ul className="categories"></ul>
	</div>
  )
}
