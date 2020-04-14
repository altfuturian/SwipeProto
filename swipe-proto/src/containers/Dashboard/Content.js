import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const to = i => ({ x: 0, y: 0, scale: 0 })
const from = i => ({ x: 0, y: 0, rot: 0 })
const trans = (r, s) => ``

const CONTENT = ({ resources }) => {
    const [gone] = useState(() => new Set()) 
    const [props, set] = useSprings(resources.length, i => ({ ...to(i), from: from(i) }))
    
    const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 
        const dir = xDir < 0 ? -1 : 1 
        if (!down && trigger) {
            gone.add(index)
        }
        set(i => {
            if (index !== i) return
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0
            return { x, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
    })

    return (
        <React.Fragment>
            <section className="header-content">
                <Container>
                    <h3> Categories </h3>
                </Container>
            </section>
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className="content-content" key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
                   
                    <animated.div
                        className="content-swipe"
                        {...bind(i)}
                        style={{ transform: interpolate([rot, scale], trans) }}
                    >
                        <Card className="card-swipe">
                            {resources[i]["type"] === "video" ?
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe
                                        title={resources[i]["title"]}
                                        className="embed-responsive-item"
                                        src={resources[i]["res_url"]}
                                    />
                                </div> : null
                            }
                            <Card.Title>{resources[i]["title"]}</Card.Title>
                        </Card>
                    </animated.div>
                </animated.div>
            ))}
        </React.Fragment>
    )
}

export default CONTENT;
