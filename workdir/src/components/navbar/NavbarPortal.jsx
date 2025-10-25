import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
]

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function NavSocialPortal() {
  return (
    <div className="flex justify-center gap-3">
      {
        [
          {
            'url': 'https://facebook.com',
            'icon': faFacebook
          },
          {
            'url': 'https://instagram.com',
            'icon': faInstagram
          },
          {
            'url': 'https://tiktok.com',
            'icon': faTiktok
          }
        ].map((social, index) => (
          <Link className="text-white text-decoration-none" key={index} to={social.url} target='_blank'>
            <FontAwesomeIcon icon={social.icon} />
          </Link>
        ))
      }
    </div>
  )
}

export default function NavbarPortal({ contentSectionRef }) {
  const [onContentSection, setOnContentSection] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
    setCurrent(sectionId);
    if (sectionId != '/') {
      const section = document.querySelector(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }


  useEffect(() => {
    const section = contentSectionRef?.current;
    if (!section) return;

    const isMobile = window.innerWidth <= 992;
    const thresholdValue = isMobile ? 0.1 : 0.3;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnContentSection(entry.isIntersecting);
      },
      { threshold: thresholdValue }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [contentSectionRef]);


  const showBackground = onContentSection || expanded;
  const navbarBgColor = showBackground
    ? "bg-(--main-color)"
    : "bg-transparent";

  return (
    <div className='fixed top-0 z-99 w-full'>
      <Disclosure as="nav" className={"relative " + navbarBgColor}>
        {
          ({ open, close }) => {
            useEffect(() => {
              setExpanded(open);
            }, [open]);

            return (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      <DisclosureButton className={
                        (showBackground ? "text-white" : "text-gray-400") +
                        " group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-white/5 hover:text-white"
                      }>
                        <span className="absolute -inset-0.5" />
                        <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                      </DisclosureButton>
                    </div>
                    <div className="ps-10 flex flex-1 items-center justify-start sm:items-stretch md:justify-center">
                      <a href='/' className="flex shrink-0 items-center text-white font-bold text-xl">
                        EcoCycle
                      </a>
                      <div className="md:flex md:justify-center md:w-full">
                        <div className="hidden sm:ml-6 sm:block">
                          <div className="flex space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                aria-current={current == item.href ? 'page' : undefined}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={classNames(
                                  current == item.href ? 'text-white' : 'text-gray-300 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium',
                                )}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <Menu as="div" className="relative">
                        <NavSocialPortal />
                      </Menu>
                    </div>
                  </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        aria-current={current == item.href ? 'page' : undefined}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          close();
                        }}
                        className={classNames(
                          current == item.href ? 'bg-white/5 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                </DisclosurePanel>
              </>
            )
          }
        }
      </Disclosure>
    </div>
  )
}
