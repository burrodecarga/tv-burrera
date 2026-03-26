import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import ThemedTextInput from '@/components/ui/ThemedTextInput'
import { ThemedView } from '@/components/ui/ThemedView'
import ThemeTextInput from '@/components/ui/ThemeTextInput'
import { downloadAvatar } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/lib/types'
import * as ImagePicker from "expo-image-picker"
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ProfileFormProps {
    profile: Profile|undefined|any
    loading: boolean
    setLoading: (value: boolean) => void
}
const ProfileForm=({ profile, loading, setLoading }: ProfileFormProps) => {

    const [avatarUrl, setAvatarUrl]=useState("")
    const [avatarUpdated, setAvatarUpdated]=useState(false)
    const [form, setForm]=useState<Profile>(profile)
   

    const handlePickImage=async () => {
        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
        })
        if (!result.canceled) {
            setAvatarUrl(result.assets[0].uri)
            setAvatarUpdated(true)
        }
    }

    
    const handleChange=(name: string, text: string): void => {

        setForm((prev) => ({
            ...prev,
            [name]: text
        }))
    }

    const saveProfile=async (
        updatedProfile: Profile,
        avatarUpdated: boolean
    ) => {
        console.log('entrando', updatedProfile)



        console.log('MECATRON', updatedProfile.avatar_url, avatarUpdated)

        if (updatedProfile.avatar_url&&avatarUpdated) {
            console.log('actualizando avatar')
            const { avatar_url }=updatedProfile

            const fileExt=avatar_url.split(".").pop()
            const fileName=avatar_url.replace(/^.*[\\\/]/, "")
            const filePath=`${Date.now()}.${fileExt}`

            const formData=new FormData()
            const photo={
                uri: avatar_url,
                name: fileName,
                type: `image/${fileExt}`
            } as unknown as Blob
            formData.append("file", photo)

            const { error }=await supabase.storage
                .from("avatars")
                .upload(filePath, formData)
            if (error) throw error
            updatedProfile.avatar_url=filePath
        }

        console.log('ACTUALIZADO AVATAR XX')
        //setLoading(true)

        const { error }=await supabase
            .from("profiles")
            .update(
                updatedProfile
            )
            .eq("id", profile.id)
        if (error) {
            console.log('ERROR', error)
        } else {
            console.log("PROFILE SAVED")
            Alert.alert("Profile saved", 'profile save')
        }
        console.log('FIN')
        //setLoading(false)
    }

    const handleSubmit=() => {
        console.log('saliendo')
        saveProfile({ ...profile, avatar_url: avatarUrl }, avatarUpdated)
    }

    useEffect(() => {

        if (form?.avatar_url) {
            downloadAvatar(form.avatar_url).then(setAvatarUrl)
        }
    }, [form])


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS==="ios"? "padding":"height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ThemedView style={styles.inner}>
                        <ThemedView style={styles.input}>
                            <TouchableOpacity
                                style={styles.avatarButton}
                                onPress={handlePickImage}
                            >
                                <Avatar uri={avatarUrl} size={120} />
                            </TouchableOpacity>

                        </ThemedView>
                        <View style={{}}>
                            <Text>username</Text>
                            <ThemedTextInput
                                style={{ color: "black" }}
                                icon='id-card-outline'
                                value={form.username || ''}
                                onChangeText={(text) => handleChange("username", text)}
                            />
                        </View>
                        <View style={{}}>
                            <Text>apellidos y nombres</Text>
                             <ThemedTextInput
                                style={{ color: "black" }}
                                icon='card-outline'
                                value={form.full_name || ''}
                                onChangeText={(text) => handleChange("full_name", text)}
                            /> 
                        </View>
                        <View style={{}}>
                            <Text>phone</Text>
                            <ThemeTextInput
                                style={{ color: "black" }}
                                icon='arrow-redo-circle-outline'
                                value={form.phone || ''}
                                onChangeText={(text) => handleChange("phone", text)}
                            />
                        </View>


                        <ThemedView style={styles.input}>
                            <Button
                                title="Guardar cambios"
                                onPress={() => handleSubmit()}
                                disabled={loading}
                            />
                        </ThemedView>

                        <ThemedView style={[styles.input]}>
                            <Button
                                title="Ir a Home"
                                onPress={() => router.push('/')}
                                disabled={loading}
                                style={{backgroundColor:'#df1a1a'}}
                            />
                        </ThemedView>
                    </ThemedView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 16,
        flex: 1,
    },
    input: {
        paddingVertical: 8,
    },
    avatarButton: {
        alignItems: "center",
        marginBottom: 16,
    },
})


export default ProfileForm

