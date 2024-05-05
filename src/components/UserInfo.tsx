"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { LogOut } from 'lucide-react';
type Props = {
    user: Pick<User, "name" | "email" | "id">
}

const UserInfo = ({ user }: Props) => {

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        {user.name}
                        <p className='text-xs text-gray-400'>{user.email}</p>
                    </DropdownMenuLabel>

                    <DropdownMenuItem className='text-red-600 cursor-pointer gap-1' onClick={() => {
                        signOut().catch(console.error);
                    }}>
                        Logout  <LogOut className='w-4 h-4' />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}

export default UserInfo