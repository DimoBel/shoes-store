import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={287}
    height={430}
    viewBox="0 0 287 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="10" y="0" rx="0" ry="0" width="260" height="260" />
    <rect x="10" y="380" rx="0" ry="0" width="83" height="27" />
    <rect x="117" y="372" rx="20" ry="20" width="154" height="41" />
    <rect x="10" y="276" rx="0" ry="0" width="260" height="80" />
  </ContentLoader>
);

export default Skeleton;
