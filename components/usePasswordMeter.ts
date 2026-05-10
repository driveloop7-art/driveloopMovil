import { useMemo, useState } from 'react';

export interface PasswordConditions {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
}

export type PasswordStrength = 'none' | 'low' | 'medium' | 'high';

/**
 * Hook reutilizable que encapsula toda la lógica de validación de contraseñas.
 * Replica las mismas reglas del backend Laravel (Password::defaults en AppServiceProvider):
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos un número
 * - Al menos un carácter especial
 */
export function usePasswordMeter(password: string) {
    const conditions: PasswordConditions = useMemo(() => ({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()\-_=+{};:,<.>/?\\|`~\[\]"']/.test(password),
    }), [password]);

    const metCount = useMemo(
        () => Object.values(conditions).filter(Boolean).length,
        [conditions]
    );

    const strength: PasswordStrength = useMemo(() => {
        if (password.length === 0) return 'none';
        if (metCount <= 2) return 'low';
        if (metCount === 3) return 'medium';
        return 'high';
    }, [password, metCount]);

    const allConditionsMet = metCount === 4;

    return { conditions, strength, metCount, allConditionsMet };
}
