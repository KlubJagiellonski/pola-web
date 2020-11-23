import React from 'react';
import {render, screen} from '@testing-library/react';
import SearchModal from "./SearchModal";
import {prepareGetCodeMock} from './../../mocks/handlers'

test('should handle plScore', async () => {
    const {} = render(<SearchModal data={{
        name: "TEST-PRODUCT",
        plScore: 20,
        plCapital: 0,
        plWorkers: 0,
        plRnD: 0,
        plRegistered: 0,
        plNotGlobEnt: 0,
        is_friend: false,
        description: 'TEST-DESCRIPTION'
    }}/>);

    expect(screen.getByText('20 pkt')).toBeInTheDocument();
});