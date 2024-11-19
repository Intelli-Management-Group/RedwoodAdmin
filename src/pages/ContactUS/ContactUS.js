import React, { useEffect, useState } from "react";
import ContactUsBanner from "../../Assetes/images/contact-slider.jpg"
import Maps from "../../Assetes/images/maps.jfif"
import Image from "../Component/ImagesComponets/ImagesComponets";
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import Footer from "../Component/Footer/Footer";
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";
import Input from "../Component/InputComponents/InputComponents";
import Button from "../Component/ButtonComponents/ButtonComponents";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    useEffect(() => {
        console.log('component mounted');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        let formErrors = {};

        if (!formData.name) {
            formErrors.name = "Name is required.";
        }

        if (!formData.email) {
            formErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email is not valid.";
        }

        if (!formData.subject) {
            formErrors.subject = "Subject is required.";
        }

        if (!formData.message) {
            formErrors.message = "Message is required.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            console.log(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <div>
            <HeaderComponents />
            <MetaTitle pageTitle={'Contact Us – Redwood Peak Limited'} />
            <div>
                <Image
                    src={ContactUsBanner}
                    className="w-100 bannerHeight"
                    alt="CONTACT US Banner"
                />

            </div>
            <div className="container">
                <div className="container-custom mt-1 mb-5 p-lg-4">
                    <h1 className="header-post-title-class">Contact Us</h1>
                    <div className="mt-3 row m-4">
                        <div className="col-md-8">
                            <p>
                                <strong>
                                    <span style={{ color: "#823535" }}>Redwood Peak Limited</span>
                                </strong>
                            </p>
                            <p>
                                18/Floor, China Hong Kong Tower, 8-12 Hennessy Road, Wan Chai, Hong Kong.
                                <br />
                                Telephone: (852) 2878 3100 &nbsp; &nbsp;Facsimile: (852) 2509 9233
                                <br />
                                Email:{" "}
                                <a
                                    style={{ textDecoration: "underline", color: "#823535" }}
                                    href="mailto:IR@redwoodpeak.com"
                                >
                                    IR@redwoodpeak.com
                                </a>
                            </p>
                            <div id="map" className="mt-5">
                                <Image
                                    src={Maps}
                                    className="w-100 bannerHeight"
                                    alt="CONTACT US Banner"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row pt-5">
                                    <Input
                                        label="Your Name"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                        required
                                    />

                                    <Input
                                        label="E-mail"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        required
                                    />

                                    <Input
                                        label="Subject"
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        error={errors.subject}
                                        required
                                    />
                                    <div className="col-md-12 mt-4">
                                        <label htmlFor="message">Your Message</label>
                                        <textarea
                                            id="message"
                                            className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                        {errors.message && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{errors.message}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row mb-0 mt-3 ml-0 mr-0 ps-2">
                                    <Button
                                        text="Send"
                                        onClick={handleSubmit} 
                                        className="btn-primary"
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
