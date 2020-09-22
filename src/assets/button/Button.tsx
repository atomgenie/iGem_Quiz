import React, { CSSProperties } from "react"
import styles from "./Button.module.scss"

interface props {
    className?: string
    startColor: string
    endColor: string
    borderColor: string
    shadow?: string
    onClick?: () => void
}

export const Button: React.FC<props> = ({
    className,
    children,
    startColor,
    endColor,
    borderColor,
    shadow,
    onClick,
}) => {
    const rootClass = `${styles.root} ${className || ""}`

    const styleBg: CSSProperties = {
        background: `linear-gradient(
            190deg,
            ${startColor} 0%,
            ${endColor} 100%
        )`,
        boxShadow: shadow ? `0px 10px 50px 0px ${shadow}` : undefined,
    }

    return (
        <div className={rootClass} onClick={onClick}>
            <div
                className={styles.borderBottom}
                style={{ backgroundColor: borderColor }}
            />
            <div className={styles.content} style={styleBg}>
                {children}
            </div>
        </div>
    )
}
