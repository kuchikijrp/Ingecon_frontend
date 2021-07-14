import React, { useState, useEffect } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import api from '../../services/api';

const Slider: React.FC<RouteComponentProps> = ({history}) => {
    const [caminhoFotos, setCaminhoFotos] = useState([])

    useEffect(() => {
        async function caminhoFotos(){
            const fotos = await api.get('/fotos',{});

            setCaminhoFotos(fotos.data)
            console.log(fotos.data)
        }

        caminhoFotos()
    }, [])

    const createCarouselItemImage = (index, options = {}) => (
        <div key={index}>
            <img src={`../fotos/${index}`} />
            {/* <p className="legend">Legend {index}</p> */}
        </div>
    );
    
    const baseChildren = <div>{caminhoFotos.map(createCarouselItemImage)}</div>;
    
      return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
        />

        <div style={{margin:'0 auto'}}>
            <Carousel autoPlay interval={5000} showStatus={true} width={"100vh"} showThumbs={false} infiniteLoop>
                   {baseChildren.props.children}
            </Carousel>
        </div>

    </>
    )
};

export default Slider;