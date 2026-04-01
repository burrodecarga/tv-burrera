import Logo from '@/components/Logo'
import { ThemedText } from '@/components/themed-text'
import ThemedButton from '@/components/ThemedButton'
import ThemeTextInput from '@/components/ThemeTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'

import { supabase } from '@/lib/supabase'
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'

const RegisterScreen = () => {
  const { height } = useWindowDimensions()
  const backgroundColor = useThemeColor({}, 'background')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const primary = useThemeColor({}, 'tint')

  const handleSignup = async (credentials: SignUpWithPasswordCredentials) => {

    if (username === '' || username.trim().length === 0) {
      Alert.alert('Crear cuenta', 'Por favor, ingrese un nombre de usuario')
      return
    }

    if (!("email" in credentials)) {
      Alert.alert('Crear cuenta', 'Por favor, ingrese un correo electrónico')
      return
    }

    if (credentials.password === '' || credentials.password.trim().length === 0) {
      Alert.alert('Crear cuenta', 'Por favor, ingrese una contraseña')
      return
    }


    setLoading(true)
    const { email, password, options } = credentials
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options,
    })
    console.log(error)
    if (error) { Alert.alert(error.message) } else {
      Alert.alert('Crear cuenta', 'Cuenta creada Correctamente, por favor revise su correo para verificar su cuenta')
      router.push('/auth/login')
    }

    //console.log(data)
    setLoading(false)


  }


  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}
      >
        <View style={{ paddingTop: height * 0.05 }}>
          <Logo />

          <ThemedText type='subtitle' style={{ borderWidth: 1, padding: 10, borderColor: primary, textAlign: 'center', marginBottom: 10, color: primary }}>TvBurrera</ThemedText>
          <ThemedText style={{ color: 'gray' }}>Para continuar, por favor ingrese sus datos</ThemedText>
        </View>
        <View
          style={{
            marginTop: 0
          }}
        >
          <ThemedText type="subtitle" style={{ color: primary, textAlign: 'center' }}>Crear cuenta</ThemedText>

        </View>

        {/* Email y Password */}
        <View style={{ marginTop: 0 }}>
          <ThemeTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={username}
            onChangeText={setUsername}
          />

          <ThemeTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
          />

          <ThemeTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 40 }} />

        {/* Botón */}
        <ThemedButton icon="reader-outline"
          onPress={() => handleSignup({ email, password, options: { data: { username } } })}
        >Crear cuenta</ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 40 }} />
        <ThemedButton icon="log-in-outline"
          onPress={() => router.replace('/auth/login')}
        >Iniciar Sesión</ThemedButton>

        {/* Enlace a registro */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default RegisterScreen
