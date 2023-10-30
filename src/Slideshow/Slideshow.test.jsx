import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { userEvent } from "@testing-library/user-event"
import Router from "../Router"
import Slideshow from "./Slideshow"
import { act } from "react-dom/test-utils"
import { SLIDES } from "../App/App"

// export const SLIDES = [
//     {url: pic1, alt: 'Slide 1: 3 friends having fun'},
//     {url: pic2, alt: 'Slide 2: 2 friends smiling at the camera'},
//     {url: pic3, alt: 'Slide 3: 4 friends having fun at a party'},
//     {url: pic4, alt: 'Slide 4: 5 friends smiling while camping at night'},
//     {url: pic5, alt: 'Slide 5: 4 girls smiling while sitting down together'}
//   ]

describe("slideshow", () => {
    beforeEach(() => {
        render(<Router />)
    })

    function checkNotHidden(idx) {

        const allSlides = 
        [
            screen.getByAltText(SLIDES[0].alt),
            screen.getByAltText(SLIDES[1].alt),
            screen.getByAltText(SLIDES[2].alt),
            screen.getByAltText(SLIDES[3].alt),
            screen.getByAltText(SLIDES[4].alt)
        ]
        
        allSlides.forEach((image, index) => {
            if (index === idx) {
            expect(image).toHaveAttribute('aria-hidden', 'false')
            } else {
            expect(image).toHaveAttribute('aria-hidden', 'true')
            }
        })
    }

    it("renders first image", () => {
        const firstImage = screen.getByAltText(SLIDES[0].alt)
        const secondImage = screen.getByAltText(SLIDES[1].alt)
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

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

describe("automatic scroll", () => {
    it("custom timer", async () => {
      const timer = 20;

      function checkNotHidden(idx) {
        const allSlides = [
          screen.getByAltText(SLIDES[0].alt),
          screen.getByAltText(SLIDES[1].alt),
          screen.getByAltText(SLIDES[2].alt),
          screen.getByAltText(SLIDES[3].alt),
          screen.getByAltText(SLIDES[4].alt),
        ];
        allSlides.forEach((image, index) => {
          if (index === idx) {
            expect(image).toHaveAttribute("aria-hidden", "false")
          } else {
            expect(image).toHaveAttribute("aria-hidden", "true")
          }
        });
      }
  
      await act(async () => {
        render(<Slideshow timer={timer} slides={SLIDES} />)
      })

        await act(() => sleep(timer))
        checkNotHidden(1);
        await act(() => sleep(timer))
        checkNotHidden(2);
        await act(() => sleep(timer))
        checkNotHidden(3);
        await act(() => sleep(timer))
        checkNotHidden(4);
        await act(() => sleep(timer))
        checkNotHidden(0);
    });
})
  
  
  
  
  