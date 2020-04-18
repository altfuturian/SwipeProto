/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React from 'react';
import { Row, Col, Card, Container, Button, Spinner, Toast } from 'react-bootstrap';

const LOAD_CONTENT = (props) => {
    let grid = [];

    if (props.list && props.load_category === 0) {
        for (let i = 0; i < props.list.length; i) {
            let columns = [];

            for (let y = 0; y < 3; y++) {
                let cardClass = 'card-category';

                if (i < props.list.length) {
                    for (let a = 0; a < props.select_cat.length; a++) {
                        if (props.select_cat[a]["id"] === props.list[i]["id"]) {
                            cardClass = cardClass.concat(' category-active');
                            break;
                        }
                    }
                    columns.push(
                        <Col className="col-4" key={props.list[i]["name"]}>
                            <Card
                                className={cardClass}
                                onClick={props.funcOnSelectCategory.bind(this, props.list[i])}
                            >
                                <Card.Body className="d-inline-block align-items-center text-truncate">
                                    {props.list[i]["name"]}
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
                i++;
            }
            grid.push(<Container key={i}><Row className="mb-3" key={i}>{columns}</Row></Container>)
        }
    }

    return grid;
}

const CATEGORY_LIST = (props) => {
    return (
        <React.Fragment>
            {props.load_category === 1 ?
                <div className="spinner-container">
                    <Spinner variant="primary" animation="border" />
                </div>
                : null
            }
            <section className="header-category text-center">
                <div>
                    <Container>
                        <h3> Categories </h3>
                    </Container>
                </div>
            </section>
            <section className="content-category overflow-auto">
                <Toast
                    onClose={() => props.funcOnCategoryCounter()}
                    show={props.selection_counter.status}
                    delay={1000} animation={false}
                    className={props.selection_counter.type === 'success' ? "success" : "danger"}
                    autohide>
                    <Toast.Body>{props.selection_counter.text}</Toast.Body>
                </Toast>
                <LOAD_CONTENT
                    list={props.category_list}
                    funcOnSelectCategory={props.funcOnSelectCategory}
                    select_cat={props.select_cat}
                    load_category={props.load_category}
                />
            </section>
            <section className="text-center footer-category d-flex">
                <div className="w-100 align-items-center d-flex justify-content-center pl-3 pr-3">
                    <Button
                        onClick={props.funcOnGenerateItems.bind(this)}
                        className=" btn-generate w-100"
                        disabled={props.load_category === 1 || props.is_loading === 1}>Generate Items</Button>
                </div>
            </section>
        </React.Fragment>
    )
}

export default CATEGORY_LIST;