import React from 'react'

const Loader = () => {
  return (
    <div container>
 <div class="d-flex align-items-center d-block mx-auto">
  <strong role="status">Loading...</strong>
  <div class="spinner-border ms-auto" aria-hidden="true"></div>
</div>
    </div>
  )
}

export default Loader