import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import Router from "../Router";

describe("header", () => {

    beforeEach(() => {
        render(<Router />)
    });

    const getLinks = name => {
        return screen.getAllByRole("link", { name });
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
            const topsLink = getLinks("Tops");
            const pantsLink = getLinks("Pants");
            const shoesLink = getLinks("Shoes");
            
            expect(homeLink[0]).toHaveClass('nav-link');
            expect(collectionsLink[0]).toHaveClass('nav-link');
            expect(topsLink[0]).toHaveClass('nav-link');
            expect(pantsLink[0]).toHaveClass('nav-link');
            expect(shoesLink[0]).toHaveClass('nav-link');
        })
        
        it("links work properly", async () => {
            const homeLink = getLinks("Home");
            const collectionsLink = getLinks("Collections");
            const topsLink = getLinks("Tops");
            const pantsLink = getLinks("Pants");
            const shoesLink = getLinks("Shoes");

            const user = userEvent.setup();

            await user.click(homeLink[0]);
            expect(window.location.pathname).toBe("/");

            await user.click(collectionsLink[0]);
            expect(window.location.pathname).toBe("/collections");

            await user.click(topsLink[0]);
            expect(window.location.pathname).toBe("/tops");

            await user.click(pantsLink[0]);
            expect(window.location.pathname).toBe("/pants");

            await user.click(shoesLink[0]);
            expect(window.location.pathname).toBe("/shoes");
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
