import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react'
import Lottie from "lottie-react"
import search from "../../assets/searchClock.json"
import cart from "../../assets/cart.json"
import user from "../../assets/userAnimation.json"

import '../../css/nav.css'
import Desktop from './Desktop';
import Profile from './Profile';
import MobileNav from './MobileNav';

export default function Header({ setIsLoggedIn, setFilterName, setHideNav, token, API_URL, setFavorites, showProfile, setShowProfile, filterName, setShowFavorite, setShowOrder, setPageTitle, setShowCart }) {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    const [showSearch, setShowSearch] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [prevFilterName, setPrevFilterName] = useState("")
    const [isCategorieOpen, setIsCategorieOpen] = useState(false);
    const inputRef = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    const handleSearch = (event) => {
        setFilterName(event.target.value)
        setSearchInput(event.target.value)
    }

    const fetchFavorites = async () => {
        try {
            try {
                const favoriteProducts = await fetch(`${API_URL}favorite/myFavorites`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const products = await favoriteProducts.json();
                console.log("FAVORITES: ", products)
                setFavorites(products)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSerachBar = (event) => {
        event.preventDefault()
        event.target.elements.txt.blur()
        setFilterName(searchInput)
        setShowSearch(!showSearch)
        setIsCategorieOpen(false)
        navigate('/products');
    }

    const searchClick = () => {
        setPrevFilterName(filterName)
        setShowSearch(!showSearch)
        setShowProfile(false)
        setIsCategorieOpen(false)
        navigate('/products');
        if (showSearch) {
            setFilterName(prevFilterName)
        } else {
            setFilterName(searchInput)
        }
    }

    const handleCartIconClick = () => {
        setShowProfile(false)
        setIsCategorieOpen(false)
        setShowFavorite(false)
        setShowOrder(false)
        setShowCart(true)
        setPageTitle("SHOPPING CART")
    }

    return (
        <nav className='navbar' id='topHeader'>
            <Desktop setFilterName={setFilterName} setShowProfile={setShowProfile} setIsCategorieOpen={setIsCategorieOpen} isCategorieOpen={isCategorieOpen} />
            <MobileNav />

            <section className='rightNav'>
                <section className='navIcons'>

                    <form className="box" onSubmit={handleSerachBar}>
                        <input
                            type="text"
                            className={`searchInput ${showSearch ? 'active' : ''}`}
                            name="txt"
                            onChange={handleSearch}
                            placeholder="Search..."
                            ref={inputRef}
                        />
                    </form>
                    <Lottie className="headerIcon" animationData={search} loop={false} onClick={() => {
                        searchClick();
                    }} />
                    <Link to='/cart' className='navCartIcons' onClick={() => { handleCartIconClick() }}>
                        <Lottie className="cartIcon" animationData={cart} loop={false} />
                    </Link >

                </section>
                {isLoggedIn ?
                    <section>
                        <section className='profileSection'>
                            <Lottie className="userIcon" animationData={user} loop={false} onClick={() => { setShowProfile(!showProfile); fetchFavorites(); setIsCategorieOpen(false) }} />
                        </section>


                        {showProfile && <Profile setIsLoggedIn={setIsLoggedIn} setShowProfile={setShowProfile} showProfile={showProfile} setShowFavorite={setShowFavorite} setShowOrder={setShowOrder} setShowCart={setShowCart} setPageTitle={setPageTitle} />}
                    </section>
                    :
                    <section className='navLogContainer'>
                        <Link to='/register' id='signUpBtn' className='navBtn' onClick={() => { setHideNav(true); setIsCategorieOpen(false) }}>Sign Up</Link>
                        <Link to='/login' className='navBtn navLog' onClick={() => { setHideNav(true); setIsCategorieOpen(false) }}>Login</Link>
                    </section>
                }
            </section>
        </nav>
    )
}
