import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap
}
const ThemeTextInput=({ icon, ...rest }: Props) => {

    const primaryColor=useThemeColor({}, 'tint')
    const textColor=useThemeColor({}, 'text')

    const [isActive, setIsActive]=useState(false)
    const inputRef=useRef<TextInput>(null)

    return (
        <View style={{ ...styles.border, borderColor: isActive? primaryColor:'#cccc' }}
            onTouchStart={() => inputRef.current?.focus()}
        >
            {icon&&(
                <Ionicons
                    name={icon}
                    size={30}
                    color='#5c5c5c'
                    style={{ marginRight: 10 }}
                />
            )}
            <TextInput
                ref={inputRef}
                placeholderTextColor="#5c5c5c"
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                {...rest}
                style={{
                    color: textColor,
                    marginRight: 10,
                    flex: 1
                }}
            />

        </View>
    )
}

export default ThemeTextInput

const styles=StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',

    }
})