import React from 'react'

const Carousel = () => {
    return (
        <>
            <div className='p-3' style={{ width: "50%" }}>
                <div id="carouselExampleCaptions" className="carousel slide py-5 my-5" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="http://assets.myntassets.com/assets/images/17097806/2022/2/10/a5a0cf0b-7682-45bd-b9fc-665eb509a2651644484312964MastHarbourMenWhiteStripedSneakers3.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="http://assets.myntassets.com/assets/images/17097806/2022/2/10/aa9f5212-f2eb-4531-b836-1df0c3d3fe2d1644484313283MastHarbourMenWhiteStripedSneakers1.jpg" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <div className="carousel-item">
                                    <img src="http://assets.myntassets.com/assets/images/17097806/2022/2/10/a5a0cf0b-7682-45bd-b9fc-665eb509a2651644484312964MastHarbourMenWhiteStripedSneakers3.jpg" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel
