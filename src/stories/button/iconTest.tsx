import React from 'react';

import { ButtonStory } from "./button.stories";

import { Mode } from '../../global/enum';
import { Button } from '../../components/button/button';

const DeleteIcon = () => {
    return (
        <svg className='litten-svg' width="16px" height="16px" viewBox="0 0 1024 1024">
            <path
                d="M292.571429 1024a146.285714 146.285714 0 0 1-146.285715-146.285714V219.428571H54.857143a54.857143 54.857143 0 0 1 0-109.714285H438.857143V73.142857a73.142857 73.142857 0 1 1 146.285714 0v36.571429h384a54.857143 54.857143 0 1 1 0 109.714285H877.714286v658.285715a146.285714 146.285714 0 0 1-146.285715 146.285714H292.571429z m-36.571429-150.381714c0 19.968 12.946286 36.571429 29.988571 40.009143L292.571429 914.285714h160.914285V219.428571H256v654.189715zM768 219.428571H570.514286v694.857143H731.428571c17.92 0 32.914286-14.409143 35.986286-33.353143l0.585143-7.314285V219.428571z"
            />
        </svg>
    )
}

const BroadcastIcon = () => {
    return (
        <svg className='litten-svg' width="16px" height="16px" viewBox="0 0 1024 1024" version="1.1"
        >
            < path
                d="M361.472 97.8944l523.5712 327.2704a102.4 102.4 0 0 1 0 173.6704L361.472 926.1056A102.4 102.4 0 0 1 204.8 839.2704V184.7296a102.4 102.4 0 0 1 156.672-86.8352z"
            />
        </svg >
    )
}

export const IconTest: ButtonStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <Button mode={Mode.outlined} startIcon={<DeleteIcon />}>Delete</Button>
                <Button mode={Mode.outlined} disabled startIcon={<DeleteIcon />} style={{ marginLeft: "16px" }}>Delete</Button>
                <Button mode={Mode.primary} endIcon={<BroadcastIcon />} style={{ marginLeft: "16px" }}>Add</Button>
                <Button mode={Mode.primary} disabled endIcon={<BroadcastIcon />} style={{ marginLeft: "16px" }}>Add</Button>
            </>
        )
    }
}
