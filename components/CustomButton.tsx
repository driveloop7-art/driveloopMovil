import React, { ReactNode } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

// 1. Propiedades de estilo que siempre serán opcionales
interface BaseButtonProps extends PressableProps {
    variant?: 'default' | 'outline' | 'textOnly';
    textClassName?: string; //clases para el texto
    className?: string; //clases para el botón (contenedor)
}

// 2. Obligamos a que exista al menos un elemento visual obligatoriamente(título o algún icono)
type ButtonContent =
    // Escenario 1: Tiene texto (iconos opcionales)
    | { title: string; iconLeft?: ReactNode; iconRight?: ReactNode }
    // Escenario 2: Tiene icono izq (texto opcional)
    | { title?: string; iconLeft: ReactNode; iconRight?: ReactNode }
    // Escenario 3: Tiene icono der (texto opcional)
    | { title?: string; iconLeft?: ReactNode; iconRight: ReactNode };


// 3. El tipo final es la unión de la estética más nuestras reglas de contenido
type CustomButtonProps = BaseButtonProps & ButtonContent;

// Fondo y bordes dependiendo de la variante
const variantStyles = {
    default: 'bg-primary shadow-md', // El botón rojo de siempre
    outline: 'bg-transparent border-2 border-primary', // Botón con borde, fondo transparente
    textOnly: 'bg-transparent', // Botón sin fondo (apariencia de enlace)
};

// Color del texto dependiendo de la variante
const textVariantStyles = {
    default: 'text-white',
    outline: 'text-primary',
    textOnly: 'text-primary',
};


const CustomButton = ({
    title,
    variant = 'default',
    iconLeft,
    iconRight,
    className = "",
    textClassName = "",
    ...props

}: CustomButtonProps) => {

    //Si la variante es de solo texto no tiene relleno, si tiene texto tiene relleno, si no tiene texto tiene relleno simétrico
    const paddingClass = variant === 'textOnly' ? 'p-0' : (title ? 'py-4 px-6' : 'p-4');

    //Clases base que todos los botones comparten
    const baseContainerStyles = `rounded-full ${paddingClass} items-center justify-center flex-row active:opacity-80`;

    // Se usa template string. Se combinan las clases: base + la variante + las extras
    const finalContainerStyles = `${baseContainerStyles} ${variantStyles[variant]} ${className}`;

    // Se hace lo mismo para los estilos del texto
    const baseTextStyles = 'text-lg font-roboto-bold';
    const finalTextStyles = `${baseTextStyles} ${textVariantStyles[variant]} ${textClassName}`;

    return (
        <Pressable
            className={finalContainerStyles}
            {...props}
        >
            {/* Si tiene icono izquierdo, lo dibuja */}
            {iconLeft && iconLeft}

            {/* Solo dibujamos la etiqueta <Text> si el usurio envió un título */}
            {title && (
                <Text className={finalTextStyles}>
                    {title}
                </Text>
            )}

            {/* Si tiene icono derecho, lo dibuja */}
            {iconRight && iconRight}
        </Pressable>
    );
};
export default CustomButton;