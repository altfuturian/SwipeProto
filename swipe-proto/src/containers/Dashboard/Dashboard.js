/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React, { Component } from 'react';
import './style.css';

import { auth, db } from './../../config/Firebase'

import * as tbl from './../constants'

import CATEGORY_LIST from './CategoryList';
import COMMENT_LIST from './CommentList';
import SWIPE_LIST from './SwipeList';
import PROFILE from './Profile';
import LIKE_MODAL from './LikeModal';
import SHARE_MODAL from './ShareModal';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.funcOnBack = props.funcOnBack.bind(this);
        this.state = {
            anonymous: 0,
            selection_counter: {
                status: false
            },
            active_tab: 'likes',
            load_category: 1,
            is_loading: 0,
            load_like: false,
            hide_profile: true,
            top_res: null,
            consist_like: false,
            consist_dislike: false,
            modal_show_like: false,
            modal_show_share: false,
            user_info: {},
            succ_like: {
                status: false,
                text: '',
                type: ''
            },
            select_cat: [],
            category_list: [],
            comment_list: [],
            resource_list: [],
            like_list: [],
            modal_details: {}
        };
    }

    componentDidMount = () => {
        if (this.props.anonymous === 1) {
            this.setState({
                anonymous: 1
            }, () => this.funcFetchCategories())
        } else {
            const USER = {
                username: this.props.user.email,
                id: this.props.user.uid
            }
            this.setState({
                user_info: USER
            }, () => this.funcFetchCategories())
        }
    }

    funcLogout = () => {
        auth.signOut();
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
                    categories.push(category);
                });
                this.setState({
                    category_list: categories,
                    load_category: 0
                });
            });
    }

    funcOnGenerateItems = () => {
        if (Array.isArray(this.state.select_cat)
            && this.state.select_cat.length > 0) {
            let resRef = db.collection(tbl.RESOURCES);
            let selected = [];
            this.state.select_cat.forEach(function (category) {
                selected.push(category.id);
            })
            this.setState({ is_loading: 0 },
                () => this.funcFetchResources(resRef.where('categoryid', 'in', selected))
            );
        } else {
            this.setState({
                resource_list: [],
                comment_list: [],
                is_loading: 0
            })
        }
    }

    funcFetchResources = (resRef) => {
        let hisRef = db.collection(tbl.HISTORY);
        let anonymous = this.state.anonymous;
        let userid = this.state.user_info.userid;
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

                                if (his_querySnapshot.empty === false && anonymous === 0) {
                                    let found = false;
                                    his_querySnapshot.forEach(function (his_doc) {
                                        if (resource.id === his_doc.data().resourceid
                                            && his_doc.data().userid === userid) found = true;
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
                        comment_list: [],
                        top_res: null,
                        is_loading: 0
                    });
                }
            });
    }

    funcFetchComment = () => {
        let alert = {}
        alert.status = false;
        alert.text = '';
        alert.type = '';
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
                                    if (usr_doc.data().userid === comment.userid) {
                                        let user = usr_doc.data();
                                        comment.username = user.username;
                                    }
                                })
                                comments.push(comment);
                            });
                            this.setState({ comment_list: comments, is_loading: 0 });
                        })
                })
        } else this.setState({ comment_list: [], is_loading: 0 });
    }

    funcFetchLike = () => {
        let resRef = db.collection(tbl.RESOURCES);
        let catRef = db.collection(tbl.CATEGORIES);
        let consist_like = false;
        let consist_dislike = false;

        db.collection(tbl.HISTORY)
            .where("userid", "==", this.state.user_info.id)
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

                                        switch (like.status) {
                                            case 'like': {
                                                consist_like = true;
                                                break;
                                            }
                                            case 'dislike': {
                                                consist_dislike = true;
                                                break;
                                            }
                                            default: break;
                                        }

                                        res_querySnapshot.forEach(function (res_doc) {
                                            if (res_doc.id === like.resourceid) {
                                                let resource = res_doc.data();
                                                like.resid = res_doc.id;
                                                like.res_url = resource.res_url;
                                                like.title = resource.title;
                                                like.type = resource.type;
                                                like.subtitle = resource.subtitle
                                                like.description = resource.description;
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
                                    this.setState({
                                        like_list: likes,
                                        load_like: false,
                                        consist_dislike: consist_dislike,
                                        consist_like: consist_like
                                    })
                                })
                        })
                } else this.setState({
                    like_list: [],
                    load_like: false,
                    consist_dislike: consist_dislike,
                    consist_like: consist_like
                })
            })
    }

    funcOnSelectCategory = (category) => {
        const select_cat = this.state.select_cat;

        if (select_cat.includes(category)) {
            const newSelection = select_cat
                .filter(select_cat => select_cat.id !== category.id);

            let selectionStatus = [];
            selectionStatus.status = true;
            selectionStatus.type = "success";

            if (newSelection.length > 1)
                selectionStatus.text = newSelection.length + " categories selected"
            else selectionStatus.text = newSelection.length + " category selected"

            this.setState({
                select_cat: newSelection,
                selection_counter: selectionStatus
            })
        } else {
            let selectionStatus = [];
            if (select_cat.length + 1 > 10) {
                selectionStatus.status = true;
                selectionStatus.type = "danger";
                selectionStatus.text = "Maximum number of categories selected"
                this.setState({ selection_counter: selectionStatus })
            } else {
                selectionStatus.status = true;
                selectionStatus.type = "success";

                if (select_cat.length + 1 > 1)
                    selectionStatus.text = select_cat.length + 1 + " categories selected"
                else selectionStatus.text = select_cat.length + 1 + " category selected"
                this.setState({
                    select_cat: [...select_cat, category],
                    selection_counter: selectionStatus
                });
            }
        }
    }

    funcOnSubmitComment = (comment) => {
        db.collection(tbl.COMMENTS).add({
            userid: this.state.user_info.id,
            comment: comment,
            resourceid: this.state.top_res,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    funcOnClickProfile = () => {
        this.setState({
            hide_profile: !this.state.hide_profile,
            like_list: [],
            load_like: true
        }, () => this.funcFetchLike());
    }

    funcOnChangeTab = (e) => {
        this.setState({
            active_tab: e
        });
    }

    funcOnSwipe = (index, dir) => {
        let status = 'like';
        let alert = {};
        let top_res;
        let resourceid = this.state.top_res;

        if (dir === -1) status = 'dislike';

        alert.status = true;

        if (dir === -1) {
            alert.text = "Disliked!";
            alert.type = "dislike";
        } else {
            alert.text = "Liked!";
            alert.type = "like";
        }
        if ((index - 1) < 0) top_res = null;
        else top_res = this.state.resource_list[index - 1].id;

        this.setState({
            top_res: top_res,
            succ_like: alert,
            is_loading: 0
        }, () => {
            if (this.state.anonymous === 0) {
                db.collection(tbl.HISTORY).add({
                    userid: this.state.user_info.id,
                    resourceid: resourceid,
                    status: status,
                    created_at: new Date(),
                    updated_at: new Date()
                }).then(() => this.funcFetchComment());
            } else this.funcFetchComment();
        });
    }

    funcOnLikeToast = () => {
        let alert = {};
        alert.status = false;
        alert.text = '';
        alert.type = '';
        this.setState({ succ_like: alert });
    }

    funcOnCategoryCounter = () => {
        let selectionStatus = [];
        selectionStatus.status = false;
        this.setState({ selection_counter: selectionStatus });
    }

    funcModalShowLike = (modal_details, value) => {
        this.setState({
            modal_details: modal_details,
            modal_show_like: value
        });
    }

    funcModalShowShare = (modal_details, value) => {
        this.setState({
            modal_details: modal_details,
            modal_show_share: value
        });
    } 

    render() {
        return (
            <React.Fragment>
                <section className="main-container">
                    <div className="category">
                        <CATEGORY_LIST
                            {...this.state}
                            funcOnCategoryCounter={this.funcOnCategoryCounter.bind(this)}
                            funcOnSelectCategory={this.funcOnSelectCategory.bind(this)}
                            funcOnGenerateItems={this.funcOnGenerateItems.bind(this)}
                        />
                    </div>
                    <div className="content">
                        <SWIPE_LIST
                            {...this.state}
                            funcOnSwipe={this.funcOnSwipe.bind(this)}
                            funcOnLikeToast={this.funcOnLikeToast.bind(this)}
                        />
                    </div>
                    <div className="comment">
                        {!this.state.hide_profile
                            ? <PROFILE
                                {...this.state}
                                funcLogout={this.funcLogout.bind(this)}
                                funcModalShowLike={this.funcModalShowLike.bind(this)}
                                funcModalShowShare={this.funcModalShowShare.bind(this)}
                                funcOnClickProfile={this.funcOnClickProfile.bind(this)}
                                funcOnChangeTab={this.funcOnChangeTab.bind(this)}
                            /> : <COMMENT_LIST
                                {...this.state}
                                {...this.props}
                                funcOnBack={this.funcOnBack.bind(this)}
                                funcOnSubmitComment={this.funcOnSubmitComment}
                                funcOnClickProfile={this.funcOnClickProfile.bind(this)}
                            />
                        }
                    </div>
                </section>
                <LIKE_MODAL
                    {...this.state}
                    show={this.state.modal_show_like}
                    onHide={() => this.funcModalShowLike(false)}
                />
                <SHARE_MODAL
                    {...this.state}
                    show={this.state.modal_show_share}
                    onHide={() => this.funcModalShowShare(false)}
                />
            </React.Fragment>
        )
    }
}

export default (Dashboard);