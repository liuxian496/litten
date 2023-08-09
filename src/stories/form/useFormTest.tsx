import React from 'react';

import { FormStory } from './form.stories';

import { useForm } from '../../components/form/useForm';

const TestUseForm = () => {
    type Name = {
        name: string
    };

    const spiritForm = useForm<Name>();

    spiritForm.getValues();
    spiritForm.clear();
    spiritForm.getValueByPath('name');
    spiritForm.setValues({ name: 'Jerry' });
    spiritForm.setValueByPath('name', 'Jerry');

    return (
        <>Test TestUseForm</>
    )
}

export const UseFormTest: FormStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestUseForm />,
};