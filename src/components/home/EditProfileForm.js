import React, { useState, useRef, useContext } from 'react'

import TextInput from '../auth/TextInput'
import SelectInput from '../auth/SelectInput'
import SubmitButton from '../auth/SubmitButton'
import AltButton from '../auth/AltButton'

import FetchContext from '../../store/FetchContext'

function EditProfileForm (props) {

  const ctx = useContext(FetchContext)
  const [inputs, setInputs] = useState({
    newFirstName: props.profile.name.first,
    newLastName: props.profile.name.last,
    newProfileType: props.profile.profileType
  })
  const passwordRef = useRef()

  return (
    <React.Fragment>
    <h6>Edit Details</h6>
    <form onSubmit={editProfileHandler} className="form-control">
      <TextInput config={{
        stateHandler: setInputs,
        value: inputs.newFirstName,
        name: 'newFirstName',
        itemClass: 'my-2'
      }}/>
      <TextInput config={{
        stateHandler: setInputs,
        value: inputs.newLastName,
        name: 'newLastName',
        itemClass: 'my-2'
      }}/>
      <SelectInput config={{
        labelTitle: 'Profile Type',
        stateHandler: setInputs,
        name: 'newProfileType',
        itemClass: 'my-2'
      }}/>
      <SubmitButton config={{
        value: 'Save Changes',
        itemClass: 'btn-primary my-1'
      }}/>

    </form>
    </React.Fragment>
  )

  function altButtonHandler () {
    props.setEditMode(false)
  }

  async function editProfileHandler (e) {
    e.preventDefault()
    // get inputs
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const formInputs = {...inputs}
    const url = `${ctx.baseUrl}auth/edit-profile`
    const fetchOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: {
          first: formInputs.newFirstName,
          last: formInputs.newLastName
        },
        profileType: formInputs.newProfileType
      })
    }
    ctx.fetchHandler(url, fetchOptions)
  }
}

export default EditProfileForm
