'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FormControlLabel, Checkbox, Grid2} from "@mui/material";

import { Headline } from "@/app/page";
import TablePaginationActions from "@/app/_components/TablePaginationActions";
import {useState} from "react";

const HeadlineList = ({headlines, categories }: {
    headlines: Headline[],
    categories: string[],
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - headlines.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [ checkedCategories, setCheckedCategories ] = useState(categories);
    const [ filteredHeadlines, setFilteredHeadlines ] = useState(headlines);

    const onChangeCategoryCheckbox = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const subjectCategory = categories[index];
        const checked = event.target.checked;
        const newCheckedCategories = checked ? checkedCategories.concat(subjectCategory) : checkedCategories.filter(category => category !== subjectCategory);
        const newFilteredHeadlines = headlines.filter(headline => newCheckedCategories.includes(headline.category));
        setCheckedCategories(newCheckedCategories);
        setFilteredHeadlines(newFilteredHeadlines);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={2}>
                    {
                        categories.map((category, index) => (
                            <Grid2 key={index} size={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox defaultChecked onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeCategoryCheckbox(event, index)}/>
                                    }
                                    label={category}/>
                            </Grid2>)
                        )
                    }
                </Grid2>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>forward ref IDs</TableCell>
                                <TableCell>backward ref IDs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? filteredHeadlines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredHeadlines
                            ).map((headline : Headline) => (
                                <TableRow key={headline.id}>
                                    <TableCell>{headline.id}</TableCell>
                                    <TableCell>{headline.title}</TableCell>
                                    <TableCell>{headline.category}</TableCell>
                                    <TableCell>{headline.forward_refs?.map(ref => `${ref.id}:${ref.title}`).join(', ')}</TableCell>
                                    <TableCell>{headline.backward_refs?.map(ref => `${ref.id}:${ref.title}`).join(', ')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                    colSpan={4}
                                    count={headlines.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default HeadlineList;
