import "../styles/ProfileSelect.css"

export default function ProfileSelect({ onSelect }) {
    const handleSelect = (imageUrl) => {
        localStorage.setItem("profileSelected", "true");
        localStorage.setItem("profileImage", imageUrl);
        onSelect()
    };
        
    return (
        <div className="ProfileSelectPage">
            <div className="logo">
                <a href="/" className="netflix-logo-btn">
                <img
                    src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
                    alt="Netflix Logo"
                />
                </a>
            </div>
            <div className="profile-logo-text">
                <span className="Netflix-title">Netflix를 시청할 프로필을 선택하세요.</span>
            </div>

            <div className="profile">
                <ul className="profile-cards">
                    <li>
                        <button className="profile-card" 
                            onClick={() => handleSelect("https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXh10ggeTTdhZO1JIH_SNQ4gp0vsNnWfE8Mg2ckwzGvUzJMRpPFCujRK3Ex5K9VbkIyvUHQ92LBVdsemkj6zlpquL-qWMCNKeg.png?r=229")}
                        >
                            <div className="profile-card-img">
                            <img className=" default-ltr-cache-rakgus-StyledAvatar ed0ek8i1" src="https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXh10ggeTTdhZO1JIH_SNQ4gp0vsNnWfE8Mg2ckwzGvUzJMRpPFCujRK3Ex5K9VbkIyvUHQ92LBVdsemkj6zlpquL-qWMCNKeg.png?r=229" alt=""/>
                            </div>
                            <span className="profile-card-text">구르미</span>
                        </button>
                    </li>
                    <li>
                        <button className="profile-card" 
                            onClick={() => handleSelect("https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTIZOev-u19Mt_7c0K1XCwCzdTwmEIeOnSktsLHUugSaqg3NEdm7_UwQT61sGtccTocB8YP980t_te4iEfcglFxEHPXxO0WGPA.png?r=7c7")}
                        >
                            <div className="profile-card-img">
                                <img className=" default-ltr-cache-1w30ncu-StyledAvatar ed0ek8i1" src="https://occ-0-8133-58.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTIZOev-u19Mt_7c0K1XCwCzdTwmEIeOnSktsLHUugSaqg3NEdm7_UwQT61sGtccTocB8YP980t_te4iEfcglFxEHPXxO0WGPA.png?r=7c7" alt="서니 칠리즈"/>
                            </div>
                            <span className="profile-card-text">구르다</span>
                        </button>
                    </li>
                    <li>
                        <button className="create-profile-card">
                            <div className="create-profile-card-img">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="plusIcon"
                                >
                                    <path
                                        d="M12 5v14M5 12h14"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <span></span>
                        </button>
                    </li>
                </ul>
                <button className="profile-setting">
                    <span>프로필 관리</span>
                </button>
            </div>
        </div>
    );
    }