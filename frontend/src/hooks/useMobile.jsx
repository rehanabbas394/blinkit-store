import React, { useState, useEffect } from "react"

const useMobile = (breakpoint = 768 ) => {
    const [ isMobile, setIsMobile ] = useState(window.innerWidth < breakpoint)

    const hundleResize = () => {
        const checkpoint = window.innerWidth < breakpoint
        setIsMobile(checkpoint)
    }

    useEffect (() => {
        hundleResize()

        window.addEventListener('resize', hundleResize)

        return ()=>{
            window.removeEventListener('resize', hundleResize)
        }
    })

    return [isMobile]
}

export default useMobile