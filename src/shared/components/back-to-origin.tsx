import { Button } from 'primereact/button';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../redux/actions/selected.action';
import { Selected } from '../types/selected.type';

const BackToOrigin = ({origin}: {origin: Selected}) => {
    const dispatch = useDispatch();
    const takeMeHome = () => {
        console.log(origin)
        dispatch(setSelected(origin))
    }

    return (
        <div id='full-card__back-to-origin'>
            <Button
                className='p-button-raised p-button-rounded'
                label='Back to previous'
                onClick={takeMeHome}
                iconPos='left'
                icon="pi pi-undo"></Button>
        </div>
    )
};

export default BackToOrigin;