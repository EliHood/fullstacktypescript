import { connect } from "react-redux";
import {
  createPostInit,
  dislikePostInit,
  getPostsInit,
  likePostInit,
} from "../actions/postActions";
import Dashboard from "../components/dashboard/dashboard";
import {getPosts, getPopPosts} from './../selectors/selectors';
import {createStructuredSelector} from 'reselect';
const mapDispatchToProps = (dispatch: any) => ({
  getPostsInit: () => dispatch(getPostsInit()),
  likePost: (id: number) => dispatch(likePostInit(id)),
  dislikePost: (id: number) => dispatch(dislikePostInit(id)),
  createPostInit: (postData: object) => dispatch(createPostInit(postData)),
});

const mapStateToProps = createStructuredSelector({
  posts: getPosts(),
  popPosts: getPopPosts()
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
