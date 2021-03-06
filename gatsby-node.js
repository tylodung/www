const path = require('path')
const { slugify } = require('transliteration')
const get = require('lodash.get')
const format = require('date-fns/format')

const postTemplate = path.resolve('src/templates/Post.js')
const showTemplate = path.resolve('src/templates/Show.js')
const episodeTemplate = path.resolve('src/templates/Episode.js')
const pageTemplate = path.resolve('src/templates/Page.js')
const tagTemplate = path.resolve('src/templates/Tag.js')
const topicTemplate = path.resolve('src/templates/Topic.js')
const filmTemplate = path.resolve('src/templates/Film.js')
const substrateTemplate = path.resolve('src/templates/Substrate.js')

const template = (l = 'page') => {
  l = l.toLowerCase()

  if (l === 'substrate') {
    return substrateTemplate
  }

  if (l === 'post') {
    return postTemplate
  }

  if (l === 'show') {
    return showTemplate
  }

  if (l === 'episode') {
    return episodeTemplate
  }

  if (l === 'film') {
    return filmTemplate
  }

  return pageTemplate
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators
  return graphql(`
    {
      allMarkdownRemark(limit: 1000, filter: {
        frontmatter: {
          draft: { ne: true }
        }
      }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              layout
              tags
              topics
              show
            }
          }
        }
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      console.error(errors)
      return Promise.reject(errors)
    }

    let tagPages = []
    let topicPages = []
    data.allMarkdownRemark.edges.forEach(edge => {
      const slug = get(edge, 'node.fields.slug')
      if (!slug) {
        return
      }

      const show = get(edge, 'node.frontmatter.show') || undefined

      const { layout } = edge.node.frontmatter
      createPage({
        path: edge.node.fields.slug,
        component: template(layout),
        context: {
          slug: edge.node.fields.slug,
          show,
        },
      })

      const tagged = get(edge, 'node.frontmatter.tags')
      if (tagged) {
        tagPages = tagPages.concat(tagged)
      }

      const topics = get(edge, 'node.frontmatter.topics')
      if (topics) {
        topicPages = topicPages.concat(topics)
      }

      if (layout === 'post') {
        const fromPath = ensureSlashes(
          slugify(get(edge, 'node.frontmatter.title'))
        )

        createRedirect({
          fromPath,
          isPermanent: true,
          redirectInBrowser: false,
          toPath: slug,
        })

        createRedirect({
          fromPath: `/notebook${fromPath}`,
          isPermanent: true,
          redirectInBrowser: false,
          toPath: slug,
        })

        createRedirect({
          fromPath: `/journal${fromPath}`,
          isPermanent: true,
          redirectInBrowser: false,
          toPath: slug,
        })
      }
    })

    tagPages = tagPages.filter((v, i, acc) => acc.indexOf(v) === i)
    tagPages.forEach(tag => {
      const slug = `/tags/${slugify(tag)}/`
      createPage({
        path: slug,
        component: tagTemplate,
        context: {
          tag,
          slug,
        },
      })
    })

    topicPages = topicPages.filter((v, i, acc) => acc.indexOf(v) === i)
    topicPages.forEach(topic => {
      const slug = `/topics/${slugify(topic)}/`
      createPage({
        path: slug,
        component: topicTemplate,
        context: {
          topic,
          slug,
        },
      })
    })

    return Promise.resolve()
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)

    if (fileNode.name.toLowerCase().indexOf('readme') !== -1) {
      return
    }

    const relativePath = fileNode.relativePath

    let slug
    if (node.frontmatter.path) {
      slug = cleanSlashes(node.frontmatter.path)
    } else if (node.frontmatter.title && regularPage(node)) {
      slug = slugify(node.frontmatter.title)
    } else if (node.frontmatter.layout === 'show') {
      slug = ['programs', slugify(node.frontmatter.title)].join('/')
    } else if (node.frontmatter.layout === 'episode') {
      slug = ['programs', slugify(node.frontmatter.show), node.frontmatter.number].join('/')
    } else if (node.frontmatter.layout === 'film') {
      slug = ['films', path.dirname(relativePath)].join('/')
    } else {
      slug = path.basename(relativePath, path.extname(relativePath))
    }


    if (node.frontmatter.layout === 'post') {
      slug = [format(node.frontmatter.date, 'YYYY/MM'), slug].join('/')
    }

    if (fileNode.sourceInstanceName === 'substrate') {
      slug = `substrate/${format(node.frontmatter.date, 'YYYY/MM')}/${slugify(node.frontmatter.title)}`
    }

    if (slug) {
      createNodeField({ node, name: 'slug', value: ensureSlashes(slug) })
    }
  } else if (node.internal.type === 'File') {
    const relativePath = node.relativePath
    createNodeField({ node, name: 'slug', value: ensureSlashes(relativePath) })
  }
}

function regularPage(node) {
  const { layout = 'post' } = node.frontmatter
  if (layout === 'post' || layout === 'page') {
    return true
  }
  return false
}

function ensureSlashes(slug) {
  if (slug.charAt(0) !== '/') {
    slug = '/' + slug
  }

  if (slug.charAt(slug.length - 1) !== '/') {
    slug = slug + '/'
  }

  return slug
}

function cleanSlashes(slug) {
  if (slug.charAt(0) === '/') {
    slug = slug.slice(1)
  }

  if (slug.charAt(slug.length - 1) === '/') {
    slug = slug.slice(0, -1)
  }

  return slug
}
