import { expect, test, vi} from "vitest";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import Header from "../components/Header";

// describe("Header component", () => {
    // test("renders hading and create event button", () => {
    //     const dummyOpenCreateEvent = vi.fn();
    //     render(<Header handleOpenCreateEvent={dummyOpenCreateEvent}/>)  

    //     expect(screen.getByText(/event portal/i))
    // })

    /* I tried to test weather the Header component is rendered or not but I was stuck in a bug. 

     * Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>
    
     */

    test("Create event button works properly", async() => {
        const dummyOpenCreateEvent = vi.fn();
        render(<Header handleOpenCreateEvent={dummyOpenCreateEvent} />);
    
        const button = screen.getByRole('button', { name: /create event/i });
        await userEvent.click(button);
    
        // Check if the mock function was called
        expect(dummyOpenCreateEvent).toHaveBeenCalledTimes(1);
    })
// })