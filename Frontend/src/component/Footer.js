import React from 'react'
import "./bootstrap.min.css";
import "./style.css";
export default function Footer() {
    return (
        <div>
            <br />
            <footer class="footer">
                <ul class="menu">
                    <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
                    <li class="menu__item"><a class="menu__link" href="#">About</a></li>
                </ul>
                <p>&copy; NIT-TRICHY | All Rights Reserved</p>
            </footer>
    </div >
  );
}
