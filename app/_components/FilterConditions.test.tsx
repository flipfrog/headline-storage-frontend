import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FilterConditions from './FilterConditions'
import * as React from "react";

const mockCallback = jest.fn((event: React.ChangeEvent<HTMLInputElement>, index: number) => {});

describe('FilterConditions', () => {
    it('render initial state', () => {
        render(<FilterConditions  categories={['c1', 'c2']} checkedCategories={['c1']} onChangeCategoryCheckbox={mockCallback} />);
        expect(screen.getByText('c1')).toBeInTheDocument();
        expect(screen.getByText('c2')).toBeInTheDocument();
    })
})
