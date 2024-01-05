import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/TestimonialCarousel.css';
import testimonials from '../data/TestimonialsData';


const TestimonialCarousel = () => {
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-sliding
    autoplaySpeed: 3000, // Set the time between slides in milliseconds (3 seconds in this example)
  };

  return (
    <div className="testimonial-carousel-container" style = {{marginBottom:'30vh'}}>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-item">
            <p className="quote">{testimonial.quote}</p>
            <p className="author">{testimonial.author}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
