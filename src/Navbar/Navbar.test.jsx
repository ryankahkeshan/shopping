import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import Router from "../Router";

describe("header", () => {

    beforeEach(() => {
        render(<Router />)
    });

    const getLinks = name => {
        return screen.getByRole("link", { name });
    }

    it("renders logo", () => {
        // First part of logo
        const myLogo = screen.getByText("My");
        expect(myLogo).toBeInTheDocument();
        // Second part of logo
        const shopLogo = screen.getByText("SHOP");
        expect(shopLogo).toBeInTheDocument();
    });

    describe("navigation links", () => {

        it("renders", () => {
            const homeLink = getLinks("Home");
            const collectionsLink = getLinks("Collections");
            const topsLink = getLinks("Tops");
            const pantsLink = getLinks("Pants");
            const shoesLink = getLinks("Shoes");

            expect(homeLink).toBeInTheDocument();
            expect(collectionsLink).toBeInTheDocument();
            expect(topsLink).toBeInTheDocument();
            expect(pantsLink).toBeInTheDocument();
            expect(shoesLink).toBeInTheDocument();
        })
        
        it("links work properly", async () => {
            const homeLink = getLinks("Home");
            const collectionsLink = getLinks("Collections");
            const topsLink = getLinks("Tops");
            const pantsLink = getLinks("Pants");
            const shoesLink = getLinks("Shoes");

            const user = userEvent.setup();

            await user.click(homeLink);
            expect(window.location.pathname).toBe("/");

            await user.click(collectionsLink);
            expect(window.location.pathname).toBe("/collections");

            await user.click(topsLink);
            expect(window.location.pathname).toBe("/tops");

            await user.click(pantsLink);
            expect(window.location.pathname).toBe("/pants");

            await user.click(shoesLink);
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
