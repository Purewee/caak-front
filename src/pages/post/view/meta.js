import React from 'react';
import { imagePath } from '../../../utility/Util';
import { Helmet } from 'react-helmet';

export default function PostMeta({ title, description, image }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" key="description" content={description} />
      <meta name="title" key="title" content={title} />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:locale" key="og:locale" content="en_US" />
      <meta charSet="utf-8" />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:description" key="og:description" content={description} />
      <meta property="og:image" key="og:image" content={imagePath(image)} />
    </Helmet>
  );
}
