/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import TOC from '@theme/TOC';

// dbt Custom 
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import CTA from '../../components/cta';

function BlogLayout(props) {
  const {title, description, sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  // dbt Custom 
  const { blogMeta, tagData } = usePluginData('docusaurus-build-blog-data-plugin');
  const { 
    featured_image, 
    featured_cta, 
    show_title, 
    show_description 
  } = blogMeta

  return (
    <Layout {...layoutProps}>

        {/* dbt Custom */}
        {featured_image && featured_image !== "" ? (
          <>
            <Head>
              <meta property="og:image" content={featured_image} />
              <meta property="twitter:image" content={featured_image} />
            </Head>
            <Link to="/blog">
              <div className="blog-hero" style={{backgroundImage: `url(${featured_image}`}}></div>
            </Link>
          </>
        ) : ''}
        {/* end dbt Custom */}
        
      {layoutProps.pageClassName && layoutProps.pageClassName === "blog-list-page" &&
        ((show_title || show_description) && (title || description)) && (
          <div className="blog-index-header">
            <div className="container margin-vert--lg">
              {title && show_title && <h1>{title}</h1>}
              {description && show_description && <p>{description}</p>}
            </div>
          </div>
        )
      }

      <div className="blog-breadcrumbs">
        <div className="container">
          <Link to="/" title="Home">Home</Link>
          <Link to="/blog" title="Blog">Blog</Link>
        </div>
      </div>
          
      <div className="row blog-main-row">
        {hasSidebar && (
          <aside className="col col--2 blog-aside">
            <BlogSidebar sidebar={sidebar} tagData={tagData} />
          </aside>
        )}
        <main
          className={clsx('col main-blog-container', {
            'col--7': hasSidebar,
            'col--8 col--offset-1': !hasSidebar && layoutProps.pageClassName,
            'col--9 col--offset-1': !hasSidebar && !layoutProps.pageClassName,
          })}
          itemScope
          itemType="http://schema.org/Blog">
          <div className="container margin-vert--lg">
            {children}
          </div>
        </main>
        {layoutProps.pageClassName &&
          <div className="col col--3 blog-right-sidebar">
            {toc && (
              <TOC toc={toc} />
            )}
            {featured_cta && (
              <CTA cta={featured_cta} />
            )}
          </div>
        }
      </div>
    </Layout>
  );
}

export default BlogLayout;
