import React from 'react'

import { rhythm } from '../util/typography'
import Form from './Form'

const SubstrateForm = () => (
  <Form
    id="cea4dce30b4a4533a91715bfbe77fd57"
    validate={validate}
  >
    {({ handleSubmit, handleUpdate, errors, success }) => (
      success ? (
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            maxWidth: '500px',
            fontFamily: '"Open Sans", sans-serif',
          }}
        >
          <p>Thanks for subscribing! Your first issue should arrive soon.</p>
        </div>
      ) : (
        <form
          css={{
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontFamily: '"Open Sans", sans-serif',
            maxWidth: '500px',
            '@media(max-width: 800px)': {
              flexDirection: 'column',
            },
          }}
          onSubmit={handleSubmit}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              '@media(max-width: 800px)': {
                marginBottom: rhythm(1),
              },
            }}
          >
            <label
              htmlFor="name"
              css={{
                marginBottom: rhythm(1),
              }}
            >
              {errors.name ? errors.name : 'Name'}
            </label>
            <input
              name="name"
              onChange={handleUpdate}
              css={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px #999 solid',
                color: 'white',
              }}
            />
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              '@media(max-width: 800px)': {
                marginBottom: rhythm(1.5),
              },
            }}
          >
            <label
              htmlFor="email"
              css={{
                marginBottom: rhythm(1),
              }}
            >
              {errors.email ? errors.email : 'Email Address'}
            </label>
            <input
              name="email"
              onChange={handleUpdate}
              css={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px #999 solid',
                color: 'white',
              }}
            />
          </div>
          <button
            css={{
              background: 'rgba(255, 255, 255, .4)',
              border: 'none',
              padding: '1em',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Subscribe
          </button>
        </form>
      )
    )}
  </Form>
)

function validate({ name, email }) {
  const emailValid = /.+@.+\..+/.test(email)
  const emailTest = e => {
    if (!e) {
      return 'May I have your email?'
    }

    if (!emailValid) {
      return 'Please check the format'
    }

    return undefined
  }

  return {
    name: !name ? 'Can I ask your name?' : undefined,
    email: emailTest(email),
  }
}
export default SubstrateForm
