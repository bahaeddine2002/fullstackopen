import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hiddenVsisble = { display: visible ? 'none' : '' }
  const showvisible = { display: visible ? '' : 'none' }

  const toggleVisibilty = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={showvisible}>
        {props.children}
        <button onClick={toggleVisibilty}>cancel</button>
      </div>
      <button onClick={toggleVisibilty} style={hiddenVsisble}>
        {props.buttonLable}
      </button>
    </div>
  )
}

Togglable.propTypes = {
  buttonLable: PropTypes.string.isRequired,
}

export default Togglable
