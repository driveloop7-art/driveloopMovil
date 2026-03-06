import React from 'react';
import { Image, View, ViewProps } from 'react-native';

interface LogoProps extends ViewProps {
    width?: number | string;
    height?: number | string;
}

const Logo = ({ width = 192, height = 96, style, ...props }: LogoProps) => {
    return (
        <View className="items-center" style={style} {...props}>
            <Image
                source={require('../assets/images/logo.png')}
                style={{
                    width: typeof width === 'number' ? width : undefined,
                    height: typeof height === 'number' ? height : undefined
                }}
                className={typeof width === 'string' ? width : ''}
                resizeMode="contain"
            />
        </View>
    );
};

export default Logo;
