import { primary } from '@/constants/Colors'
import { AllUser, downloadAvatar } from '@/lib/api'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Avatar from './Avatar'
import Card from './ui/Card'
interface Props {
    item: AllUser
    id: string
}

const ICONO='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/sign/avatars/icono.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzZkZmE2ZS01ZTNjLTQ5MGUtODZjZi1mNmMyMzM1YzEzYTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2ljb25vLnBuZyIsImlhdCI6MTc1NDczMjUxMCwiZXhwIjoxNzU1MzM3MzEwfQ.ALzW7aV1fDMX7sxgpHmIqxT36pckH42zENIb_XrHc_0'

const ListUsers=({ item: profile, id }: Props) => {

    const [avatarUrl, setAvatarUrl]=useState(ICONO)

    useEffect(() => {
        if (profile?.avatar_url) {
            downloadAvatar(profile.avatar_url).then(setAvatarUrl)
        }
    }, [profile])
    return (
        <Card style={styles.container}>
            {/* Header */}
            <Card style={styles.header}>
                <Avatar uri={avatarUrl} size={100} />
                <Text style={styles.username}>{profile.username}</Text>
                <TouchableOpacity onPress={() => router.push({ pathname: '/(protected)/users/profile', params: { id } })}>

                    <Ionicons name='person-outline' size={24} color={primary} />
                </TouchableOpacity>
            </Card>
        </Card>
    )
}

export default ListUsers


const styles=StyleSheet.create({
    container: {
        marginVertical: 18,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingHorizontal: 16,
    },

    username: {
        fontWeight: "bold",
        marginLeft: 8,
        color: primary
    },
    imageContainer: {
        width: "100%",
        height: 300,
        marginTop: 8,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    content: {
        padding: 16,
    },
    contentText: {
        fontSize: 16,
    },
    footer: {
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
})
