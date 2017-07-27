import React, { Component } from 'react'
import Helmet from 'react-helmet'

import Container from '../components/Container'
import SiteSidebar from '../components/SiteSidebar'
import Main from '../components/Main'

export default class PageTemplate extends Component {
  render() {
    const {
      title,
      description
    } = this.props.data.site.siteMetadata

    const { html, frontmatter } = this.props.data.markdownRemark

    return (
      <Container>
        <Helmet
          title={frontmatter.title}
        />
        <SiteSidebar
          title={title}
          description={description}
        />
        <Main>
          <h2
            css={{
              marginTop: 0
            }}
          >
            {frontmatter.title}
          </h2>
          <div
            css={{
              fontSize: '1.0em',
              '@media(max-width: 800px)': {
                fontSize: '1.1em'
              }
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Main>
      </Container>
    )
  }
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
