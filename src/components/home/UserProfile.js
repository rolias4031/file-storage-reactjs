import React, { useEffect, useContext, useState } from 'react'

import LogoutButton from './LogoutButton'
import HomeHeader from './HomeHeader'
import FetchContext from '../../store/FetchContext'
import EditProfile  from './EditProfile'
import Upload from '../upload/Upload'
import ProfileModeButton from './ProfileModeButton'
import AltButton from '../home/AltButton'

import BootstrapRow from '../structure/BootstrapRow'

function UserProfile (props) {

  const [profile, setProfile] = useState({})
  const [editMode, setEditMode] = useState(false)

  const ctx = useContext(FetchContext)
  const { isAuth } = props

  useEffect(() => {
    fetchUserProfile()
  }, [isAuth, ctx.forceUpdate])

  return (
    <React.Fragment>
      <BootstrapRow rowStyle={`row`} colStyle={['col', 'col-auto', 'col-auto']}>
        <HomeHeader name={profile.name} />
        <LogoutButton setIsAuth={props.setIsAuth} />
        {!editMode ? <ProfileModeButton onClick={setEditMode} config={{
            name: 'Edit Profile',
            style: 'btn-primary'
          }} />
          : (
            <AltButton config={{
              value: 'Home',
              altButtonHandler: altButtonHandler,
              itemClass: ''
            }} />
          )
        }
      </BootstrapRow >
      {editMode ? (
        <BootstrapRow rowStyle={'row'} colStyle={['col']}>
          <EditProfile setEditMode={setEditMode} profile={profile} setIsAuth={props.setIsAuth}/>
        </BootstrapRow >
        )
        : null
      }
      <BootstrapRow rowStyle={`row`} colStyle={['col']}>
        <Upload profile={profile} />
      </BootstrapRow >
    </React.Fragment>
  )

  async function fetchUserProfile () {
    const token = localStorage.getItem('token')
    if (!token) {
      props.setIsAuth(false)
      return
    }
    const url = `${ctx.baseUrl}auth/user-profile`
    const fetchOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    try {
      const { response, result } = await ctx.fetchHandler(url, fetchOptions)
      ctx.responseHandler(response, result)
      props.setIsAuth(true)
      setProfile({...result.profile})
    } catch (error) {
      console.log(error);
      const { status } = error
      if (status === 401) {
        console.log('Not Authenticated');
      } else {
        console.log('Something else went wrong', status);
      }
      props.setIsAuth(false)
    }
  }

  function altButtonHandler () {
    setEditMode(false)
  }
}

export default UserProfile
