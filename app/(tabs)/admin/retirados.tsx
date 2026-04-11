import ListadoDeRetiradosByPolla from '@/components/ListadoDeRetiradosByPolla'
import Loading from '@/components/Loading'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import ThemedButton from '@/components/ThemedButton'
import { useThemeColor } from '@/hooks/use-theme-color'
import { fetchRetiradosByPolla, TypeFetchRetiradosByPollaId } from '@/lib/api_pollas'
import { router, useLocalSearchParams } from 'expo-router'
import React, { Suspense, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RetiradosScreen = () => {
  const { id } = useLocalSearchParams()
  const color = useThemeColor({},'tint')
  const [loading, setLoading] = useState(false);
  const [retirados, setRetirados] = useState<TypeFetchRetiradosByPollaId>()


  useEffect(() => {
    if (!id) return
    const getRetirados = async () => {
      try {
        setLoading(true)
        const res = await fetchRetiradosByPolla(id as string)
        if (res) {
          setRetirados(res)
        }

      } catch (error) {
        console.log(error)
        throw new Error('Error en servidor')
      } finally {
        setLoading(false)
      }
    }
    getRetirados()

  }, [id])

  if (loading) {
    return <Loading />
  }
  return (
    <Suspense fallback={<Text>Cargando....</Text>}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff",  }}>
        <ThemedView style={{ flex: 1, backgroundColor: "#fff", justifyContent:'space-between',gap:8 }}>
          <ThemedText type='subtitle'>Retirados</ThemedText >
          <ThemedView style={{flex:1, backgroundColor:'#fff', marginHorizontal:5}}>
          <ListadoDeRetiradosByPolla retirados={retirados} />
          </ThemedView>
          <ThemedButton
            icon="warning-outline"
            onPress={() => router.replace({pathname:"/(tabs)/admin/add-retirados",params:{id:id}})}
            disabled={false}
           style={{marginHorizontal:10, borderRadius:8, padding:8, flexDirection:'row', backgroundColor:'red', alignItems:'center', justifyContent:'center',marginVertical:10}}
          >
            Agregar Retirado
          </ThemedButton>
          <ThemedButton
            icon="arrow-back-circle-outline"
            onPress={() => router.replace('/(tabs)/admin/retirados')}
            disabled={false}
           style={{marginHorizontal:10, borderRadius:8, padding:8, flexDirection:'row', backgroundColor:color, alignItems:'center', justifyContent:'center'}}
          >
            Regresar
          </ThemedButton>
          </ThemedView>
      </SafeAreaView>
    </Suspense>
  )
}

export default RetiradosScreen