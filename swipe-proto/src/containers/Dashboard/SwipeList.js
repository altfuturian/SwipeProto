import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const to = i => ({ x: 0, y: 0, scale: 0 });
const from = i => ({ x: 0, y: 0, rot: 0 });
const trans = (r, s) => ``

const LOAD_SWIPE = (props) => {
    const [gone] = useState(() => new Set())
    const [prop, set] = useSprings(props.resources.length, i => ({ ...to(i), from: from(i) }))

    const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2;
        const dir = xDir < 0 ? -1 : 1;
        if (!down && trigger) {
            gone.add(index);
            props.funcOnSwipe(index, dir);
        }
        set(i => {
            if (index !== i) return;
            const isGone = gone.has(index);
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
            return { x, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
    })

    return (
        <React.Fragment>
            {props.resources && prop.map(({ x, y, rot, scale }, i) => (
                <animated.div
                    className="animated-parent"
                    key={i}
                    style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}
                >
                    <animated.div
                        className="animated-child"
                        {...bind(i)}
                        style={{ transform: interpolate([rot, scale], trans) }}
                    >
                        <Card className="shadow card-swipe">
                            {props.resources[i]["type"] === "video" ?
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe
                                        title={props.resources[i]["title"]}
                                        className="embed-responsive-item"
                                        src={props.resources[i]["res_url"]}
                                    />
                                </div> : null
                            }
                            {props.resources[i]["type"] === "image" ?
                                <Card.Img className="img-responsive img-fluid" variant="top" src={props.resources[i]["res_url"]} /> : null
                            }
                            <Card.Body>
                                <Card.Title>{props.resources[i]["title"]}</Card.Title>
                                <Card.Subtitle className="text-secondary">{props.resources[i]["subtitle"]}</Card.Subtitle>
                                <Card.Text
                                    className={props.resources[i]["type"] === "article" ? "card-article" : ""}
                                >{props.resources[i]["description"]}</Card.Text>
                            </Card.Body>
                        </Card>
                    </animated.div>
                </animated.div>
            ))}
        </React.Fragment>
    )
}

const SWIPE_LIST = (props) => {
    return (
        <React.Fragment>
            <section className="header-swipe text-center">
                <Container>
                    <h1> Swipe-Proto </h1>
                </Container>
            </section>
            <section className="content-swipe">
                {props.resources.length > 0 ?
                    <LOAD_SWIPE {...props} />
                    : <div className="text-secondary empty-list"><h4>No resources available</h4></div>
                }
            </section>
        </React.Fragment>
    )
}

export default SWIPE_LIST;
