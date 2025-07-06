"use client"
import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
// Import Swiper core and required modules
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
// AOS
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const IndustrySlider = () => {
    useEffect(() => {
        AOS.init({
            // You can add options here
            duration: 1400,
        });
    }, []);
    return (
        <>
            {/* textile */}
            <Container className='pt-5 d-flex justify-content-center' data-aos="fade-up">
                <h1 className='fw-bold display-5'>
                    Textile Products
                </h1>
            </Container>
            <Container>
                {/* home textiles */}
                <Container>
                    <h2 className='text-orange text-center fst-italic fs-1' data-aos="fade-down">
                        Home Textiles
                    </h2>
                </Container>
                <Container className='mt-5'>
                    <Row className='justify-content-center' data-aos="fade-up" data-aos-duration="3000">
                        <Col>
                            <Swiper
                                modules={[A11y, Autoplay]}
                                autoplay={{
                                    delay: 2000, // Delay between slides in milliseconds (3000ms = 3s)
                                    disableOnInteraction: false, // Keep autoplay running even when a slide is clicked
                                }}
                                loop={true}
                                spaceBetween={50}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 7,
                                        spaceBetween: 40,
                                    },
                                }}
                            // pagination={{ clickable: true }}
                            >
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Fabrics/White Fabric/White Fabrics 6.webp"
                                                    alt="White Fabric"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>White Fabrics</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Fabrics/Dyed Fabrics/Dyed Fabrics 2.webp"
                                                    alt="Dyed Fabrics"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Dyed Fabrics</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Fabrics/Print Fabrics/Print Fabrics 6.webp"
                                                    alt="Print Fabrics"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Print Fabrics</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Sheet Sets/Sheet Sets 3.webp"
                                                    alt="Sheet Sets"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Sheet Sets</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Quilt Cover Sets/Quilt Cover Sets 3.webp"
                                                    alt="Quilt Cover Sets"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Quilt Cover Sets</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Comforter Set/Comforter Sets 6.webp"
                                                    alt="Comforter Sets"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Comforter Sets</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Mattress Cover/Mattress Covers 6.webp"
                                                    alt="Mattress Covers"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Mattress Covers</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Valance Sheets/Valance Sheets 1.webp"
                                                    alt="Valance Sheets"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Valances</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Curtains/Curtains 2.webp"
                                                    alt="Curtains"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Curtains</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Ironing Board Cover/Ironing Board Cover 3.webp"
                                                    alt="Ironing Board Cover"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Ironing Board Covers</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Individual Flat Sheets/Individual Flat Sheets 5.webp"
                                                    alt="Individual Flat Sheets"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Individual Flat Sheets</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Fitted Sheets/Fitted Sheet 6.webp"
                                                    alt="Fitted Sheet"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Fitted Sheets</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Pillow Cases/Pillow Cases 2.webp"
                                                    alt="Pillow Cases"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Pillow Cases</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/Home Textiles/Madeups/Hotel Sheeting/Hotel Sheeting 2.webp"
                                                    alt="Hotel Sheeting"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Hotel Sheeting</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                            </Swiper>
                        </Col>
                    </Row>
                </Container>
                {/* Garments */}
                <Container>
                    <h2 className='text-orange text-center fst-italic fs-1' data-aos="fade-down">
                        Garments
                    </h2>
                </Container>
                <Container className='mt-5'>
                    <Row className='justify-content-center' data-aos="zoom-in" data-aos-duration="3000">
                        <Col>
                            <Swiper
                                modules={[A11y, Autoplay]}
                                autoplay={{
                                    delay: 2000, // Delay between slides in milliseconds (3000ms = 3s)
                                    disableOnInteraction: false, // Keep autoplay running even when a slide is clicked
                                }}
                                loop={true}
                                spaceBetween={50}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 7,
                                        spaceBetween: 40,
                                    },
                                }}
                            // pagination={{ clickable: true }}
                            >
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Women Garments/Women T-Shirts/Women T Shirts 1.webp"
                                                    alt="Women T-Shirts"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Women&apos;s T-Shirts</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Women Garments/Women Hoodies/Women Hoodies 4.webp"
                                                    alt="Women Hoodies"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Women&apos;s Hoodies</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Women Garments/Women Trousers/Women Trousers 3.webp"
                                                    alt="Women Trousers"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Women&apos;s Trousers</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Women Garments/Women Denim Jeans/Women Denim Jeans 2.webp"
                                                    alt="Women Denim Jeans"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Women&apos;s Denim Jeans</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Children Garments/Children T-Shirts/Children T Shirts 4.webp"
                                                    alt="Children T-Shirts"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Children&apos;s T-Shirts</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Children Garments/Chilcren Polo Shirts/Children Polo Shirts 4.webp"
                                                    alt="Children Polo Shirts"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Children&apos;s Polo Shirts</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Children Garments/Children Pajamas/Children Pajamas 6.webp"
                                                    alt="Children Pajamas"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Children&apos;s Pajamas</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Children Garments/Children Romper/Children Rompers 1.webp"
                                                    alt="Children Rompers"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Children&apos;s Rompers</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Children Garments/Children Skirts/Children Skirts 2.webp"
                                                    alt="Children Skirts"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Children&apos;s Skirts</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Children Garments/Children Shorts/Children Shorts 3.webp"
                                                    alt="Children Shorts"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Children&apos;s Shorts</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Mens Garments/Mens T Shirts/Men T Shirts 6.webp"
                                                    alt="Men T Shirts"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Men&apos;s T-Shirt</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Mens Garments/Mens Polo Shirts/Men Polo Shirts 1.webp"
                                                    alt="Men Polo Shirts"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Men&apos;s Polo Shirt</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Mens Garments/Mens Nightwear/Men Nightwear 1.webp"
                                                    alt="Men Nightwear"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Men&apos;s Nightwears</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Mens Garments/Mens Trousers/Men Trousers 2.webp"
                                                    alt="Men Trousers"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Men&apos;s Trousers</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Mens Garments/Mens Denim Jeans/Mens Denim Jeans 1.webp"
                                                    alt="Men's Denim Jeans"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Men&apos;s Denim Jeans</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/garments/Mens Garments/Mens Hooded Jackets/Mens Hooded Jackets 2.webp"
                                                    alt="Men's Hooded Jackets"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Men&apos;s Hooded Jackets</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                            </Swiper>
                        </Col>
                    </Row>
                </Container>
                {/* Towels */}
                <Container>
                    <h2 className='text-orange text-center fst-italic fs-1' data-aos="fade-down">
                        Towels
                    </h2>
                </Container>
                <Container className='mt-5'>
                    <Row className='justify-content-center' data-aos="fade-up" data-aos-duration="3000">
                        <Col>
                            <Swiper
                                modules={[A11y, Autoplay]}
                                autoplay={{
                                    delay: 2000, // Delay between slides in milliseconds (3000ms = 3s)
                                    disableOnInteraction: false, // Keep autoplay running even when a slide is clicked
                                }}
                                loop={true}
                                spaceBetween={50}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 7,
                                        spaceBetween: 40,
                                    },
                                }}
                            // pagination={{ clickable: true }}
                            >
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Terry Towels/Terry Towels 6.webp"
                                                    alt="Terry Towels"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Terry Towels</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Bath Towels/Bath Towels 1.webp"
                                                    alt="Bath Towels"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Bath Towels</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Hand Towels/Hand Towels 2.webp"
                                                    alt="Hand Towels"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Hand Towels</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Bath Mats/Bath Mats 5.webp"
                                                    alt="Bath Mats"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Bath Mats</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Beach Towel/Beach Towels 4.webp"
                                                    alt="Beach Towels"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Beach Towels</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Kids Hooded Towels/Kids Hooded Towel 4.webp"
                                                    alt="Kids Hooded Towels"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Kids Hooded Towels</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Spa Towels/Spa Towel 1.webp"
                                                    alt="Spa Towels"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Spa Towels</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Card className='border-0 htcards' style={{ width: '100%' }}>
                                        <div className='img-container'>
                                            <div className='img-container rounded-circle'>
                                                <img
                                                    className='expertise-card-img img-fluid rounded-circle'
                                                    src="/images/towels/Gym Towels/Gym Towel 5.webp"
                                                    alt="Gym Towels"
                                                    layout="responsive"
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <Card.Body className='px-0 mt-1 text-center'>
                                            <p>Gym Towels</p>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                            </Swiper>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default IndustrySlider;
