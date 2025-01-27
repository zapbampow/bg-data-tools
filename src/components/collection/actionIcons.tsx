interface ActionIconProps {
    action: 'add' | 'remove'
}

const ActionIcon = ({ action }: ActionIconProps) => {
    switch (action) {
        case 'add':
            return <Plus />
        case 'remove':
            return <Minus />
        default:
            return null;
    }
}

const Plus = () => (
    <span className="text-green-600 font-semibold">+</span>)

const Minus = () => (
    <span className="text-red-600 font-semibold">-</span>)


export { ActionIcon, Plus, Minus }