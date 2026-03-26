import Perfil from '@/components/Perfil'
import PerfilForm from '@/components/PerfilForm'
import { useUserInfo } from '@/hooks/userContext'
import React from 'react'
import { Text, View } from 'react-native'

const UserScreen = () => {

    const {profile,loading,session}=useUserInfo()
  return (
    <>

			{session&&<PerfilForm
				profile={profile}
				loading={loading!}
                setLoading={()=>{}}
			// onSave={saveProfileExt!}

			/>}
		</>
  )
}

export default UserScreen