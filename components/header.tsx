import Link from 'next/link';
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from "@heroui/navbar";
import { AncHKLogo } from './icons';
import HeaderAuth from './header-auth';
import SearchInput from './search-input';
import { Suspense } from 'react';
import TodayWeather from './today-weather';

export default function Header() {
    return (
        <HeroUINavbar className='shadow mb-6' maxWidth="xl">
            <NavbarBrand>
                <AncHKLogo />
                <Link href="/" className='font-bold'>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem>
                    <Suspense>
                        <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <HeaderAuth />
                <TodayWeather />
            </NavbarContent>
        </HeroUINavbar>
    );
}
