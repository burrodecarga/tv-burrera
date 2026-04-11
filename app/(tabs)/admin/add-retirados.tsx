import Loading from '@/components/Loading'
import { useThemeColor } from '@/hooks/use-theme-color'
import { fetchPollasById, TypeFetchPollasById } from '@/lib/api_pollas'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ConfiGRetiradosScreen = () => {
  const { id } = useLocalSearchParams()
  const color = useThemeColor({}, 'tint')
  const [loading, setLoading] = useState(false);
  const [polla, setPolla] = useState<null | TypeFetchPollasById>(null);


  useEffect(() => {
    const getPolla = async () => {
      try {
        setLoading(true)
        const res = await fetchPollasById(id as string)
        setPolla(res)
      } catch (error) {
        throw new Error('Error en servidor')
      }
    }
    getPolla()
  }, [id])

  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>ConfiGRetiradosScreen</Text>
    </SafeAreaView>
  )
}

export default ConfiGRetiradosScreen