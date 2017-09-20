/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import TextField from './index'

describe('<TextField />', () => {
  test('matches snapshot with default props', () => {
    let $textField = renderer.create(<TextField />)
    expect($textField).toMatchSnapshot()
  })
})
