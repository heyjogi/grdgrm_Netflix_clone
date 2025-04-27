import { useState, useRef, useEffect } from "react";
import "../styles/TrailerSection.css";

const END_IMAGE =
    "https://occ-0-8232-988.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbzsN5gxO9znpWJMddI4ZNlBLz8eABQ8NPUJtsByF0JdNd9jmvyXAZXHw49V8MzcHGaLnnZuUTmkRcxQQXbXnXkrnljNQOGqA9kv.webp?r=b26";

export default function TrailerSection() {
    const [isMuted, setIsMuted] = useState(true);
    const [shrink, setShrink] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [showVideo, setShowVideo] = useState(true);
    const videoRef = useRef(null);
    const shrinkTimeout = useRef(null);

    // 5초 후 shrink 애니메이션 적용
    useEffect(() => {
        if (showVideo && !isEnded) {
            shrinkTimeout.current = setTimeout(() => {
                setShrink(true);
            }, 5000);
            return () => clearTimeout(shrinkTimeout.current);
        }
    }, [showVideo, isEnded]);

    // 동영상이 끝났을 때
    const handleVideoEnd = () => {
        setIsEnded(true);
        setShowVideo(false);
        setShrink(false);
    };

    // 동영상 다시 재생
    const handleReplay = () => {
        setShowVideo(true);
        setIsEnded(false);
        setShrink(false);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
        }, 50);
    };

    // 음소거 토글
    const handleMuteToggle = () => {
        setIsMuted((prev) => {
            const next = !prev;
            if (videoRef.current) {
                videoRef.current.muted = next;
                if (videoRef.current.paused) {
                    videoRef.current.play();
                }
            }
            return next;
        });
    };

    return (
        <div
            className="trailer"
            style={
                !showVideo
                    ? { background: `url(${END_IMAGE}) center/cover no-repeat` }
                    : {}
            }
        >
            {showVideo && (
                <video
                    className="trailer-video"
                    src="test.mp4"
                    autoPlay
                    muted={isMuted}
                    loop={false}
                    playsInline
                    ref={videoRef}
                    onEnded={handleVideoEnd}
                />
            )}

            <div className="trailer-wrapper">
                <div className={`trailer-left${shrink ? " shrink" : ""}`}>
                    <div className="billboard-title">
                        <img
                            alt="하우스"
                            className="title-logo"
                            src="https://occ-0-8232-988.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUohbJyW-2JAy_niDtqyUa4etJj3ezBlYCTTHkFzoCNXbRe52rbhUYOmirc0O-63v0gJl5OUDCdfg3A1MNBjHvZld2N5y3Ei0UPOYF9O83EZ.webp?r=723"
                            title="하우스"
                        />
                    </div>
                    <div className="trailer-description">
                        평범함을 거부하는 천재 의사. 독특한 시각을 가진 그가
                        전문가 팀원들의 도움으로 그 누구도 풀지 못한 의학적
                        미스터리를 해결한다.
                    </div>
                    <div className="trailer-actions-btns">
                        <button className="play-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            data-icon="PlayStandard"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                            ></path>
                          </svg>
                          <span>재생</span>
                        </button>
                        <button className="info-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            data-icon="CircleIStandard"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                           <span>상세 정보</span>
                        </button>
                    </div>
                </div>

                <div className="trailer-right">
                    {isEnded ? (
                        <button
                            className="mute-btn"
                            aria-label="다시 재생"
                            onClick={handleReplay}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                data-icon="RefreshStandard"
                                aria-hidden="true"
                            >
                                <path
                                    fill="currentColor"
                                    d="M20.6625 7C18.9328 4.00995 15.7002 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12H24C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C16.1752 0 19.8508 2.13204 22 5.36482V2H24V8C24 8.55228 23.5523 9 23 9H17V7H20.6625Z"
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    ) : (
                        <button
                            className="mute-btn"
                            aria-label={isMuted ? "음소거 해제" : "음소거"}
                            onClick={handleMuteToggle}
                        >
                            {isMuted ? (
                                // 음소거 아이콘
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="32"
                                    height="32"
                                    data-icon="VolumeOffStandard"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            ) : (
                                // 볼륨 아이콘
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="32"
                                    height="32"
                                    data-icon="VolumeHighStandard"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    )}
                    <div className="age-badge">
                      <svg id="maturity-rating-977" 
                        viewBox="0 0 100 100" 
                        className="age-img">
                        <path id="Fill---Orange" 
                          fill="#CD6D34" 
                          d="M88.727 100H11.27C5.05 100 0 94.952 0 88.727V11.273C0 5.047 5.05 0 11.27 0h77.457C94.952 0 100 5.047 100 11.273v77.454C100 94.952 94.952 100 88.727 100">
                          </path>
                          <path id="path15" 
                            fill="#FFFFFE" 
                            d="M36.876 15.482v68.651H21.509v-49.51h-5.484l7.097-19.141h13.754zm45.46 0V28.87H57.175v10.063h24.08c.845 0 1.533.687 1.533 1.534v42.13c0 .845-.688 1.532-1.534 1.532H43.616a1.533 1.533 0 01-1.533-1.533V62.202H57v8.988h10.874V52.052h-25.79v-36.57h40.254z">
                          </path>
                      </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
