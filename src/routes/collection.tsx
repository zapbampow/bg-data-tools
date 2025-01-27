import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '~/components/pages/layout'

export function Component() {
    const [value, setValue] = useState("")



    return (
        <Container>
            <h1>Collection Tracker</h1>
            <label>BGG Username to track</label>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button>Submit</button>

            {/* <Outlet /> */}
        </Container>
    )
}