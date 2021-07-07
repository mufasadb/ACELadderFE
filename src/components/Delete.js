import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const baseURL = "http://localhost:3000"

const deleteURL = baseURL + "/api/v1/npc/"


const DeleteCharacter = (props) => {
    const doDelete = () => {
        // if (props.type == "item") { 
            // deleteURL = baseURL + "/api/v1/item/"
        // }
        const myInit = {
            method: 'DELETE',
            headers: {

            },
            body: ''
        }
        try {
            fetch(deleteURL+props.character.id, myInit).then((res) => {
                const data = res.json()
                props.doUpdate()
                console.log(data)
            })
        } catch (err) { console.log(err) }
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        doDelete();
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>Delete</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{`Really Delete ${props.character.name}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you would like to delete {props.character.name} from {props.character.location}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
          </Button>
                    <Button onClick={handleDelete}>
                        Delete This NPC
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeleteCharacter;