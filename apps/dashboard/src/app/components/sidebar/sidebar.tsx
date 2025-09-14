import clsx from "clsx";
import { motion } from "motion/react";
import { FC, ReactNode } from "react"
import { LinkProps, matchPath, NavLink, useLocation } from "react-router-dom"

const MotionNavLink = motion(NavLink);

export const Sidebar = () => {
    return <div className="fixed left-0 top-0 h-svh z-30">
        <nav className="h-full">
            <ul className="flex flex-col items-end space-y-6 h-full justify-end pb-10 box-border overflow-visible">
                <MenuItem to="/" icon={<span role="img" aria-label="home">🏠</span>}>Home</MenuItem>
                <MenuItem to="/sunset" icon={<span role="img" aria-label="sunset">🌅</span>}>Sunset</MenuItem>
            </ul>
        </nav>
    </div>
}

interface MenuItemProps extends LinkProps {
    icon: ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ to, children, icon }) => {
    const { pathname } = useLocation();
    const isActive = !!matchPath(to.toString(), pathname);

    return <li className="relative size-10">
        <MotionNavLink
            to={to}
            className={active => clsx('bg-[#362e7b] text-[#bcb4cc] hover:bg-[#6360b1] p-2 rounded-r-md flex gap-1 z-30 w-24 justify-end absolute transition-all outline outline-[#bcb4cc]', {
                'bg-[#6360b1]': active.isActive,
            })}
            initial={false}
            animate={{ left: isActive ? '0' : '-60px' }}
            transition={{ type: 'tween', stiffness: 200, damping: 30, duration: 0.01 }}
        >
            <div>{children}</div>
            <div className="flex items-center justify-end w-10">{icon}</div>
        </MotionNavLink>
    </li>;
}