import { ThemedText } from '@/components/themed-text'
import ThemedButton from '@/components/ThemedButton'
import ThemeTextInput from '@/components/ThemeTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import { supabase } from '@/lib/supabase'
import { SignInWithPasswordCredentials } from '@supabase/supabase-js'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LoginScreen=() => {
    const { height,width }=useWindowDimensions()
    const [loading, setLoading]=useState(false)
    const [form, setForm]=useState({
        email: '',
        password: ''
    })

    const primary=useThemeColor({}, 'tint')


    const handleLogin=async (credentials: SignInWithPasswordCredentials) => {
        if (!("email" in credentials)) return
        setLoading(true)
        const { email, password }=credentials
        const { error, data }=await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            Alert.alert(error.message)
            setLoading(false)
            return
        }
        if (data.session) {
            //console.log('DATA', data)
            router.replace("/")
            setLoading(false)
        }
    }


    const onLogin=async () => {
        const { email, password }=form
        //console.log({ email, password })
        if (email.length===0||password.length===0) {
            return
        }

        setLoading(true)
        handleLogin({ email, password })
        setLoading(false)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 40 }}>
                <View style={{ marginVertical:height*0.04 }}>
                    <ThemedText type='subtitle' 
                    style={{borderRadius:8, borderWidth: 1, padding: 10, borderColor: primary, textAlign: 'center', marginBottom: 10,
                     color: primary }}>TvBurrera</ThemedText>
                    <ThemedText style={{ color: 'gray' }}>Para continuar, por favor ingrese sus datos</ThemedText>
                </View>
                <View style={{ marginTop: 0 }} />
                <ThemeTextInput
                    placeholder='correo electrónico'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    icon='mail-outline'
                    value={form.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}
                />

                <ThemeTextInput
                    placeholder='contraseña'
                    autoCapitalize='none'
                    //secureTextEntry
                    icon='lock-closed-outline'
                    value={form.password}
                    onChangeText={(value) => setForm({ ...form, password: value })}
                />
                <View style={{ marginTop: 10 }} />
                <ThemedButton icon='arrow-forward-outline' onPress={onLogin} disabled={loading} >Ingresar</ThemedButton>

                 <View style={{ marginTop: 10 }} />
                <ThemedButton icon='recording-outline' onPress={() => router.replace('/auth/register')} disabled={loading} >Registrarse</ThemedButton>


                <View style={{ marginTop: 10 }} />

                <ThemedText style={{ fontSize: 11, color: primary, textAlign:'justify' }}>ATENCIÓN: Esta aplicación pertenece al Ing. Nathalie García Martínez, esta diseñada para ser usada única y exclusivamente por las personas que la Ing. Nathalie Gracía Martínez autorice </ThemedText>
                <View style={{ marginTop: 10 }} />

                <ThemedText style={{ fontSize: 10, color: primary, marginBottom: 10, textAlign:'center' }}>Desarrollo: Edwin Henriquez, edwinhenriquezh@gmail.com</ThemedText>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


const styles=StyleSheet.create({})