import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import banner2 from '../../../assets/banner-2.jpg';
import banner3 from '../../../assets/banner-3.jpg';
import banner4 from '../../../assets/banner-4.jpg';
import banner5 from '../../../assets/banner-5.jpg';

const Banner = () => {
    return (
        <>
                <div className="">
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    speed={600}
                    parallax={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper lg:h-[600px]"
                >
                    <SwiperSlide><img className="" src={banner2} alt="" /></SwiperSlide>
                    <SwiperSlide><img className="" src={banner3} alt="" /></SwiperSlide>
                    <SwiperSlide><img className="" src={banner4} alt="" /></SwiperSlide>
                    <SwiperSlide><img className="" src={banner5} alt="" /></SwiperSlide>
                </Swiper></div>
        </>
    );
};

export default Banner;