import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { userEvent } from "@testing-library/user-event"
import Router from "../Router"
import Slideshow from "./Slideshow"
import { act } from "react-dom/test-utils"

function checkNotHidden(idx) {
    const images = screen.getAllByAltText(/Slide \d+/)
    images.forEach((image, index) => {
        if (index === idx) {
        expect(image).toHaveAttribute('aria-hidden', 'false')
        } else {
        expect(image).toHaveAttribute('aria-hidden', 'true')
        }
    })
}

describe("slideshow", () => {
    beforeEach(() => {
        render(<Router />)
    })

    it("renders first image", () => {
        const firstImage = screen.getByAltText('Slide 1: 3 friends having fun')
        const secondImage = screen.getByAltText('Slide 2: 2 friends smiling at the camera')
        expect(firstImage).toHaveAttribute('aria-hidden', 'false')  
        expect(secondImage).toHaveAttribute('aria-hidden', 'true')             
    })

    it("next and previous buttons work", async () => {
        const nextButton = screen.getByLabelText('View Next Image')
        const prevButton = screen.getByLabelText('View Previous Image')
        const user = userEvent.setup()

        checkNotHidden(0)

        await user.click(nextButton)
        checkNotHidden(1)

        await user.click(nextButton)
        checkNotHidden(2)

        await user.click(prevButton)
        checkNotHidden(1)

        await user.click(prevButton)
        checkNotHidden(0)
    })

    it('check loop around function works', async () => {
        const nextButton = screen.getByLabelText('View Next Image')
        const prevButton = screen.getByLabelText('View Previous Image')
        const user = userEvent.setup()

        await user.click(prevButton)
        checkNotHidden(4)

        await user.click(prevButton)
        checkNotHidden(3)

        await user.click(nextButton)
        checkNotHidden(4)

        await user.click(nextButton)
        checkNotHidden(0)
    })

    it('check if dots work', async () => {
        const button0 = screen.getByLabelText('View Image 1')
        const button1 = screen.getByLabelText('View Image 2')
        const button2 = screen.getByLabelText('View Image 3')
        const button3 = screen.getByLabelText('View Image 4')
        const button4 = screen.getByLabelText('View Image 5')
        const user = userEvent.setup()

        await user.click(button2)
        checkNotHidden(2)

        await user.click(button4)
        checkNotHidden(4)

        await user.click(button1)
        checkNotHidden(1)

        await user.click(button3)
        checkNotHidden(3)

        await user.click(button0)
        checkNotHidden(0)
    })
})

describe('automatic scroll', () => {
    it('custom timer', () => {
        const timer = 5;
        act(async () => {
            render(<Slideshow timer={timer} />)
            await new Promise((resolve) => setTimeout(resolve, timer))
            checkNotHidden(1)
            await new Promise((resolve) => setTimeout(resolve, timer))
            checkNotHidden(2)
            await new Promise((resolve) => setTimeout(resolve, timer))
            checkNotHidden(3)
            await new Promise((resolve) => setTimeout(resolve, timer))
            checkNotHidden(4)
            await new Promise((resolve) => setTimeout(resolve, timer))
            checkNotHidden(0)
        })
    })
})