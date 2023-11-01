import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import CollectionPage from "../CollectionPage/CollectionPage";

describe("header", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>)
    });

    const getLinks = name => {
        return screen.getByRole("link", { name });
    }

    it("renders logo", () => {
        // First part of logo
        const logo = screen.getByTestId('logo');
        expect(logo.textContent).toMatch("MySHOP");
    });

    describe("navigation links", () => {

        it("renders", () => {
            const homeLink = getLinks("Home");
            const collectionsLink = getLinks("Collections");
            const mensLink = getLinks("Mens");
            const womensLink = getLinks("Womens");
            const jewelryLink = getLinks("Jewelry");
            
            expect(homeLink).toBeInTheDocument()
            expect(collectionsLink).toBeInTheDocument()
            expect(mensLink).toBeInTheDocument()
            expect(womensLink).toBeInTheDocument()
            expect(jewelryLink).toBeInTheDocument()
        })
        
        it("links work properly", async () => {
            const homeLink = getLinks("Home");
            const collectionsLink = getLinks("Collections");
            const mensLink = getLinks("Mens");
            const womensLink = getLinks("Womens");
            const jewelryLink = getLinks("Jewelry");

            const user = userEvent.setup();

            await user.click(homeLink);
            expect(window.location.pathname).toBe("/");

            await user.click(collectionsLink);
            expect(window.location.pathname).toBe("/collections");

            await user.click(mensLink);
            expect(window.location.pathname).toBe("/mens");

            await user.click(womensLink);
            expect(window.location.pathname).toBe("/womens");

            await user.click(jewelryLink);
            expect(window.location.pathname).toBe("/jewelry");
        })
    })

    it("renders cart icons", () => {
        // Test the cart icons and count
        const cartIcon = screen.getByTestId("cart-icon");
        const cartCircle = screen.getByTestId("cart-circle");
        const cartNum = screen.getByTestId("cart-num");
    
        expect(cartIcon).toBeInTheDocument();
        expect(cartCircle).toBeInTheDocument();
        expect(cartNum).toBeInTheDocument();
        expect(cartNum)
    });

    it("cart count is set to 0 on load", () => {
        const cartNum = screen.getByTestId("cart-num");
        expect(cartNum).toHaveTextContent("0");
    })
});

describe('navbar-more', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )
    })
    it('renders', async () => {
        const more = screen.getByRole('link', {name: 'More ▼'})
        expect(more).toBeInTheDocument()
        expect(screen.getByText(/about us/i).parentElement).not.toHaveClass('nav-dropdown-content-shown')
        const story = screen.getByRole('link', {name: 'Our Story'})
        expect(story).toBeInTheDocument()
        const contact = screen.getByRole('link', {name: 'Contact Us'})
        expect(contact).toBeInTheDocument()

        const user = userEvent.setup()
        await user.hover(more)
        const about = screen.getByRole('link', {name: 'About Us'})
        expect(about.parentElement).toHaveClass('nav-dropdown-content-shown')
    })

    it('links work', async () => {
        const about = screen.getByRole('link', {name: 'About Us'})
        const user = userEvent.setup()

        await user.click(about)
        expect(window.location.pathname).toBe('/about-us')

        const story = screen.getByRole('link', {name: 'Our Story'})
        await user.click(story)
        expect(window.location.pathname).toBe('/our-story')

        const contact = screen.getByRole('link', {name: 'Contact Us'})
        await user.click(contact)
        expect(window.location.pathname).toBe('/contact-us')
    })
})

describe("navbar", () => {
    it('shows cart after click', async () => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        )
        const cart = screen.getByTestId('cart-icon')
        const beforeOpen = screen.queryByText('Your Cart')
        expect(beforeOpen).toBeNull()

        const user = userEvent.setup()
        await user.click(cart)

        const afterOpen = screen.getByText('Your Cart')
        expect(afterOpen).toBeInTheDocument()
    })
})