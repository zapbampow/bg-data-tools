import { Play as PlayIcon } from "../icons"

interface ActionIconProps {
    action: 'add' | 'remove' | 'initAdd'
}

const ActionIcon = ({ action }: ActionIconProps) => {
    switch (action) {
        case 'add':
            return <Plus />
        case 'remove':
            return <Minus />
        case 'initAdd':
            return <Play />
        default:
            return null;
    }
}

const Plus = () => (
    <span className="w-4 text-center text-green-600 font-semibold" title="game added">+</span>)

const Minus = () => (
    <span className="w-4 text-center text-red-600 font-semibold" title="game removed">-</span>)

const Play = () => (
    <span className="text-blue-600 font-semibold" title="Tracking began"><PlayIcon width={16} stroke="none" className="fill-green-600" /></span>)


export { ActionIcon, Plus, Minus }