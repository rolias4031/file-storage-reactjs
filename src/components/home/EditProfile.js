import React, { useState } from 'react'

import EditProfileForm from './EditProfileForm'
import ChangeDetailForm from './ChangeDetailForm'
import DeleteProfileForm from './DeleteProfileForm'
import AltButton from '../auth/AltButton'
import ProfileModeButton from './ProfileModeButton'

import BootstrapRow from '../structure/BootstrapRow'

function EditProfile (props) {

  const [deleteMode, setDeleteMode] = useState(false)

  return (
    <React.Fragment>
      <BootstrapRow rowStyle={`row my-3`} colStyle={['col']}>
        <EditProfileForm profile={props.profile} setEditMode={props.setEditMode}/>
      </BootstrapRow >
      <BootstrapRow rowStyle={`row my-3`} colStyle={['col']}>
        <ChangeDetailForm type={'PASSWORD'}/>
      </BootstrapRow >
      <BootstrapRow rowStyle={`row my-3`} colStyle={['col']}>
        <ChangeDetailForm type={'EMAIL'} />
      </BootstrapRow >
      <BootstrapRow rowStyle={`row my-3`} colStyle={['col']}>
        {!deleteMode ?
          <ProfileModeButton onClick={setDeleteMode} config={{
            name: 'Delete Profile',
            style: 'btn-danger my-2 btn-lg'
          }} /> :
          <DeleteProfileForm setIsAuth={props.setIsAuth}/>
        }
      </BootstrapRow >
    </React.Fragment>
  )


}

export default EditProfile
