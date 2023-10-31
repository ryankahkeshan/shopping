import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

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
