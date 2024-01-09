import React from 'react'
import Navbar from './navbar';
import Footer from './Footer';


function About() {
    return (
        <>
            <Navbar />
            <h2>
                About Document Vault
            </h2>
            <div class='Aboutcontainer'>
            <p>
                The Document Vault is a cutting-edge web application designed to revolutionize the way users manage presentation files. In an era where effective document management and secure access are paramount, our project aims to address these needs comprehensively.
                The User  can register, login, and upload various document formats like PDF, ppt, and doc. The innovative face authentication system eliminates the need for password memorization, enhancing user convenience. The admin  have to search for users based on email or facial recognition, allowing them to access and manage user documents securely.
            </p>
            </div>
            <Footer />
        </>
    )
}

export default About