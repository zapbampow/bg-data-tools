import { useState } from 'react'
import { useInitCollection } from '~/services/collectionService/initCollection'
import { Container } from '~/components/pages/layout'
import { useNavigate } from 'react-router-dom'

export function Component() {
    const [value, setValue] = useState("")
    const navigate = useNavigate()

    const { mutate, isPending, isError, error } = useInitCollection({
        username: value,
        onSuccess: (res) => {
            navigate(`/collection/${value}?action=${res.action}&message=${res.message}`)
        }
    })

    const errorJSON = isError && JSON.parse(error?.message);
    const errorBody = errorJSON?.body && JSON.parse(errorJSON?.body);
    const errorMessage = errorBody?.error?.message;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate()
    }

    return (
        <Container>
            <h1 className='text-5xl font-semibold text-white mb-8'>Collection Tracking</h1>

            <div className="grid p-4 gap-4 bg-white border rounded">
                <h2>Watch a user's collection and see when they add and remove games</h2>
                <p>Once tracking has been initiated, we will begin to build a history of the changes in their collection.</p>
                <p>Track yourself or a friend's collection.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center my-4">
                    <div className='flex flex-col'>
                        <label className='uppercase text-sm pl-1'>BGG Username to Track</label>
                        <input className="px-4 py-2 rounded-md border border-slate-300 w-fit text-xl" value={value} onChange={(e) => setValue(e.target.value)} placeholder="BGG Username" required />
                    </div>

                    {errorMessage && isError && <p className="p-4 bg-red-100 border border-red-300 text-red-600 rounded-md">Error: {errorMessage}</p>}

                    <button type="submit" className="px-4 py-2 text-3xl font-semibold rounded-md bg-slate-100 border border-slate-300">
                        <span className="text-gradient">{isPending ? "Loading..." : "Submit"}</span>
                    </button>
                </form>

            </div>
        </Container>
    )
}