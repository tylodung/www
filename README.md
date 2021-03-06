# Nicholas Young

[![CI Status
Badge](https://travis-ci.org/nicholaswyoung/www.svg?branch=master)](https://travis-ci.org/nicholaswyoung/www)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53a0d8dd65a1445db0005bb4bd0496fa)](https://www.codacy.com/app/nyoung/www_2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nicholaswyoung/www&amp;utm_campaign=Badge_Grade)
[![Gatsby](https://img.shields.io/badge/powered_by-Gatsby-6a4e9a.svg)](https://www.gatsbyjs.org)

[A website](https://www.nicholaswyoung.com) on entrepreneurship, disability, technology, culture, art, and the intersection(s) of these topics.

## Developing

This site is built on top of [Gatsby](https://www.gatsbyjs.org), and uses the RSS Feed and Sitemap plugins, both of which were developed by [Uptime Ventures](https://uptime.ventures).

### Getting Started

To begin, install all dependencies like usual. This project is configured to use Yarn by default.

Once installation is complete, `yarn start` will launch a development server on [`localhost:8000`](http://localhost:8000). Create a new post draft by running `yarn run new`.

### Content Layout

`content/`: Most posts and pages live under this directory.

`programs/`: Via [The Machine Broadcasting Network](https://www.nicholaswyoung.com/topics/the-machine/) and other outlets, I've created, hosted, and distributed a handful of podcasts and radio programs. Show archives live in this directory.

### Building for Production

When you're finished editing, `yarn run build` will compile source files `src/`, combined with content from source directories (above) and output the built site in `public/`.

This site is automatically built by Travis CI and Netlify. Take a look at `package.json` for details.

## License

&copy; Copyright 2009 - 2017 Nicholas Young. All rights reserved.

Source code contained in this repository is released under the [MIT License](https://opensource.org/licenses/MIT).

Rights to photographic images, films, audiovisual presentations, and other media (afterwards known as "assets") that may be contained herein are retained by Nicholas Young/Uptime Ventures, Ltd. Unauthorized duplication, didstribution, or modification of any assets is prohibited by law.
