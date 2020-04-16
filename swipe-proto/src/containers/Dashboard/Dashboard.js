import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.css';

import { db } from './../../config/Firebase'

import * as tbl from './../constants'

import CATEGORY_LIST from './CategoryList';
import COMMENT_LIST from './CommentList';
import SWIPE_LIST from './SwipeList';

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
            resource_list: [],
            like_list: []
        };
    }

    componentDidMount = () => {
        this.funcFetchCategories();
    }

    funcFetchCategories = () => {
        db.collection(tbl.CATEGORIES)
            .orderBy("name")
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
                    });
            });
    }

    funcOnGenerateItems = () => {
        let resRef = db.collection(tbl.RESOURCES);

        if (Array.isArray(this.state.select_cat)
            && this.state.select_cat.length) {
            let selection = [];
            this.state.select_cat.forEach(function (category) {
                selection.push(category.id);
            })
            this.funcFetchResources(resRef.where('categoryid', 'in', selection));
        } else {
            this.funcFetchResources(resRef);
        }
    }

    funcFetchResources = (resRef) => {
        let hisRef = db.collection(tbl.HISTORY);

        resRef
            .orderBy("updated_at")
            .get()
            .then((res_querySnapshot) => {
                let resources = [];

                if (res_querySnapshot.empty === false) {
                    hisRef
                        .get()
                        .then((his_querySnapshot) => {
                            res_querySnapshot.forEach(function (res_doc) {
                                let resource = res_doc.data();
                                resource.id = res_doc.id;

                                if (his_querySnapshot.empty === false) {
                                    let found = false;
                                    his_querySnapshot.forEach(function (his_doc) {
                                        if (resource.id === his_doc.data().resourceid) found = true;
                                    })
                                    if (!found) resources.push(resource);
                                } else resources.push(resource);
                            })

                            this.setState({
                                resource_list: resources,
                                top_res: resources[resources.length - 1]["id"]
                            }, () => this.funcFetchComment());
                        });
                } else {
                    this.setState({
                        resource_list: resources,
                        top_res: null
                    }, () => this.funcFetchComment());
                }
            });
    }

    funcFetchComment = () => {
        if (this.state.top_res) {
            let comRef = db.collection(tbl.COMMENTS);
            let userRef = db.collection(tbl.USERS);
            comRef
                .where("resourceid", "==", this.state.top_res)
                .orderBy("updated_at")
                .onSnapshot((com_querySnapshot) => {
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
                            });
                            comments.sort((a, b) => b.updated_at - a.updated_at)
                            this.setState({ comment_list: comments })
                        })
                })
        } else {
            this.setState({ comment_list: [] });
        }
    }

    funcFetchLike = () => {
        let resRef = db.collection(tbl.RESOURCES);
        let catRef = db.collection(tbl.CATEGORIES);

        db.collection(tbl.HISTORY)
            .where("userid", "==", this.state.user.id)
            .orderBy("updated_at", "desc")
            .onSnapshot((his_querySnapshot) => {
                if (his_querySnapshot.empty === false) {
                    resRef
                        .get()
                        .then((res_querySnapshot) => {
                            catRef
                                .get()
                                .then((cat_querySnapshot) => {
                                    let likes = [];
                                    his_querySnapshot.forEach(function (his_doc) {
                                        let like = his_doc.data();
                                        like.id = his_doc.id;
                                        res_querySnapshot.forEach(function (res_doc) {
                                            if (res_doc.id === like.resourceid) {
                                                let resource = res_doc.data();
                                                like.title = resource.title;
                                                like.subtitle = resource.subtitle
                                                like.categoryid = resource.categoryid;
                                                cat_querySnapshot.forEach(function (cat_doc) {
                                                    if (cat_doc.id === like.categoryid) {
                                                        let category = cat_doc.data();
                                                        like.category = category.name;
                                                        likes.push(like);
                                                    }
                                                })
                                            }
                                        })
                                    })
                                    this.setState({ like_list: likes })
                                })
                        })
                }
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
        });
    }

    funcOnClickProfile = () => {
        this.setState({
            hideProfile: !this.state.hideProfile
        }, () => this.funcFetchLike());
    }

    funcOnChangeTab = (e) => {
        this.setState({
            activeTab: e
        });
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
            });
    }

    render() {
        return (
            <section className="main-container">
                <Row>
                    <Col className="col-3 m-0 category">
                        <CATEGORY_LIST
                            {...this.state}
                            funcOnSelectCategory={this.funcOnSelectCategory.bind(this)}
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