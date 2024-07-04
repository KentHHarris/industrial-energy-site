const TeslaVideo: React.FC = () => (
    <video className="w-full h-full object-cover object-center z-0"
        preload="auto" playsInline muted loop autoPlay

        poster="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Megapack_Hero_D.jpg" data-poster-desktop="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Megapack_Hero_D.jpg" data-poster-portrait="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Megapack_Hero_D.jpg" data-poster-mobile="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Megapack_Hero_M.jpg"

        data-src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Megapack_Hero_D.mp4"
        data-src-desktop="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Megapack_Hero_D.mp4" data-src-portrait="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Megapack_Hero_D.mp4" data-src-mobile="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto/Megapack_Hero_M.mp4" src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Megapack_Hero_D.mp4">

        <source data-src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto/Megapack_Hero_M.mp4" media="(max-width: 599px) and (orientation: portrait), (max-width: 899px) and (orientation: landscape)" />
        <source data-src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Megapack_Hero_D.mp4" media="(min-width: 900px) and (orientation: landscape)" />
        <source data-src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Megapack_Hero_D.mp4" media="(min-width: 600px) and (orientation:portrait)" />
        Your browser does not support the video tag.
    </video>
);

export default TeslaVideo;
