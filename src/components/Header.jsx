import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    //프로필 이미지 불러오기
    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    // 검색창 토글
    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    // 검색창 외부 클릭 감지
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)
            ) {
                setIsSearchOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim() === "") {
            navigate("/");
        } else {
            navigate(`/search?q=${encodeURIComponent(value)}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`HeaderNav ${isScrolled ? "scrolled" : ""}`}>
            <div className="primary-navigation">
                <a href="/" className="netflix-logo-btn">
                    <img
                        src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
                        alt="Netflix Logo"
                    />
                </a>

                <ul className="navigation-desktop">
                    <li className="nav-tab">
                        <Link to="/" id="current-active">
                            홈
                        </Link>
                    </li>
                    <li className="nav-tab">
                        <Link to="/series" id="genreCategory">
                            시리즈
                        </Link>
                    </li>
                    <li className="nav-tab">
                        <Link to="/movies" id="genreCategory">
                            영화
                        </Link>
                    </li>
                </ul>

                <div
                    className="navigation-mobile"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <button className="nav-tab" id="nav-menu">
                        메뉴
                    </button>
                    <ul
                        className={`dropdown-menu ${
                            isDropdownOpen ? "open" : ""
                        }`}
                    >
                        <li className="nav-tab1">
                            <Link to="/" id="current-active">
                                홈
                            </Link>
                        </li>
                        <li className="nav-tab1">
                            <Link to="/series" id="genreCategory">
                                시리즈
                            </Link>
                        </li>
                        <li className="nav-tab1">
                            <Link to="/movies" id="genreCategory">
                                영화
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="secondary-navigation">
                <div
                    className="nav-element header-search-container"
                    ref={searchContainerRef}
                >
                    <div
                        className={`search-wrapper ${
                            isSearchOpen ? "active" : ""
                        }`}
                        onClick={() => {
                            if (!isSearchOpen) toggleSearch();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            role="img"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            data-icon="MagnifyingGlassStandard"
                            aria-hidden="true"
                            className="search-icon-inside"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="제목, 사람, 장르"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="nav-element">
                    <button className="notifications-tab">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            data-icon="BellStandard"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="nav-element profile-wrapper">
                    <div className="profile-trigger">
                        <img
                            className="profile-icon"
                            src={
                                profileImage ||
                                "https://occ-0-8232-988.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                            }
                            alt="Netflix Profile Icon"
                        />
                        <span className="triangle-icon"></span>
                    </div>
                    <div className="profile-dropdown">
                        <ul>
                            <li>
                                <i className="fa-solid fa-pen"></i>
                                <span>프로필 관리</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-face-smile"></i>
                                <span>프로필 이전</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-user"></i>
                                <span>계정</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-question"></i>
                                <span>고객 센터</span>
                            </li>
                        </ul>
                        <div className="logout-button">
                            넷플릭스에서 로그아웃
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
