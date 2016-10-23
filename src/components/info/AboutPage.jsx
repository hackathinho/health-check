import React from 'react'

// Since this component is simple and static, there's no parent container for it.
function AboutPage () {
  return (
    <div>
      <h2 className="text-center">About</h2>
      <p>
        With <span className="fa fa-heart" /> from Health Check&trade; contributors.
      </p>
    </div>
  )
}

export default AboutPage
