import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import Router from "../Router";

describe("footer", () => {
    beforeEach(() => {
        render(<Router />);
    })

    const getLinks = name => {
        return screen.getAllByRole("link", { name });
    }

    it("renders shop now and links", () => {
        const shopNow = screen.getByText("Shop Now");
        expect(shopNow).toBeInTheDocument();
        // Get links
        const collectionsLink = getLinks("Collections");
        const mensLink = getLinks("Mens");
        const womensLink = getLinks("Womens");
        const jewelryLink = getLinks("Jewelry");
        
        expect(collectionsLink[1]).toHaveClass('footer-links');
        expect(mensLink[1]).toHaveClass('footer-links');
        expect(womensLink[1]).toHaveClass('footer-links');
        expect(jewelryLink[1]).toHaveClass('footer-links');
    })

    it("shop now links' work", async () => {
        // Get links
        const collectionsLink = getLinks("Collections");
        const mensLink = getLinks("Mens");
        const womensLink = getLinks("Womens");
        const jewelryLink = getLinks("Jewelry");

        const user = userEvent.setup();

        await user.click(collectionsLink[1]);
        expect(window.location.pathname).toBe("/collections");

        await user.click(mensLink[1]);
        expect(window.location.pathname).toBe("/mens");

        await user.click(womensLink[1]);
        expect(window.location.pathname).toBe("/womens");

        await user.click(jewelryLink[1]);
        expect(window.location.pathname).toBe("/jewelry");
    })

    it("renders useful links", () => {
        // Get links
        const usefulLinks = screen.getByText("Useful Links");
        const aboutUs = screen.getByText("About Us");
        const ourStory = screen.getByText("Our Story");
        const contact = screen.getByText("Contact Us");
        // Check if they are in the document
        expect(usefulLinks).toBeInTheDocument();
        expect(aboutUs).toBeInTheDocument();
        expect(ourStory).toBeInTheDocument();
        expect(contact).toBeInTheDocument();
    })

    it("useful links work", async () => {
        // Get links
        const aboutUs = screen.getByText("About Us");
        const ourStory = screen.getByText("Our Story");
        const contact = screen.getByText("Contact Us");

        const user = userEvent.setup();

        await user.click(aboutUs);
        expect(window.location.pathname).toBe('/about-us');

        await user.click(ourStory);
        expect(window.location.pathname).toBe('/our-story');

        await user.click(contact);
        expect(window.location.pathname).toBe('/contact-us');
    })

    it("renders be in the know", () => {
        const beInTheKnow = screen.getByText("Be in the know");
        expect(beInTheKnow).toBeInTheDocument();

        const subcscribe = screen.getByText("Subscribe to our newsletter for exclusive discounts & offers");
        expect(subcscribe).toBeInTheDocument();

        const input = screen.getByLabelText("Subscribe to our newsletter for exclusive discounts & offers");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(''); 

        const button = screen.getByTestId("newsletter-btn");
        expect(button).toBeInTheDocument();
    })

    it("newsletter works", async () => {
        const input = screen.getByLabelText("Subscribe to our newsletter for exclusive discounts & offers");
        const button = screen.getByTestId("newsletter-btn");

        const user = userEvent.setup();
        // Simulate clicking button with no input
        await user.click(button);
        expect(input).toHaveValue("");
        const missing = screen.getByPlaceholderText("Email missing");
        expect(missing).toBeInTheDocument();
        // Simulate clicking button with bad input
        await user.click(input);
        expect(input).toHaveFocus();
        await user.keyboard("abc");
        expect(input).toHaveValue("abc");
        await user.click(button);
        const wrong = screen.getByPlaceholderText("Invalid email");
        expect(wrong).toBeInTheDocument();
        // Simulate correct input
        await user.click(input);
        expect(input).toHaveFocus();
        await user.keyboard("abc@example.com");
        expect(input).toHaveValue("abc@example.com");
        await user.click(button);
        expect(input).toHaveValue("");
        const correct = screen.getByPlaceholderText("Thank you for subscribing");
        expect(correct).toBeInTheDocument();
    })

    it("renders socials", () => {
        const instagram = screen.getByLabelText("instagram social icon");
        expect(instagram).toBeInTheDocument();

        const facebook = screen.getByLabelText("facebook social icon");
        expect(facebook).toBeInTheDocument();

        const pinterest = screen.getByLabelText("pinterest social icon");
        expect(pinterest).toBeInTheDocument();

        const tiktok = screen.getByLabelText("tiktok social icon");
        expect(tiktok).toBeInTheDocument();
    })

    it("renders copyright", () => {
        const copryright = screen.getByText("© 2023, My");
        expect(copryright).toBeInTheDocument();
    })
})