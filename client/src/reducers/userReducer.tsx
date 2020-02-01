import produce from "immer";
import * as types from "../actionTypes/userActionTypes";
import { sessionData, validation } from "../utils";

export interface userState {
    isAuthenticated: boolean;
    error?: string;
    isLoading: boolean;
    profileData: object;
    message: string;
    profilePage: any;
    usernameError: any;
    passwordError: any;
    emailError: any;
    email: string;
    password: string;
    username: string;
    currentUser: object;
    getNotifications: any;
}

const initialState: userState = {
    isAuthenticated: false,
    error: "",
    currentUser: {},
    profileData: {},
    profilePage: null,
    isLoading: true,
    message: "",
    usernameError: "",
    passwordError: "",
    emailError: "",
    email: "",
    password: "",
    getNotifications: [],
    username: "",
};

const authReducer = (state = initialState, action: any): userState =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SIGN_UP_SUCCESS:
                console.log(action.user.meta.message);
                // draft.isAuthenticated = sessionData.getLoginStatus();
                draft.email = "";
                draft.password = "";
                draft.username = "";
                draft.error = "";
                draft.message = action.user.meta.message;
                break;
            case types.SIGN_UP_FAILURE:
                console.log(action);
                draft.error = action.error;
                break;
            case types.GET_USER_SUCCESS:
                draft.isAuthenticated = sessionData.getLoginStatus();
                draft.currentUser = action.payload;
                break;
            case types.LOG_OUT_SUCCESS:
                draft.isAuthenticated = false;
                break;
            case types.LOG_IN_SUCCESS:
                draft.error = "";
                draft.isAuthenticated = sessionData.getLoginStatus();
                draft.isLoading = false;
                break;
            case types.INIT_LOGIN:
                draft.error = "";
                break;
            case types.LOG_IN_FAILURE:
                console.log(action.error);
                draft.error = action.error;
                break;
            case types.GET_USER_PROFILE_SUCCESS:
                draft.message = "";
                draft.profileData = action.payload;
                break;
            case types.GET_USER_PROFILE_FAILURE:
                draft.error = action.error;
                break;
            case types.UPDATE_USER_PROFILE_SUCCESS:
                draft.profileData = action.payload.user;
                draft.message = action.payload.message;
                break;
            case types.UPDATE_USER_PROFILE_FAILURE:
                console.log(action.error);
                draft.error = action.error;
                break;
            case types.ADD_EMAIL:
                console.log(validation.validateEmail(action.data));
                draft.email = action.data;
                draft.emailError = validation.validateEmail(action.data);
                break;
            case types.ADD_PASSWORD:
                draft.password = action.data;
                draft.passwordError = validation.validatePassword(action.data);
                break;
            case types.ADD_USERNAME:
                draft.username = action.data;
                draft.usernameError = validation.validateUsername(action.data);
                break;
            case types.EMAIL_CONFIRMATION_FAILURE:
                console.log(action);
                draft.error = action.error;
                break;
            case types.EMAIL_CONFIRMATION_SUCCESS:
                console.log(action);
                draft.message = action.payload.message;
                break;
            case types.RESEND_EMAIL_CONFIRMATION_SUCCESS:
                console.log(action.payload);
                draft.message = action.payload.meta.message;
                break;
            case types.RESEND_EMAIL_CONFIRMATION_FAILURE:
                draft.error = action.error;
                break;
            case types.GET_PROFILE_SUCCESS:
                console.log(action);
                draft.profilePage = action.data;
                break;
            case types.GET_PROFILE_FAILURE:
                console.log(action);
                draft.error = action.error;
                break;
            case types.FOLLOW_USER_SUCCESS:
                console.log(action.payload);
                console.log(action);
                const findKey = action.payload.follow.UserFollowers.findIndex((item) => item.followerId === action.id);
                console.log(findKey);
                draft.profilePage.UserFollowers = [...draft.profilePage.UserFollowers, action.payload.follow.UserFollowers[findKey]];
                draft.profilePage.isFollowing = true;
                break;
            case types.FOLLOW_USER_FAILURE:
                console.log(action);
                draft.error = action.error;
                break;
            case types.UNFOLLOW_USER_SUCCESS:
                console.log(action);
                console.log(action.payload.follow.UserFollowers);
                draft.profilePage.UserFollowers = [...draft.profilePage.UserFollowers.filter((item) => item.followerId !== action.id)];
                draft.profilePage.isFollowing = false;
                break;
            case types.UNFOLLOW_USER_FAILURE:
                console.log(action);
                draft.error = action.error;
                break;
            case types.GET_NOTIFICATIONS_SUCCESS:
                draft.getNotifications = action.payload;
                break;
            case types.GET_NOTIFICATIONS_FAILURE:
                console.log(action);
                draft.error = action.error;
                break;
            case types.MARK_AS_READ_SUCCESS:
                const markKey = state.getNotifications.findIndex((notification) => notification.notificationId === action.id);
                draft.getNotifications[markKey].status = [...action.payload.notifications[markKey].status];
                break;
            case types.MARK_AS_READ_FAILURE:
                console.log(action);
                draft.error = action.error;
                break;
        }
    });

export default authReducer;
