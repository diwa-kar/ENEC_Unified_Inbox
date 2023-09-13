import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/main-page')
    }

    return (
        <>
            <div className="row gx-0">

                <div className="col-md-6 gy-0">
                    <div className="leftside d-flex justify-content-center align-items-center">
                        <img className="img-fluid mx-auto" src="https://madeinqatar.com.qa/wp-content/uploads/2020/01/QPMC-Logo-400x200-1.png" height={"50vh"} width={'400px'}></img>
                    </div>
                </div>

                <div className="col-md-6 gy-0">
                    <div className="rightside justify-content-center align-items-center">

                        <div class="row justify-content-center align-items-center row-box">
                            <div class="col-md-4">
                                <div className="justify-content-center align-items-center">
                                    <img class=" card-img-logo " src="https://qpmc.qa//ar/assets/images/seo/site-image.jpg" alt="Card image cap" />
                                </div>
                            </div>
                        </div>

                        <div class="row justify-content-center align-items-center row-box">
                            <div class="col-md-5">
                                <div class="card card-cust" onClick={() => navigate('/it-form')}>
                                    <img class="card-img-top" src="https://s3.envato.com/files/251422992/world_transparent_1_2%20(00094).jpg" alt="Card image cap" />
                                    <i class="" aria-hidden="true"></i>
                                    <div class="card-body">
                                        <h5 class="card-text text-center"><b>IT</b></h5>
                                        <h6 class="card-subtitle mb-2 text-muted text-center">Create IT Request</h6>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>

                        <div class="row justify-content-center align-items-center row-box">
                            <div class="col-md-5">
                                <div class="card" onClick={handleNavigate}>
                                    <img class="card-img-top" src="https://www.pushengage.com/wp-content/uploads/2021/08/Push-Notification-Examples-1400x820.jpg" alt="Card image cap" />
                                    <div class="card-body">
                                        <p class="card-text">Notification Dashboard</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;