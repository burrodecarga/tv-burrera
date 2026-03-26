import { downloadAvatar, fetchBilleteras, TypeFectchBilletera } from '@/lib/api'
import { Profile } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Avatar from './ui/Avatar'

type ProfileProps = {
  profile: Profile | null
  uri: string | null | undefined;
  size?: number;
  disponibilidad?:number
}

const Perfil = ({ profile, uri, size=60, disponibilidad=0 }: ProfileProps) => {
      const [avatarUrl, setAvatarUrl]=useState("")
        const [billetera, setBilletera] = useState<TypeFectchBilletera|undefined>()
      
  
  
  useEffect(() => {
  
          if (uri) {
              downloadAvatar(uri).then(setAvatarUrl)
          }
      }, [profile])

   useEffect(() => {
  if(!profile)return
      const getDisponibilidad = async  ()=> {
        
        const res = await fetchBilleteras(profile.id)
        if(res) setBilletera(res[0])
  
      }
      getDisponibilidad()
    }, [profile, billetera])
  
      
  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'flex-start', gap: 12, alignItems: 'center' }}>
        <View style={{  borderRadius: 100 }}>
          <Avatar uri={avatarUrl} size={size} />
        </View>
        <View>
          <Text style={{ textTransform: 'uppercase', fontSize: 13, textAlign: 'center', fontWeight: '500', }} >{profile?.full_name}.</Text>
          <Text style={{ fontSize: 11, textAlign: 'center', marginVertical: 0, paddingVertical: 0, }} >{profile?.username}.</Text>
                 <Text style={{ fontSize: 11, textAlign: 'center', marginVertical: 0, paddingVertical: 0, }} >Fichas Disponibles : {billetera?.fichas}.</Text>

        </View>
      </View>
    </View>
  )
}

export default Perfil