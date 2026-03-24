import { PollasActivas } from '@/lib/api'
import React from 'react'
import { FlatList } from 'react-native'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'
import { Polla } from '@/lib/types'



export default function ListadoDePollas( polla : Polla[] ) {
  return (
     <FlatList
          data={polla}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <ThemedText type="subtitle">{item.polla}XX</ThemedText>
              <ThemedText>{item.fecha}</ThemedText>
            </ThemedView>
          )}
          />
  )
}