import React from 'react';
import {render} from '@testing-library/react';
import Search from './Search';

import { withRouter } from '../../withRouter';
import {fireEvent, waitForElement, screen} from '@testing-library/react'

const SearchWithRouter = withRouter(<Search/>)

test('renders search button', () => {
    const {getByLabelText} = render(<Search/>);
    const button = getByLabelText(/wyszukaj/i);
    expect(button).toBeInTheDocument();
});

test('should handle polish products', async () => {
    const {getByText, getByLabelText} = render(<SearchWithRouter/>);

    fireEvent.input(getByLabelText(/Kod EAN/i), {
        target: {value: '590123123'}
    })

    fireEvent.click(getByLabelText(/wyszukaj/i))
    await waitForElement(() => screen.getByLabelText('TEST-PRODUCT'))

    expect(screen.getByTestId('pl-workers')).toHaveAttribute('disabled', "")
});

test('should handle book', async () => {
    const {getByText, getByLabelText} = render(<Search/>);

    fireEvent.input(getByLabelText(/Kod EAN/i), {
        target: {value: '977123123'}
    })

    fireEvent.click(getByText(/sprawdź/i))
    await waitForElement(() => screen.getByText('Kod ISBN/ISSN/ISMN'))
});
