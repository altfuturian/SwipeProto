import React from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';

const LOAD_CONTENT = (props) => {
    console.log("LOAD: ", props)
    let grid = [];

    if(props.list) {
        for (let i = 0; i < props.list.length; i) {
            let columns = [];
    
            for (let y = 0; y < 3; y++) {
                let cardClass = 'card-category';
    
                for (let a = 0; a < props.selectedCategories.length; a++) {
                    if (props.selectedCategories[a]["id"] === props.list[i]["id"]) {
                        cardClass = cardClass.concat(' category-active');
                        break;
                    }
                }
    
                if (i < props.list.length) {
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
            grid.push(<Container><Row className="mb-3">{columns}</Row></Container>)
        }
    }
    
    return grid;
}

const CATEGORY_LIST = (props) => {
    return (
        <React.Fragment>
            <section className="header-category text-center">
                <div>
                    <Container>
                        <h3> Categories </h3>
                    </Container>
                </div>
            </section>
            <section className="content-category overflow-auto">
                <LOAD_CONTENT
                    list={props.categories}
                    funcOnSelectCategory={props.funcOnSelectCategory}
                    selectedCategories={props.selectedCategories}
                />
            </section>
            <section className="text-center footer-category d-flex">
                <div className="w-100 align-items-center d-flex justify-content-center pl-3 pr-3">
                    <Button
                        onClick={props.funcOnGenerateItems.bind(this)}
                        className=" btn-generate w-100">Generate Items</Button>
                </div>
            </section>
        </React.Fragment>
    )
}

export default CATEGORY_LIST;