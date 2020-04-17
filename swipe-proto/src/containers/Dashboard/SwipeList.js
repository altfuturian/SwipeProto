/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React, { useState } from 'react';
import { Image, Card, Toast, Spinner } from 'react-bootstrap';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const to = i => ({ x: 0, y: 0, scale: 0 });
const from = i => ({ x: 0, y: 0, rot: 0 });
const trans = (r, s) => ``

const LOAD_SWIPE = (props) => {
    const [gone] = useState(() => new Set());
    const [empty, setEmpty] = useState(false);
    const [prop, set] = useSprings(props.resource_list.length, i => ({ ...to(i), from: from(i) }))

    const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2;
        const dir = xDir < 0 ? -1 : 1;
        if (!down && trigger) {
            gone.add(index);
            props.funcOnSwipe(index, dir);
            console.log(gone.size, props.resource_list.length)
            if(gone.size === props.resource_list.length) setEmpty(true)
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
            {props.resource_list && prop.map(({ x, y, rot, scale }, i) => (
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
                            {props.resource_list[i]["type"] === "video" ?
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe
                                        title={props.resource_list[i]["title"]}
                                        className="embed-responsive-item"
                                        src={props.resource_list[i]["res_url"]}
                                    />
                                </div> : null
                            }
                            {props.resource_list[i]["type"] === "image" ?
                                <Card.Img className="img-responsive img-fluid" variant="top" src={props.resource_list[i]["res_url"]} /> : null
                            }
                            <Card.Body>
                                <Card.Title>{props.resource_list[i]["title"]}</Card.Title>
                                <Card.Subtitle className="text-secondary">{props.resource_list[i]["subtitle"]}</Card.Subtitle>
                                <Card.Text
                                    className={props.resource_list[i]["type"] === "article" ? "card-article" : ""}
                                >{props.resource_list[i]["description"]}</Card.Text>
                            </Card.Body>
                        </Card>
                    </animated.div>
                </animated.div>
            ))}
            {empty ? <div className="text-secondary empty-list"><h4>No resources available</h4></div> : null   }
        </React.Fragment>
    )
}

const SWIPE_LIST = (props) => {
    return (
        <React.Fragment>
            {props.isLoading || props.loadCategory ?
                <div className="spinner-container">
                    <Spinner variant="primary" animation="border" />
                </div>
                : null
            }
            <section className="header-swipe text-center">
                <Image src="https://cdn4.iconfinder.com/data/icons/logos-3/426/react_js-512.png" rounded />
                <h1> Swipe-Proto </h1>
            </section>
            <section className="content-swipe">
                <Toast onClose={() => props.funcOnLikeToast()}
                    show={props.succ_like.status}
                    delay={2000} animation={false}
                    className={props.succ_like.type === 'like' ? "toast-like" : "toast-dislike"}
                    autohide>
                    <Toast.Body
                    >{props.succ_like.text}</Toast.Body>
                </Toast>
                {props.resource_list.length > 0 ?
                    <LOAD_SWIPE {...props} />
                    : <React.Fragment>
                        {!props.isLoading && !props.loadCategory ?
                            <div className="text-secondary empty-list"><h4>No resources available</h4></div> : null
                        }
                    </React.Fragment>
                }
            </section>
        </React.Fragment>
    )
}

export default SWIPE_LIST;
