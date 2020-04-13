/*
import React from 'react'
import { Container, Card, Button } from 'react-bootstrap';

const Content = () => {
    return (
        <section>
            <Container className="main-content">
                <Card>
                    <Card.Body className="card-iframe">
                        <iframe width="420" height="345" src="https://www.youtube.com/embed/BRMK77NUsyU" />
                    </Card.Body>
                </Card>
                <div>
                    <Button>Left</Button>
                    <Button>Right</Button>
                </div>
            </Container>
        </section>
    )
}
*/

import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { Container, Card, Button } from 'react-bootstrap';

function Content() {
    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        set({ x: down ? mx : 0, y: down ? my : 0 })
    })

    // Bind it to a component
    return (
        <section>
            <Container className="main-content">
                <animated.div {...bind()} style={{ x, y }} />
            </Container>
        </section>
    )


}

export default Content;