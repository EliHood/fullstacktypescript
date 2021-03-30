import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import GifIcon from "@material-ui/icons/Gif";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import React, { Fragment, useState } from "react";
import GifSection from "./GifSection";
import FormHelperText from "@material-ui/core/FormHelperText";
import OurTextField from "../../../common/OurTextField";
import storeHooks from "../../../common/storeHooks";
import { CommentPropsType} from '../../../utils/types'

export default function CommentForm({commentChange, comment_body, gifUrl, isGif, setCommentBody, onSubmit, setMentionedUser, currentUser}: CommentPropsType) {
    const [isGifSelected, setGifSelected] = useState<boolean>(false);
    const { mentionUsers, setSelectedOptionValue, selectedUser, mentionedUser } = storeHooks();
    const selectedOption = React.useCallback(
        (option) => {
            setSelectedOptionValue(option);
            setCommentBody?.(comment_body.concat(option));
            setMentionedUser?.(false);
        },
        [setSelectedOptionValue, setCommentBody, setMentionedUser, comment_body],
    );

    const options = mentionUsers
        .filter((item) => item !== currentUser?.username) // current user can't mention themselves
        .map((item, key) => (
            <option key={key} value={item}>
                {item}
            </option>
        ));

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                {isGifSelected === false ? (
                    <Fragment>
                        <OurTextField
                            type="gif-commentfield"
                            selectedUser={selectedUser}
                            comment_body={comment_body}
                            commentChange={commentChange}
                            setGifSelected={() => setGifSelected(true)}
                        />
                        {comment_body.length > 200 && (
                            <FormHelperText error={true} id="component-helper-text">
                                {"Comment must be less than 200 chars"}
                            </FormHelperText>
                        )}

                        {mentionedUser && (
                            <select onChange={(e) => selectedOption(e.target.value)} name="mentionedUsers">
                                <option value="">Select User</option>
                                {options}
                            </select>
                        )}

                        <br />
                        <br />

                        <Button disabled={comment_body.length > 6 && comment_body.length <= 200 ? false : true} type="submit" variant="outlined" color="primary">
                            Post A Comment
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <GifSection select={gifUrl} />
                        <Grid container={true} spacing={1} style={{ padding: "50px 0px" }}>
                            <Grid item={true} sm={1} lg={1}>
                                <TextFieldsIcon style={{ cursor: "pointer" }} onClick={() => setGifSelected(false)} />
                            </Grid>
                            <Grid item={true} sm={3} lg={3}>
                                <Button disabled={isGif !== "" ? false : true} size="small" type="submit" variant="outlined" color="primary">
                                    Post GIPHY
                                </Button>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </form>
        </Fragment>
    );
}
