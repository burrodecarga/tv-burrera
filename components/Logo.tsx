import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo=() => {
    const imgUri='./assets/icon.png'
        return (

        <Image source={{ uri: imgUri }} style={{ width: '100%', height: '50%', resizeMode: 'contain', backgroundColor: '#f7f7f8' }} />

    )
}

const styles=StyleSheet.create({
    container: {
        marginVertical: 0
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 2,
        paddingHorizontal: 16
    },

    username: {
        fontWeight: "bold",
        marginLeft: 8
    },
    imageContainer: {
        width: "100%",
        height: 200
    },
    image: {
        width: "100%",
        resizeMode: "contain",
        aspectRatio: 1
    },
    content: {
        padding: 16,
        textAlign: "justify"
    },

    footer: {
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})


export default Logo