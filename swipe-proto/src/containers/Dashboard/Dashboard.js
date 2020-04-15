import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.css';

import { db } from './../../config/Firebase'

import * as tbl from './../constants'

import CATEGORY_LIST from './CategoryList'
import COMMENT_LIST from './CommentList'
import SWIPE_LIST from './SwipeList'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideProfile: true,
            select_cat: [],
            activeTab: 'likes',
            top_res: null,
            user: {
                username: "test",
                id: "WWuRFTLUtbxyTdZnHh2P"
            },
            category_list: [],
            comment_list: [],
            likes: [
                { category_id: 1, title: "Kimetsu No Yaiba", subtitle: "Demon Slayer", category: "Anime", type: "like" },
                { category_id: 2, title: "Avengers", subtitle: "Endgame", category: "Movie", type: "dislike" }
            ],
            resource_list: []
        }
    }

    componentDidMount = () => {
        this.funcFetchCategories();
    }

    funcFetchCategories = () => {
        db.collection(tbl.CATEGORIES)
            .get()
            .then((querySnapshot) => {
                let categories = [];
                querySnapshot.forEach(function (doc) {
                    let category = doc.data();
                    category.id = doc.id;
                    categories.push(category)
                });
                this.setState({ category_list: categories },
                    () => {
                        this.funcOnGenerateItems();
                    })
            })
    }

    funcOnGenerateItems = () => {
        let resRef = db.collection(tbl.RESOURCES);

        if (Array.isArray(this.state.select_cat)
            && this.state.select_cat.length) {
            let selection = [];
            this.state.select_cat.forEach(function (category) {
                selection.push(category.id);
            })
            this.funcFetchResources(resRef.where('categoryid', 'in', selection))
        } else {
            this.funcFetchResources(resRef)
        }
    }

    funcFetchResources = (resRef) => {
        let hisRef = db.collection(tbl.HISTORY);

        resRef
            .get()
            .then((res_querySnapshot) => {
                let resources = [];

                hisRef
                    .get()
                    .then((his_querySnapshot) => {
                        console.log("HIS: ", his_querySnapshot)
                        res_querySnapshot.forEach(function (res_doc) {
                            let resource = res_doc.data();
                            resource.id = res_doc.id;

                            if(his_querySnapshot.empty === false) {
                                let found = false;
                                his_querySnapshot.forEach(function (his_doc) {
                                    if (resource.id === his_doc.data().resourceid) found = true
                                })
                                console.log("HAIR")
                                if (!found) resources.push(resource);
                            } else resources.push(resource)
                        })

                        this.setState({
                            resource_list: resources,
                            top_res: resources[resources.length - 1]["id"]
                        }, () => this.funcFetchComment())
                    })

            })
    }

    funcFetchComment = () => {
        let comRef = db.collection(tbl.COMMENTS)
            .where("resourceid", "==", this.state.top_res);
        let userRef = db.collection(tbl.USERS)

        console.log("COMMENTED")
        comRef
            .get()
            .then((com_querySnapshot) => {
                userRef
                    .get()
                    .then((usr_querySnapshot) => {
                        let comments = [];
                        com_querySnapshot.forEach(function (com_doc) {
                            let comment = com_doc.data();
                            comment.datetime = JSON.stringify(comment.updated_at.toDate());
                            usr_querySnapshot.forEach(function (usr_doc) {
                                if (usr_doc.id === comment.userid) {
                                    let user = usr_doc.data();
                                    comment.username = user.username;
                                }
                            })
                            comments.push(comment);
                            console.log("COMMENTED")
                        });
                        this.setState({ comment_list: comments })
                    })
            })
    }

    funcOnSelectCategory = (category) => {
        const select_cat = this.state.select_cat;

        if (select_cat.includes(category)) {
            const newSelection = select_cat
                .filter(select_cat => select_cat.id !== category.id);

            this.setState({
                select_cat: newSelection
            })
        } else {
            this.setState({
                select_cat: [...this.state.select_cat, category]
            });
        }

    }

    funcOnSubmitComment = (comment) => {
        db.collection(tbl.COMMENTS).add({
            userid: this.state.user.id,
            comment: comment,
            resourceid: this.state.top_res,
            created_at: new Date(),
            updated_at: new Date()
        })
            .then(() => {
                this.funcFetchComment();
            })
    }

    funcOnClickProfile = () => {
        this.setState({
            hideProfile: !this.state.hideProfile
        });
    }

    funcOnChangeTab = (e) => {
        this.setState({
            activeTab: e
        })
    }

    funcActiveResource = (resource) => {
        this.setState({
            activeResource: resource.id
        })
    }

    funcOnSwipe = (index, dir) => {
        let status = 'like';

        if (dir === -1) status = 'dislike';

        db.collection(tbl.HISTORY).add({
            userid: this.state.user.id,
            resourceid: this.state.top_res,
            status: status,
            created_at: new Date(),
            updated_at: new Date()
        })
            .then(() => {
                this.setState({
                    top_res: this.state.resource_list[index - 1].id,
                }, () => this.funcFetchComment())
            })

    }

    render() {
        console.log("RENDER", this.state)
        return (
            <section className="main-container">
                <Row>
                    <Col className="col-3 m-0 category">
                        <CATEGORY_LIST
                            category_list={this.state.category_list}
                            funcOnSelectCategory={this.funcOnSelectCategory.bind(this)}
                            selectedCategories={this.state.select_cat}
                            funcOnGenerateItems={this.funcOnGenerateItems.bind(this)}
                        />
                    </Col>
                    <Col className="content">
                        <SWIPE_LIST
                            resources={this.state.resource_list}
                            funcOnSwipe={this.funcOnSwipe.bind(this)}
                        />
                    </Col>
                    <Col className="col-3 comment">
                        <COMMENT_LIST
                            {...this.state}
                            funcOnSubmitComment={this.funcOnSubmitComment}
                            funcOnClickProfile={this.funcOnClickProfile.bind(this)}
                            funcOnChangeTab={this.funcOnChangeTab.bind(this)}
                        />
                    </Col>
                </Row>
            </section>
        )
    }
}

export default (Dashboard);