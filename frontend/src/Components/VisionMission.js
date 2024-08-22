import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VisionMission.css';

const VisionMission = () => {
    return (
        <div className="container text-center mt-5">
            <h2>Vision Mission</h2>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="image-container">
                        <img
                            src="./image/Vision-aim.jpeg" // Update with actual image paths
                            className="img-fluid"
                            alt="Vision"
                        />
                        <div className="overlay">
                        <div>
                                <h3>VISION</h3>
                                <p>
                                    Institute for Advanced Computing and Software Development is committed to
                                    producing high-quality manpower with technical and intellectual skills...
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="image-container">
                        <img
                            src="./image/m1.jpeg" // Update with actual image paths
                            className="img-fluid"
                            alt="Mission"
                        />
                        <div className="overlay">
                        <div>
                                <h3>MISSION</h3>
                                <p>
                                    To provide students with knowledge, skills, and abilities needed to solve
                                    real-world problems...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="image-container">
                        <img
                            src="./image/management-team.jpeg" // Update with actual image paths
                            className="img-fluid"
                            alt="Team"
                        />
                        <div className="overlay">
                        <div>
                                <h3>TEAM</h3>
                                <p>
                                    Our dedicated team is here to support your growth and help you succeed in the
                                    professional world...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMission;
