import React from 'react'

type Props = {
    listType: 'date' | 'game',
    setListType: (listType: 'date' | 'game') => void
}

export default function ListTypeSelector({ listType, setListType }: Props) {
    const handleClick = () => {
        setListType(listType === 'date' ? 'game' : 'date')
    }

    return (
        <button onClick={handleClick} className='
  px-4 py-1 rounded-md text-slate-700 transition border border-slate-500 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500
 font-semibold  border-transparent  mb-4'>List by {listType === 'date' ? 'game' : 'date'}</button>
    )
}