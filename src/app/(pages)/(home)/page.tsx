

import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'

type Props = {}

const Home = async (props: Props) => {
    const session = await getAuth();
    if (session?.user) {
        return redirect('/dashboard')
    }
    else {
        return redirect('/login')
    }
}

export default Home