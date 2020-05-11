import { createSelector } from "reselect";

// calling educer postInitialState, so it will have access to initialState properties
const postSelector = (state: any) => state.post;
const userSelector = (state: any) => state.user;
const postSelectorId = (state: any) => state.post;

export const userStore = () => createSelector(userSelector, (state) => state);

export const getPosts = () =>
    // this gets all posts
    createSelector(postSelector, (state) => state.posts);

export const getUserPosts = (params) => {
    return createSelector(postSelector, (state) => {
        return state.posts.filter((post) => {
            return post.Likes.find((like) => like.userId == params.userId);
        });
    });
};

export const getNotification = () => createSelector(postSelector, (state) => state.notification);

export const getIsNotified = () => createSelector(postSelector, (state) => state.isNotified);
export const userConfirmation = () => createSelector(userSelector, (state) => state.message);
export const getGoogleAccount = () => createSelector(userSelector, (state) => state.googleAccount);
export const userError = () => createSelector(userSelector, (state) => state.error);

// will sort through original posts array by highest likeCount in DESC order, showing only 2
export const getPopPosts = () =>
    createSelector(postSelector, (state) =>
        state.posts
            .filter((item) => item.likeCounts > 1)
            .sort((a, b) => b.likeCounts - a.likeCounts)
            .slice(0, 2),
    );
export const getUser = () => createSelector(userSelector, (state) => state.currentUser);
export const getTitleError = () => createSelector(postSelector, (state) => state.titleError);
export const getBodyError = () => createSelector(postSelector, (state) => state.bodyError);
export const title = () => createSelector(postSelector, (state) => state.title);
export const postContent = () => createSelector(postSelector, (state) => state.postContent);

export const getNotifications = () => createSelector(userSelector, (state) => state.getNotifications);
