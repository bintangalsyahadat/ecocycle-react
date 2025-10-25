import { useEffect, useState } from "react";
import { classNames, navigation } from "../navbar/NavbarPortal"
import { useLocation, useNavigate } from "react-router-dom";

export default function FooterPortal() {
    const [current, setCurrent] = useState('/');
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (e, sectionId) => {
        if (sectionId != '/') {
            e.preventDefault();
        }
        setCurrent(sectionId);
        if (location.pathname === "/") {
            scroolToSection(sectionId);
        } else {
            navigate("/", { state: { scrollTo: sectionId } });
        }
    };

    useEffect(() => {
        if (location.hash) {
            scroolToSection(location.hash);
        }
    }, [location.state]);

    const scroolToSection = (sectionId) => {
        setCurrent(sectionId == '#main' ? '/' : sectionId);
        if (sectionId != '/') {
            const section = document.querySelector(sectionId);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: "smooth" });
                }, 300);
            }
        }
    }

    return (
        <footer className="bg-(--main-color) dark:bg-gray-900">
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                    <a
                        className="inline-block cursor-pointer rounded-full bg-white p-2 text-(--main-color) shadow-sm transition hover:bg-gray-100 sm:p-3 lg:p-4"
                        onClick={(e) => handleNavClick(e, '#main')}
                    >
                        <span className="sr-only">Back to top</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>

                <div className="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <div className="flex justify-center lg:justify-start mb-16">
                            <a href='/' className="flex shrink-0 items-center text-white font-bold text-4xl">
                                EcoCycle
                            </a>
                        </div>

                        <div className="mt-6 text-white flex gap-10 md:gap-20 justify-center">
                            <div className="text-center md:text-start mb-5">
                                <p className='m-0 font-bold text-sm'>Phone:</p>
                                <a
                                    href="tel:+623216821990"
                                    className="text-white text-decoration-none"
                                >
                                    +62 (321) 682 1990
                                </a>
                            </div>
                            <div className="text-center md:text-start">
                                <p className='m-0 font-bold text-sm'>Email:</p>
                                <a
                                    href="mailto:info@ecocycle.co.id"
                                    className="text-white text-decoration-none"
                                >
                                    info@ecocycle.co.id
                                </a>
                            </div>
                        </div>
                    </div>

                    <ul
                        className="mt-12 flex flex-wrap justify-center md:gap-6 lg:mt-0 lg:justify-end lg:gap-12"
                    >
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                aria-current={current == item.href ? 'page' : undefined}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={classNames(
                                    'text-white hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium',
                                )}
                            >
                                {item.name}
                            </a>
                        ))}
                    </ul>
                </div>

                <p className="mt-12 text-center text-sm text-white lg:text-right">
                    Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                </p>
            </div>
        </footer>
    )
}