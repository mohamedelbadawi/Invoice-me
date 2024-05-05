"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {
    text: string
}

const LoginButton = ({ text }: Props) => {
    return (
        <div>
            <Button variant={'outline'}>
                <Link href={'/login'}>
                    {text}
                </Link>
            </Button>
        </div>
    )
}

export default LoginButton