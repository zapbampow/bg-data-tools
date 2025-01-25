import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

export function Component() {
    const [value, setValue] = useState("")



    return (
        <div>
            <h1>Collection Tracker</h1>
            <label>BGG Username to track</label>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button>Submit</button>

            <Outlet />
        </div>
    )
}