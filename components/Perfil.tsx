import { useThemeColor } from '@/hooks/use-theme-color'
import { downloadAvatar, fetchBilleteras, TypeFectchBilletera } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/lib/types'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from './ui/Avatar'

type ProfileProps = {
  profile: Profile | null
  uri: string | null | undefined;
  size?: number;
  disponibilidad?:number
  actualizar?:boolean
  loading?:boolean
}

const Perfil = ({ profile, uri, size=60, disponibilidad=0, actualizar=true, loading }: ProfileProps) => {
      const [avatarUrl, setAvatarUrl]=useState("")
      const [billetera, setBilletera] = useState<TypeFectchBilletera|undefined>()
      
  const color=useThemeColor({}, 'tint')
  
  useEffect(() => {
    const getAvatar = async () => {
      if(!profile?.avatar_url)return
       if(profile.avatar_url){
        const url = await downloadAvatar(profile.avatar_url)
        setAvatarUrl(url)
       }}
      getAvatar()},[profile?.avatar_url,actualizar])

   useEffect(() => {
  if(!profile)return
      const getDisponibilidad = async  ()=> {
        
        const res = await fetchBilleteras(profile.id)
        if(res) setBilletera(res[0])
  
      }
      getDisponibilidad()
    }, [profile?.fichas, actualizar])

    
    
      if (loading) {
        return (
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Cargando...</Text>
          </SafeAreaView>
        )
      }
 //console.log(profile?.avatar_url) 
      
  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'flex-start', gap: 12, alignItems: 'center' }}>
        <View style={{  borderRadius: 100 }}>
          <Avatar uri={avatarUrl} size={size} />
        </View>
        <View style={{flex:1}}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={{ textTransform: 'uppercase', fontSize: 10, textAlign: 'center', fontWeight: '500', }} >{profile?.full_name? profile?.full_name:'Actualizar perfil'}.</Text>
          <Text style={{ fontSize: 11, textAlign: 'center', marginVertical: 0, paddingVertical: 0, }} >{profile?.username ? profile?.username:'actualizar username'}.</Text>
                 <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontSize: 11, textAlign: 'center', marginVertical: 0, paddingVertical: 0, }} >Fichas Disponibles : {billetera? billetera?.fichas:'0'}.</Text>

        </View>
        <TouchableOpacity onPress={()=>supabase.auth.signOut()} style={{marginHorizontal:10}}>
<MaterialCommunityIcons name="logout" size={24} color={color} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Perfil